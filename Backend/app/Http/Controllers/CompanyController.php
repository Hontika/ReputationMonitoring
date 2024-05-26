<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Company;

class CompanyController extends Controller
{
    /**
     * This function runes once every day, and stores current follower data of every unique company in the company table
     */
    public function updateCompanyData()
    {
        //might be obsolete, but I won't delete yet
    }

    public function index()
    {
        $companies = Company::all();
        return $companies;
    }
}
