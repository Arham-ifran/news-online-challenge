<?php

namespace App\Services;

use App\Models\Article;

class ArticleFilterService
{

    /**
     * Build query conditions based on the provided request data.
     *
     * @param  array  $requestData
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return void
     * 
     * @Author: Arham Irfan
     * @Date: 05 Dec, 2023
     */
    public function buildQueryConditions($requestData, $query)
    {
        $this->applyDateFilter($requestData, $query);
        $this->applySourceFilter($requestData, $query);
        $this->applyCategoryFilter($requestData, $query);
        $this->applySearchFilter($requestData, $query);
    }

    /**
     * Apply date filter to the query.
     *
     * @param  array  $requestData
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return void
     * 
     * @Author: Arham Irfan
     * @Date: 05 Dec, 2023
     */
    protected function applyDateFilter($requestData, $query)
    {
        $startDate = $requestData['start_date'] ?? null;
        if ($startDate) {
            $query->whereDate('published_at', '=', $startDate);
        }
    }

    /**
     * Apply source filter to the query.
     *
     * @param  array  $requestData
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return void
     * 
     * @Author: Arham Irfan
     * @Date: 05 Dec, 2023
     */
    protected function applySourceFilter($requestData, $query)
    {
        $source = $requestData['source'] ?? null;
        if ($source) {
            $query->whereRaw('LOWER(source) LIKE ?', ['%' . strtolower($source) . '%']);
        }
    }

    /**
     * Apply category filter to the query.
     *
     * @param  array  $requestData
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return void
     * 
     * @Author: Arham Irfan
     * @Date: 05 Dec, 2023
     */
    protected function applyCategoryFilter($requestData, $query)
    {
        $category_id = $requestData['category_id'] ?? null;
        if ($category_id) {
            $query->where('category_id', $category_id);
        }
    }

     /**
     * Apply search filter to the query.
     *
     * @param  array  $requestData
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return void
     * 
     * @Author: Arham Irfan
     * @Date: 05 Dec, 2023
     */
    protected function applySearchFilter($requestData, $query)
    {
        $searchTerm = $requestData['search'] ?? null;
        if ($searchTerm) {
            $query->where(function ($innerQuery) use ($searchTerm) {
                $innerQuery->whereRaw('LOWER(title) LIKE ?', ['%' . strtolower($searchTerm) . '%'])
                    ->orWhereRaw('LOWER(description) LIKE ?', ['%' . strtolower($searchTerm) . '%'])
                    ->orWhereRaw('LOWER(url) LIKE ?', ['%' . strtolower($searchTerm) . '%'])
                    ->orWhereRaw('LOWER(source) LIKE ?', ['%' . strtolower($searchTerm) . '%'])
                    ->orWhereRaw('LOWER(content) LIKE ?', ['%' . strtolower($searchTerm) . '%']);
            });
        }
    }

    /**
     * Get a personalized news feed based on the user's preferences.
     *
     * @return \Illuminate\Database\Eloquent\Collection
     * 
     * @Author: Arham Irfan
     * @Date: 05 Dec, 2023
     */
    public function getPersonalizedNewsFeed()
    {
        $userId = auth()->id();
        $userPreferences = app(UserService::class)->getUserPreferences($userId);

        $selectedSources = json_decode($userPreferences['selected_sources'], true);
        $selectedAuthors = json_decode($userPreferences['selected_authors'], true);
        $selectedCategories = json_decode($userPreferences['selected_categories'], true);

        $query = Article::query();
        $query->with('category');

        $this->applySelectedSourcesFilter($query, $selectedSources);
        $this->applySelectedAuthorsFilter($query, $selectedAuthors);
        $this->applySelectedCategoriesFilter($query, $selectedCategories);

        $articles = $query->get();
        return $articles;
    }

    /**
     * Apply selected sources filter to the query.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @param  array|null  $selectedSources
     * @return void
     * 
     * @Author: Arham Irfan
     * @Date: 05 Dec, 2023
     */
    protected function applySelectedSourcesFilter($query, $selectedSources)
    {
        if ($selectedSources) {
            $query->where(function ($query) use ($selectedSources) {
                $query->whereIn('source', $selectedSources);
            });
        }
    }

     /**
     * Apply selected authors filter to the query.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @param  array|null  $selectedAuthors
     * @return void
     * 
     * @Author: Arham Irfan
     * @Date: 05 Dec, 2023
     */
    protected function applySelectedAuthorsFilter($query, $selectedAuthors)
    {
        if ($selectedAuthors) {
            $query->orWhere(function ($query) use ($selectedAuthors) {
                $query->whereIn('author', $selectedAuthors);
            });
        }
    }

    /**
     * Apply selected categories filter to the query.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @param  array|null  $selectedCategories
     * @return void
     * 
     * @Author: Arham Irfan
     * @Date: 05 Dec, 2023
     */
    protected function applySelectedCategoriesFilter($query, $selectedCategories)
    {
        if ($selectedCategories) {
            $query->orWhere(function ($query) use ($selectedCategories) {
                $query->whereIn('category_id', $selectedCategories);
            });
        }
    }
}
