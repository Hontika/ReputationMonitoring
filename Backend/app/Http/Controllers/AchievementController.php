<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Achievement;

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

    public function getAchievementsByUser($userId)
    {
        $achievements = Achievement::where('user_id', $userId)->get();
        return $achievements;
    }

    public function update(Request $request, $id)
    {
        $achievement = Achievement::findOrFail($id);

        $validated = $request->validate([
            'type' => ['required', 'string', 'in:google_reviews,subreddit_members'],
            'goal' => ['nullable', 'numeric', 'min:1.0', 'max:5.0'],
        ]);

        $achievement->update($validated);

        return $achievement;
    }

    public function destroy($id)
    {
        $achievement = Achievement::findOrFail($id);
        $achievement->delete();

        return response()->noContent();
    }
}
