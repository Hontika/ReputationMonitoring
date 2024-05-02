<?php

namespace App\Console\Commands;

use App\Models\Company;
use App\Models\CompanyData;
use Exception;
use Illuminate\Console\Command;
use Symfony\Component\DomCrawler\Crawler;
use GuzzleHttp\Client;

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
            $client = new Client();

            $url = 'https://socialblade.com/twitter/user/' . $company->twitter . '/realtime';
            $headers = [
                'User-Agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/118.0'
            ];
            $response = $client->request('GET', $url, [
                'headers' => $headers
            ]);
            $html = $response->getBody()->getContents();
            $crawler = new Crawler($html);
            $twitterFollowers = (int)preg_replace('/[.,]/', '', $crawler->filter('h5')->text());

            $url = "https://reddstats.com/subreddit/" . $company->reddit;
            $response = $client->request('GET', $url, [
                'headers' => $headers
            ]);
            $html = $response->getBody()->getContents();
            $crawler = new Crawler($html);
            $subredditMembers = (int)$crawler->filter('body > div > div.flex.flex-col.items-center.justify-center.mt-5 > div > div > div.grid.grid-cols-12.gap-4 > div:nth-child(1) > div > div.text-lg.lg\:text-2xl.text-gray-500.font-semibold.leading-8.mt-5')->text();

            CompanyData::create([
                'company_id' => $company->id,
                'twitter_followers' => $twitterFollowers,
                'reddit_members' => $subredditMembers
            ]);
        }

        $this->info('Company data updated successfully!');
    }
}
