<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserInteractionController extends Controller
{
    /**
     * Increment searches count.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function incrementSearches()
    {
        $user = Auth::user('sanctum');
        $user->increment('searches');
        return response()->json(['message' => 'Searches count incremented successfully.', 'searches' => $user->searches]);
    }

    /**
     * Increment graph interactions count.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function incrementGraphInteractions()
    {
        $user = Auth::user('sanctum');
        $user->increment('graph_interactions');
        return response()->json(['message' => 'Graph interactions count incremented successfully.', 'graph_interactions' => $user->graph_interactions]);
    }

    /**
     * Increment influencer interactions count.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function incrementInfluencerInteractions()
    {
        $user = Auth::user('sanctum');
        $user->increment('influencer_interactions');
        return response()->json(['message' => 'Influencer interactions count incremented successfully.', 'influencer_interactions' => $user->influencer_interactions]);
    }
}
