<?php

namespace App\Http\Controllers\Products;

use App\Http\Controllers\Controller;
use App\Models\ProductAttributes;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProductAttributesController extends Controller {
    function index(): Response {
        $productAttributes = ProductAttributes::with(['values' => fn($query) => $query->select('id', 'name')])->get(['id', 'name']);

        return Inertia::render('products/attributes/list', [
            'productAttributes' => $productAttributes
        ]);
    }

    function create(Request $request): Response {
        return Inertia::render('products/attributes/create', [
            'status' => $request->session()->get('status'),
        ]);
    }

    function edit(Request $request, string $id): Response {
        $attribute = ProductAttributes::with(['values' => fn($query) => $query->select('id', 'name')])->findOrFail($id, ['id', 'name']);
        return Inertia::render('products/attributes/edit', [
            'attribute' => $attribute,
            'status'    => $request->session()->get('status'),
        ]);
    }

    function store(Request $request): RedirectResponse {
        $productAttribute = ProductAttributes::create(['name' => $request->post('name')]);
        $productAttribute->values()->createMany(array_map(fn($value) => ['name' => $value['name']], $request->post('values')));
        return back()->with('status', 'Attribute saved successfully!');
    }

    function update(Request $request): RedirectResponse {
        $productAttribute = ProductAttributes::find($request->post('id'));
        $productAttribute->name = $request->post('name');
        $productAttribute->save();
        $newValues = array_filter($request->post('values'), fn($value) => is_null($value['id']));
        $existingValues = array_filter($request->post('values'), fn($value) => !is_null($value['id']));
        if (count($existingValues) > 0) {
            $productAttribute->values()->sync(array_map(fn($value) => $value['id'], $existingValues));
        }
        $productAttribute->values()->createMany(array_map(fn($value) => ['name' => $value['name']], $newValues));

        return back()->with('status', 'Attribute updated successfully!');
    }

    function delete(string $id): RedirectResponse {
        $attribute = ProductAttributes::find($id);
        $attribute->delete();
        return back();
    }

}
