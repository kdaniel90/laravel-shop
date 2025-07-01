<?php
namespace App\Http\Controllers\Products;

use App\Http\Controllers\Controller;
use App\Models\ProductAttributes;
use App\Models\Products;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProductsController extends Controller {

    function index(): Response {
        $products = Products::with(['attributes' => fn($query) => $query->select('id', 'name')])->get(['id', 'name']);

        return Inertia::render('products/attributes/list', [
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
}
