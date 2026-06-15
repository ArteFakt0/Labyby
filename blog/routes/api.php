<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Імпортуємо всі контролери
use App\Http\Controllers\Api\Blog\PostController; // Переконайся, що шлях правильний
use App\Http\Controllers\Api\Blog\Admin\CategoryController;
use App\Http\Controllers\Api\Blog\Admin\PostController as AdminPostController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Публічні роути блогу
Route::group(['prefix' => 'blog'], function () {
    Route::apiResource('posts', PostController::class)->names('blog.posts');
});

// Адмінка
Route::group(['prefix' => 'admin/blog'], function () {
    // BlogCategory
    Route::apiResource('categories', CategoryController::class)
        ->only(['index', 'store', 'update'])
        ->names('blog.admin.categories');
        
    // BlogPost (Admin) - використовуємо Аліас AdminPostController, щоб не конфліктував з публічним
    Route::apiResource('posts', AdminPostController::class)
        ->except(['show'])
        ->names('blog.admin.posts');
});