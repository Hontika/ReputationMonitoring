<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use GuzzleHttp\Client;
use Symfony\Component\DomCrawler\Crawler;

class CompanyController extends Controller
{
    public function index()
    {
        $companies = Company::all();
        return view('companies.index', compact('companies'));
    }

    public function show($id)
    {
        $company = Company::with('companyData')->findOrFail($id);
        $users = User::where('companyName', $company->name)->get();
        return view('companies.show', compact('company', 'users'));
    }

    public function redditPosts($id)
    {
        $company = Company::findOrFail($id);
        $redditPosts = $this->scrapeRedditPosts($company->reddit);

        return view('companies.reddit-posts', compact('company', 'redditPosts'));
    }

    private function scrapeRedditPosts($redditUsername)
{
    $client = new Client();
    $response = $client->get("https://www.reddit.com/r/Design/comments/1cymnku/como_organizar_sua_mesa_de_trabalho_para_aumentar/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button");
    $html = (string) $response->getBody();

    $crawler = new Crawler($html);
    $posts = [];

    $crawler->filter('.Post')->each(function (Crawler $node) use (&$posts) {
        $title = $node->filter('h3')->count() > 0 ? $node->filter('h3')->text() : '';
        $body = $node->filter('.md')->count() > 0 ? $node->filter('.md')->text() : '';
        $url = $node->filter('a')->count() > 0 ? $node->filter('a')->attr('href') : '';

        $posts[] = [
            'title' => $title,
            'body' => $body,
            'url' => $url
        ];
    });

    // Log the posts for debugging
    \Log::info('Reddit Posts:', $posts);

    return $posts;
}

}
