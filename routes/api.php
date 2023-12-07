<?php

use App\Http\Controllers\ArticleController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/article', [ArticleController::class, 'index']);
Route::get('/article-limit-five', [ArticleController::class, 'ArticleLimitFive']);
Route::get('/article/{encodedId}', [ArticleController::class, 'show']);
Route::post('/filter', [ArticleController::class, 'filter']);
Route::get('/category', [ArticleController::class, 'category']);
Route::get('/source', [ArticleController::class, 'source']);
Route::get('/author', [ArticleController::class, 'author']);
Route::get('/nyt', [UserController::class, 'fetchNYTimesTopScienceStories']);

Route::middleware('auth:api')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
    Route::get('/users/personalized-news-feed', [UserController::class, 'personalizedNewsFeed']);
    Route::post('/users/save-preferences', [UserController::class, 'saveUserPreferences']);
    Route::get('/users/preferences', [UserController::class, 'fetchUserPreferences']);
});