<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Achievement;
use App\Models\Company;
use App\Models\CompanyData;
use Illuminate\Support\Facades\Auth;

class AchievementController extends Controller
{
    //

    public function index()
    {
        $achievements = Achievement::all();
        return $achievements;
    }

    public function store(Request $request)
    {
        $baseValidation = $request->validate([
            'type' => ['required', 'string', 'in:google_reviews,subreddit_members']
        ]);

        $userCompanyName = Auth::user()->companyName;  // Retrieve company name from the authenticated user
        $baseValidation['user_id'] = Auth::id();
        $additionalData = [];

        if ($request->input('type') === 'google_reviews') {
            $goalValidation = $request->validate(['goal' => ['nullable', 'numeric', 'min:1.0', 'max:5.0']]);
            $additionalData = ['progress' => 0.0];
        } elseif ($request->input('type') === 'subreddit_members') {
            $goalValidation = $request->validate(['goal' => ['nullable', 'numeric', 'min:1', 'max:10000000']]);

            $company = Company::where('name', $userCompanyName)->first();
            if (!$company) {
                return response()->json(['error' => 'Company not found'], 404);
            }

            $currentRedditMembers = CompanyData::where('company_id', $company->id)->first()->reddit_members ?? 0;
            $additionalData = ['new_members' => false, 'progress' => $currentRedditMembers];
        } else {
            $goalValidation = ['goal' => ['nullable', 'numeric']];
        }

        $validated = array_merge($baseValidation, $goalValidation, $additionalData);
        return Achievement::create($validated);
    }


    public function show($id)
    {
        return Achievement::findOrFail($id);
    }

    public function achiByUser($userId)
    {
        $user = Auth::user('sanctum');

        // Get the logged-in user's ID
        $userId = $user->id;

        // Retrieve achievements specific to the logged-in user
        $achievements = Achievement::where('user_id', $userId)->get();

        // Return the achievements data
        return response()->json($achievements);
    }
}
