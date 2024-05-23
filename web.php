<?php

use App\Http\Controllers\CompanyController;

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

#Route::get('/', function () {
#   return ['Laravel' => app()->version()];
#});

Route::get('/', function () {
    return view('welcome');
});

Route::get('/companies', [CompanyController::class, 'index'])->name('companies.index');

Route::get('/companies/{id}', [CompanyController::class, 'show'])->name('companies.show');

Route::get('/companies/{id}/reddit-posts', [CompanyController::class, 'redditPosts'])->name('companies.reddit-posts');

require __DIR__ . '/auth.php';


