<?php

use App\Http\Controllers\Api\BankAccountController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\ShopReviewController;
use App\Http\Controllers\Api\TransactionController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/banks', [BankAccountController::class, 'index']);
Route::get('/products', [ProductController::class, 'index']);
Route::get('/users', [UserController::class, 'index']);
Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);

Route::get('/transactions', [TransactionController::class, 'index']);
Route::post('/transactions', [TransactionController::class, 'store']);
Route::get('/transactions/{userId}', [TransactionController::class, 'showByUser']);
Route::post('/transactions/{id}/upload-slip', [TransactionController::class, 'uploadSlip']);

Route::get('/shops/reviews', [ShopReviewController::class, 'index']);   // get review per toko
Route::post('/shops/reviews', [ShopReviewController::class, 'store']);  // kirim review baru
