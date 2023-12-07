<?php

namespace App\Console\Commands;

use App\Models\Article;
use App\Models\Category;
use DateTime;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Client\RequestException;

class NewsDataAPI extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'news-data-api';

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
            $apiKey = env('API_KEY_NDIO');
            $apiUrl = env('NDIO_ENDPOINT');
            $searchTerms = ['bitcoin', 'technology', 'science', 'sports', 'business', 'entertainment', 'general', 'health'];

            foreach ($searchTerms as $query) {

                $category = Category::where('name', $query)->first();
                
                $response = Http::get($apiUrl, [
                    'apiKey' => $apiKey,
                    'q' => $query
                ]);

                $response->throw();

                $data = $response->json();
                if (isset($data['results'])) {
                    foreach ($data['results'] as $article) {
                        Article::create([
                            'title' => $article['title'] ?? '',
                            'description' => $article['description'] ?? '',
                            'author' => isset($article['creator'][0]) ? $article['creator'][0] : 'newsdata.io',
                            'url' => $article['link'] ?? '',
                            'image' => $article['image_url'] ?? '',
                            'published_at' => $article['pubDate'] ?? '',
                            'content' => $article['content'] ?? '',
                            'source' => $article['source_id'] ?? '',
                            'category_id' => $category['id'],
                            'api_source' => 'https://newsdata.io/',
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
