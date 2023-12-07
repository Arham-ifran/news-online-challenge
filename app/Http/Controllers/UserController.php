<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\UserPreferences;
use App\Services\ArticleFilterService;
use App\Services\UserService;
use Illuminate\Http\Request;

class UserController extends Controller
{

    /**
     * Save user preferences based on the provided request data.
     *
     * @param  UserService  $userService
     * @param  Request  $request
     * @return \Illuminate\Http\JsonResponse
     * 
     * @Author: Arham Irfan
     * @Date: 05 Dec, 2023
     */
    public function saveUserPreferences(UserService $userService, Request $request)
    {
        $this->validatePreferences($request);

        $userId = auth()->id();
        $preferences = $request->all();
        $userService->savePreferences($userId, $preferences);

        return response()->json([
            'success' => true,
            'message' => 'User preferences saved successfully.',
        ]);
    }

    /**
     * Get a personalized news feed for the authenticated user.
     *
     * @param  ArticleFilterService  $articleFilterService
     * @return \Illuminate\Http\JsonResponse
     * 
     * @Author: Arham Irfan
     * @Date: 05 Dec, 2023
     */
    public function personalizedNewsFeed(ArticleFilterService $articleFilterService)
    {
        $userId = auth()->id();
        $data = $articleFilterService->getPersonalizedNewsFeed($userId);

        return response()->json([
            'success' => true,
            'data' => $data,
            'message' => 'Personalized news feed retrieved successfully.',
        ]);
    }

    /**
     * Fetch the user's saved preferences.
     *
     * @param  UserService  $userService
     * @return \Illuminate\Http\JsonResponse
     * 
     * @Author: Arham Irfan
     * @Date: 05 Dec, 2023
     */
    public function fetchUserPreferences(UserService $userService)
    {
        
        $userId = auth()->id();
        $data = $userService->userPreferences($userId);
        return response()->json([
            'success' => true,
            'data' => $data,
            'message' => 'Personalized news feed retrieved successfully.',
        ]);
    }

     /**
     * Validate the user preferences in the provided request.
     *
     * @param  Request  $request
     * @return void
     * 
     * @Author: Arham Irfan
     * @Date: 05 Dec, 2023
     */
    protected function validatePreferences(Request $request)
    {
        $this->validate($request, [
            'selected_sources' => 'nullable|array',
            'selected_authors' => 'nullable|array',
            'selected_categories' => 'nullable|array',
        ]);
    }
}
