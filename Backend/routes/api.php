<?php

use App\Http\Controllers\Profile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DataController;
<<<<<<< Updated upstream
use App\Http\Controllers\CompanyController;
=======
use App\Http\Controllers\UserInteractionController;

>>>>>>> Stashed changes

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware(['auth:sanctum'])->group(function (){
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('/user/profile', [Profile::class, 'update']);
    Route::post('/increment-searches', [UserInteractionController::class, 'incrementSearches']);
    Route::post('/increment-graph-interactions', [UserInteractionController::class, 'incrementGraphInteractions']);
    Route::post('/increment-influencer-interactions', [UserInteractionController::class, 'incrementInfluencerInteractions']);
});

Route::get('/fetch-reviews', [DataController::class, 'fetchData']);

Route::get('/testData', function () {
    return response()->json(['message' => 'This is a test response']);
});

Route::get('/companies', [CompanyController::class, 'index']);
