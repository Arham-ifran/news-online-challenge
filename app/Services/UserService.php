<?php

namespace App\Services;

use App\Models\Category;
use App\Models\UserPreferences;

class UserService
{
    /**
     * Get user preferences based on the provided user ID.
     *
     * @param  int  $userId
     * @return \App\Models\UserPreferences|null
     * 
     * @Author: Arham Irfan
     * @Date: 05 Dec, 2023
     */
    public function getUserPreferences($userId)
    {
        return UserPreferences::where('user_id', $userId)->first();
    }

    /**
     * Save user preferences for the provided user ID.
     *
     * @param  int  $userId
     * @param  array  $preferences
     * @return \App\Models\UserPreferences
     * 
     * @Author: Arham Irfan
     * @Date: 05 Dec, 2023
     */
    public function savePreferences($userId, $preferences)
    {
        $userPreferences = UserPreferences::where('user_id', $userId)->first();

        if (!$userPreferences) {
            $userPreferences = new UserPreferences();
            $userPreferences->selected_sources = json_encode($preferences['selected_sources'], true);
            $userPreferences->selected_authors = json_encode($preferences['selected_authors'], true);
            $userPreferences->selected_categories = json_encode($preferences['selected_categories'], true);
            $userPreferences->user_id = $userId;
            $userPreferences->save();
        }

        $userPreferences->update($preferences);

        return $userPreferences;
    }

    /**
     * Get user preferences data for the provided user ID.
     *
     * @param  int  $userId
     * @return array
     * 
     * @Author: Arham Irfan
     * @Date: 05 Dec, 2023
     */
    public function userPreferences($userId)
    {
        $data = [];
        $preferences = UserPreferences::where('user_id', $userId)->first();

        $data['selectedSources'] = $this->decodeJson($preferences['selected_sources']);
        $data['selectedAuthors'] = $this->decodeJson($preferences['selected_authors']);
        $data['selectedCategories'] = $this->getCategoryNames($preferences['selected_categories']);

        return $data;
    }

    /**
     * Decode a JSON string into an array or return an empty array if decoding fails.
     *
     * @param  string|null  $jsonString
     * @return array
     * 
     * @Author: Arham Irfan
     * @Date: 05 Dec, 2023
     */
    private function decodeJson($jsonString)
    {
        return json_decode($jsonString, true) ?? [];
    }

    /**
     * Get category names for the provided selected category IDs.
     *
     * @param  string|null  $selectedCategories
     * @return array
     * 
     * @Author: Arham Irfan
     * @Date: 05 Dec, 2023
     */
    private function getCategoryNames($selectedCategories)
    {
        $categoryNames = [];

        foreach ($this->getValidCategoryIds($selectedCategories) as $categoryID) {
            $category = Category::find($categoryID);

            if ($category) {
                $categoryNames[] = $category;
            }
        }

        return $categoryNames;
    }

     /**
     * Get valid category IDs from the provided selected category IDs.
     *
     * @param  string|null  $selectedCategories
     * @return array
     * 
     * @Author: Arham Irfan
     * @Date: 05 Dec, 2023
     */
    private function getValidCategoryIds($selectedCategories)
    {
        return array_filter(json_decode($selectedCategories, true) ?? [], function ($categoryId) {
            return Category::find($categoryId);
        });
    }
}
