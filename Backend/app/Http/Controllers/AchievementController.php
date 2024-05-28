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
        $validated = $request->validate([
            'user_id' => ['required', 'exists:users,id'],
            'type' => ['required', 'string', 'in:google_reviews,subreddit_members'],
            'goal' => ['nullable', 'numeric', 'min:1.0', 'max:5.0'],
        ]);

        // Set initial progress to 0 or false based on type
        if ($validated['type'] == 'google_reviews') {
            $validated['progress'] = 0.0;
        } else if ($validated['type'] == 'subreddit_members') {
            $validated['new_members'] = false;
        }

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
