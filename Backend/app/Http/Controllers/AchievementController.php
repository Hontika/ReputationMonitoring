<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Achievement;
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
        $baseValidation = [
            'user_id' => ['required', 'exists:users,id'],
            'type' => ['required', 'string', 'in:google_series,subreddit_members']
        ];
    
        // Determine additional validations based on type
        if ($request->input('type') === 'google_reviews') {
            $goalValidation = ['goal' => ['nullable', 'numeric', 'min:1.0', 'max:5.0']];
            $additionalData = ['progress' => 0.0];
        } elseif ($request->input('type') === 'subreddit_members') {
            $goalValidation = ['goal' => ['nullable', 'numeric', 'min:1', 'max:10000000']];
            $additionalData = ['new_members' => false];
        } else {
            $goalValidation = ['goal' => ['nullable', 'numeric']];
            $additionalData = [];
        }
    
        // Combine base validations with goal-specific validations
        $validated = $request->validate(array_merge($baseValidation, $goalValidation));
    
        // Merge additional data based on type
        $validated = array_merge($validated, $additionalData);
    
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
