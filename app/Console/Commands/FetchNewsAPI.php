<?php

namespace App\Console\Commands;

use App\Models\Article;
use App\Models\Category;
use DateTime;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Client\RequestException;

class FetchNewsAPI extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'fetch-news-api';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        try {
            $apiKey = env('API_KEY');
            $apiUrl = env('NEWS_ORG_ENDPOINT');
            $searchTerms = ['bitcoin', 'technology', 'science', 'sports', 'business', 'entertainment', 'general', 'health'];
            $query = $searchTerms[array_rand($searchTerms)];


            foreach ($searchTerms as $query) {
                $today = new DateTime();

                $category = Category::where('name', $query)->first();
                $response = Http::get($apiUrl, [
                    'apiKey' => $apiKey,
                    'q' => $query,
                    'from' => $today->modify('-1 day')->format('Y-m-d'),
                    'to' => $today,
                ]);

                $response->throw();

                $data = $response->json();
                if (isset($data['articles'])) {
                    foreach ($data['articles'] as $article) {
                        Article::create([
                            'title' => $article['title'],
                            'description' => $article['description'],
                            'author' => $article['author'],
                            'url' => $article['url'],
                            'image' => $article['urlToImage'],
                            'published_at' => $article['publishedAt'],
                            'content' => $article['content'],
                            'source' => $article['source']['name'],
                            'category_id' => $category['id'],
                        ]);
                    }

                    $this->info('News API news fetched and stored successfully.');
                } else {
                    $this->error('Failed to fetch articles from News API.');
                }
            }
        } catch (RequestException $e) {
            $this->error('Failed to connect to News API: ' . $e->getMessage());
        } catch (\Exception $e) {
            $this->error('An unexpected error occurred: ' . $e->getMessage());
        }
    }
}
