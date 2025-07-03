<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Products\ProductsController;

Route::domain(env('APP_URL'))->get('/', [ProductsController::class, 'getAllWithFilters'])->name('home');

Route::domain(env('APP_URL'))->post('', [ProductsController::class, 'getFilteredProducts'])->name('products.filter');


Route::domain('admin.' . env('APP_URL'))->middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
require __DIR__ . '/products.php';
