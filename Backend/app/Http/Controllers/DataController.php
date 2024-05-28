<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Symfony\Component\DomCrawler\Crawler;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class DataController extends Controller
{
    public function getRedditData($reddit)
    {
        try {
            $data = DB::table('company_data')
                ->join('companies', 'company_data.company_id', '=', 'companies.id')
                ->where('companies.reddit', $reddit)
                ->select('company_data.created_at', 'company_data.reddit_members as y')
                ->orderBy('company_data.created_at', 'asc')
                ->get();

            // Format the date to only include the date part
            $formattedData = $data->map(function($item) {
                return [
                    'created_at' => Carbon::parse($item->created_at)->format('Y-m-d'),
                    'y' => $item->y
                ];
            });

            return response()->json($formattedData);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error fetching company data'], 500);
        }
    }
}
