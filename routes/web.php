<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::domain(env('APP_URL'))->get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::domain('admin.' . env('APP_URL'))->middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('products', function () {
        return Inertia::render('products/list');
    })->name('products');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
