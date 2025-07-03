<?php
namespace App\Http\Controllers\Products;

use App\Http\Controllers\Controller;
use App\Models\ProductAttributes;
use App\Models\Products;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProductsController extends Controller {

    function index(): Response {
        $products = Products::with(['attributes' => fn($query) => $query->select('id', 'name')])->get(['id', 'name']);

        return Inertia::render('products/list', [
            'products' => $products
        ]);
    }

    function create(Request $request): Response {

        $productAttributes = ProductAttributes::with(['values' => fn($query) => $query->select('id', 'name')])->get(['id', 'name']);

        return Inertia::render('products/create', [
            'productAttributes' => $productAttributes,
            'status' => $request->session()->get('status'),
        ]);
    }

    function edit(Request $request, string $id): Response
    {
        $productAttributes = ProductAttributes::with(['values' => fn($query) => $query->select('id', 'name')])->get(['id', 'name']);
        $product = Products::with(['attributes' => fn($query) => $query->select('id', 'name')])->findOrFail($id, ['id', 'name']);
        return Inertia::render('products/edit', [
            'productAttributes' => $productAttributes,
            'product' => $product,
            'status' => $request->session()->get('status'),
        ]);
    }

    function store(Request $request): RedirectResponse
    {
        $product = Products::create(['name' => $request->post('name')]);
        $product->attributes()->sync(array_map(fn($value) => $value['id'], $request->post('attributes')));
        return back()->with('status', 'Product saved successfully!');
    }

    function update(Request $request): RedirectResponse
    {
        $product = Products::find($request->post('id'));
        $product->name = $request->post('name');
        $product->save();
        $product->attributes()->sync(array_map(fn($value) => $value['id'], $request->post('attributes')));
        return back()->with('status', 'Product updated successfully!');
    }

    function getAllWithFilters(Request $request): Response {
        $filters = ProductAttributes::with(['values' => fn($query) => $query->select('id', 'name')->withCount('products as productsCount')])->get(['id', 'name']);
        $products = Products::with(['attributes' => fn($query) => $query->select('id', 'name')])->get(['id', 'name']);

        return Inertia::render('homepage', [
            'filters' => $filters,
            'products' => $products,
        ]);
    }
}
