<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Products\ProductAttributesController;
use App\Http\Controllers\Products\ProductsController;

Route::domain('admin.' . env('APP_URL'))->middleware(['auth', 'verified'])->group(function () {

    Route::get('products', function () {
        return Inertia::render('products/list');
    })->name('products');

    Route::get('products/create', function () {
        return Inertia::render('products/create');
    });
    Route::get('products/{id}/edit', function () {
        return Inertia::render('products/edit');
    });
    Route::get('products/attributes', [ProductAttributesController::class, 'index']);

    Route::get('products/attributes/create', [ProductAttributesController::class, 'create'])->name('products.attribute.create');

    Route::get('products/attributes/{id}', [ProductAttributesController::class, 'edit'])->name('products.attributes.edit');

    Route::post('products/attributes/update', [ProductAttributesController::class, 'update'])->name('products.attributes.update');

    Route::post('products/attributes', [ProductAttributesController::class, 'store'])
        ->name('products.attributes.create');

    Route::get('products/create', [ProductsController::class, 'create'])->name('products.create');

});
