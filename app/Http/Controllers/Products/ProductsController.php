<?php

namespace App\Http\Controllers\Products;

use App\Http\Controllers\Controller;
use App\Models\ProductAttributes;
use App\Models\Products;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProductsController extends Controller
{

    function index(): Response
    {
        $products = Products::with(['values' => fn($query) => $query->select('id', 'name')])->get(['id', 'name']);

        return Inertia::render('products/list', [
            'products' => $products
        ]);
    }

    function create(Request $request): Response
    {
        $productAttributes = ProductAttributes::with(['values' => fn($query) => $query->select('id', 'name')])->get(['id', 'name']);

        return Inertia::render('products/create', [
            'productAttributes' => $productAttributes,
            'status' => $request->session()->get('status'),
        ]);
    }

    function edit(Request $request, string $id): Response
    {
        $productAttributes = ProductAttributes::with(['values' => fn($query) => $query->select('id', 'name')])->get(['id', 'name']);
        $product = Products::with(['values' => fn($query) => $query->select('id', 'name')])->findOrFail($id, ['id', 'name']);
        return Inertia::render('products/edit', [
            'productAttributes' => $productAttributes,
            'product' => $product,
            'status' => $request->session()->get('status'),
        ]);
    }

    function store(Request $request): RedirectResponse
    {
        $product = Products::create(['name' => $request->post('name')]);
        $product->values()->sync(array_map(fn($value) => $value['id'], $request->post('values')));
        return back()->with('status', 'Product saved successfully!');
    }

    function update(Request $request): RedirectResponse
    {
        $product = Products::find($request->post('id'));
        $product->name = $request->post('name');
        $product->save();
        $product->values()->sync(array_map(fn($value) => $value['id'], $request->post('values')));
        return back()->with('status', 'Product updated successfully!');
    }

    function getAllWithFilters(Request $request): Response
    {
        $filters = ProductAttributes::with(['values' => fn($query) => $query->select('id', 'name')->withCount('products as productsCount')])->get(['id', 'name']);
        if ($request->session()->get('productFilters')) {
            $products = Products::filters($request->session()->get('productFilters'))->with(['values.attributes' => fn($query) => $query->select('name')])->get(['id', 'name']);
            $filters = $this->calculateProductsCount($products, $filters, $request->session()->get('baseFilter'));
        } else {
            $products = Products::with(['values.attributes' => fn($query) => $query->select('name')])->get(['id', 'name']);
        }

        return Inertia::render('homepage', [
            'filters' => $filters,
            'products' => $products,
        ]);
    }

    function getFilteredProducts(Request $request): RedirectResponse
    {
        $filters = $request->post('filters');
        $baseFilter = 0;
        if (!$filters) {
            $request->session()->forget('productFilters');
            return back()->with(['baseFilter' => $baseFilter]);
        }
        $newFilters = [];
        foreach ($filters as $filter) {
            if ($baseFilter === 0) {
                $baseFilter = $filter['filterId'];
            }
            if (array_key_exists($filter['filterId'], $newFilters)) {
                $newFilters[$filter['filterId']][] = $filter['valueId'];
            } else {
                $newFilters[$filter['filterId']] = [$filter['valueId']];
            }
        }

        return back()->with(['productFilters' => $newFilters, 'baseFilter' => $baseFilter]);
    }

    private function calculateProductsCount($products, $filters, $baseFilter)
    {
        $updatedProductsCount = [];
        foreach ($products as $product) {
            foreach ($product->values as $value) {
                if (array_key_exists($value->id, $updatedProductsCount)) {
                    $updatedProductsCount[$value->id] += 1;
                } else {
                    $updatedProductsCount[$value->id] = 1;
                }
            }
        }
        $transformedFilters = $filters->toArray();
        foreach ($transformedFilters as &$filter) {
            if ($filter['id'] === $baseFilter) {
                continue;
            }
            foreach ($filter['values'] as &$value) {
                if (array_key_exists($value['id'], $updatedProductsCount)) {
                    $value['productsCount'] = $updatedProductsCount[$value['id']];
                } else {
                    $value['productsCount'] = 0;
                }
            }
        }
        return $transformedFilters;
    }
}
