<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Company;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class Profile extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $user = Auth::user('sanctum');

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'twitter' => ['nullable', 'string', 'max:255'],
            'reddit' => ['nullable', 'string', 'max:255'],
            'companyName' => ['nullable', 'string', 'max:255']
        ]);

        if ($validated['companyName']) {
            $company = Company::where('name', $validated['companyName'])->first();

            if (!$company) {
                $company = new Company();
                $company->name = $validated['companyName'];
                $company->twitter = $validated['twitter'] ?? null;
                $company->reddit = $validated['reddit'] ?? null;
                $company->save();
            }
            $user->companyName = $validated['companyName'];
        }

        $user->fill($validated)->save();

        return response([$user, $company], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
