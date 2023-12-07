<?php

namespace App\Console\Commands;

use App\Models\Article;
use App\Models\Category;
use Illuminate\Console\Command;
use Illuminate\Http\Client\RequestException;
use GuzzleHttp\Client;
use GuzzleHttp\Psr7\Request;

class NytNewsAPI extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'nyt-news-api';

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
            $apiKey = env('API_KEY_NYK');
            $nykEndPoint = env('NYK_ENDPOINT');
            $categoryArray = ['technology', 'science', 'sports', 'business', 'health'];
            foreach($categoryArray as $category){

            
                $apiUrl = $nykEndPoint.$category.'.json';
                $apiUrl .= '?api-key=' . $apiKey;
                
                $client = new Client();
                $request = new Request('GET', $apiUrl);
                $res = $client->sendAsync($request)->wait();

                
                $category = Category::where('name', $category)->first();

                $data = $res->getBody()->getContents();

                $data = json_decode($data, true);


                if (isset($data['results'])) {
                    foreach ($data['results'] as $article) {
                        echo($article['title']);
                exit;
                        Article::create([
                            'title' => $article['title'],
                            'description' => $article['abstract'],
                            'author' => $article['byline'],
                            'url' => $article['url'],
                            'image' => isset($article['multimedia'][0]) ? $article['multimedia'][0]['url'] : null,
                            'published_at' => $article['published_date'],
                            'content' => $article['abstract'],
                            'source' => $article['section'],
                            'category_id' => $category['id'],
                            'api_source' => 'https://www.nytimes.com/',
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
