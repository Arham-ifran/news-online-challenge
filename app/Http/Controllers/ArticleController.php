<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Resources\ArticleResource;
use App\Http\Resources\CategoryResource;
use App\Models\Article;
use App\Models\Category;
use App\Services\ArticleFilterService;
use Illuminate\Http\Request;

class ArticleController extends Controller
{

    protected $articleFilterService;

    public function __construct(ArticleFilterService $articleFilterService)
    {
        $this->articleFilterService = $articleFilterService;
    }
    
    /**
     * Apply filters on the articles based on the request parameters.
     *
     * @param  Request  $request
     * @return void
     *
     * @Author: Arham Irfan
     * @Date: 05 Dec, 2023
     */
    public function filter(Request $request)
    {
        $query = $this->applyFilters($request);

        $result = $query->get();
        $response = ArticleResource::collection($result);
        return $this->sendResponse($response, 'Articles fetched successfully.');
    }

    /**
     * Get all articles with their categories.
     *
     * @return void
     * 
     *  * @Author: Arham Irfan
     * @Date: 05 Dec, 2023
     */
    public function index()
    {
        $articles = Article::with('category')->get();
        $response = ArticleResource::collection($articles);
        return $this->sendResponse($response, 'Articles fetched successfully.');
    }

    /**
     * Get a specific article by its encoded ID.
     *
     * @param  string  $encodedId
     * @return void
     * 
     * @Author: Arham Irfan
     * @Date: 05 Dec, 2023
     */
    public function show($encodedId)
    {
        $decodedId = base64_decode($encodedId);
        $articles = Article::with('category')->where('id', $decodedId)->first();
        return $this->sendResponse($articles, 'Articles fetched successfully.');
    }

    /**
     * Get five random articles with different categories.
     *
     * @return void
     * 
     * @Author: Arham Irfan
     * @Date: 05 Dec, 2023
     */
    public function ArticleLimitFive()
    {
        $articles = Article::with('category')->inRandomOrder()->limit(5)->get();
        $response = ArticleResource::collection($articles);
        return $this->sendResponse($response, 'Five articles with different categories fetched successfully.');
    }

     /**
     * Apply filters to the article query based on the request parameters.
     *
     * @param  Request  $request
     * @return \Illuminate\Database\Eloquent\Builder
     * 
     * @Author: Arham Irfan
     * @Date: 05 Dec, 2023
     */
    protected function applyFilters(Request $request)
    {
        $query = Article::query();
        $query->with('category');
        $this->articleFilterService->buildQueryConditions($request->json()->all(), $query);
        return $query;
    }

    /**
     * Get all categories.
     *
     * @return void
     * 
     * @Author: Arham Irfan
     * @Date: 05 Dec, 2023
     */
    public function category()
    {
        $category = Category::get();
        $response = CategoryResource::collection($category);
        return $this->sendResponse($response, 'Category fetched successfully.');
    }

    /**
     * Get distinct sources of articles.
     *
     * @return \Illuminate\Http\JsonResponse
     * 
     * @Author: Arham Irfan
     * @Date: 05 Dec, 2023
     */
    public function source()
    {
        $source = Article::distinct('source')->pluck('source')->take(20);
        return response()->json(['success' => true, 'data' => $source, 'message' => 'source fetched successfully.']);
    }

    /**
     * Get distinct authors of articles.
     *
     * @return \Illuminate\Http\JsonResponse
     * 
     * @Author: Arham Irfan
     * @Date: 05 Dec, 2023
     */
    public function author()
    {
        $author = Article::distinct('author')->pluck('author')->take(20);
        return response()->json(['success' => true, 'data' => $author, 'message' => 'author fetched successfully.']);
    }
}
