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
            $url = 'https://socialblade.com/twitter/user/'.$company->twitter.'/realtime';
            $client = new Client();
            $headers = [
                'User-Agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/118.0'
            ];
            $response = $client->request('GET', $url, [
                'headers' => $headers
            ]);
            $html = $response->getBody()->getContents();
            $crawler = new Crawler($html);
            $twitterFollowers = (int)preg_replace('/[.,]/', '', $crawler->filter('h5')->text());

            $redditMembers = rand(50, 5000);

            CompanyData::create([
                'company_id' => $company->id,
                'twitter_followers' => $twitterFollowers,
                'reddit_members' => $redditMembers
            ]);
        }

        $this->info('Company data updated successfully!');
    }

    private function fetchTwitterFollowers()
    {
        $url = 'https://socialblade.com/twitter/user/asolboop/realtime';

        $client = new Client();

        $headers = [
            'User-Agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/118.0'
        ];

        $response = $client->request('GET', $url, [
            'headers' => $headers
        ]);

        $html = $response->getBody()->getContents();

        $crawler = new Crawler($html);

        $followerCount = $crawler->filter('h5')->text();

        // You may need to extract the follower count from the text here.
        // For example, if $followerCount is "Followers 123,456", you would extract "123,456".

        return $followerCount;
    }
}
