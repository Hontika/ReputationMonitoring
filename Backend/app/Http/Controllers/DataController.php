<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class DataController extends Controller
{
    public function fetchData()
    {
        $apiKey = env('VITE_SERPAPI_KEY');  // Ensure you have SERPAPI_KEY in your .env
        $params = [
            'engine' => 'google',       // Use Google as the search engine
            'q' => 'example query',     // Your search query
            'api_key' => $apiKey
        ];

        $response = Http::get('https://serpapi.com/search', $params);

        if ($response->successful()) {
            return response()->json($response->json(), 200);
        } else {
            return response()->json(['error' => 'Failed to fetch data from SerpAPI'], $response->status());
        }
    }
}
