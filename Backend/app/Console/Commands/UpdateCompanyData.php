<?php

namespace App\Console\Commands;

use App\Models\Company;
use App\Models\CompanyData;
use Illuminate\Console\Command;

class UpdateCompanyData extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'company:data:update';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Update company data';


    /**
     * Execute the console command.
     */
    public function handle()
    {
        $companies = Company::all();
        foreach ($companies as $company) {
            $twitterFollowers = rand(100, 10000);
            $redditMembers = rand(50, 5000);

            CompanyData::create([
                'company_id' => $company->id,
                'twitter_followers' => $twitterFollowers,
                'reddit_members' => $redditMembers
            ]);
        }

        $this->info('Company data updated successfully!');
    }
}
