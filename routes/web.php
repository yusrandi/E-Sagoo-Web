<?php

use App\Http\Controllers\LokasiKebunController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/privacy', [App\Http\Controllers\PrivacyController::class, 'index'])->name('privacy');
Route::get('/delete-account', [App\Http\Controllers\UserController::class, 'deleteAccountGuidence'])->name('delete-account');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [App\Http\Controllers\DashboardController::class, 'index'])->name('dashboard');

    Route::resource('product', App\Http\Controllers\ProductController::class);
    Route::put('/product/{id}/verify', [App\Http\Controllers\ProductController::class, 'verify'])
        ->name('product.verify');
    Route::resource('category', App\Http\Controllers\CategoryController::class);
    Route::resource('user', App\Http\Controllers\UserController::class);
    Route::put('/users/{id}/verify', [App\Http\Controllers\UserController::class, 'verify'])
        ->name('users.verify');
    Route::resource('transaction', App\Http\Controllers\TransactionController::class);
    Route::put('/transaction/{id}/status', [App\Http\Controllers\TransactionController::class, 'updateStatus'])
        ->name('transaction.status');

    Route::resource('lokasi', LokasiKebunController::class);
    Route::resource('aktivitas-budidaya', App\Http\Controllers\AktivitasBudidayaController::class);
    Route::resource('catatan-budidaya', App\Http\Controllers\CatatanBudidayaController::class);
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
