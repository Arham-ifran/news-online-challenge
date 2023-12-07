<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Http\Resources\UserResource;
use App\Services\AuthService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    protected $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    /**
     * Register a new user.
     *
     * @param  RegisterRequest  $request
     * @return \Illuminate\Http\JsonResponse
     * 
     * @Author: Arham Irfan
     * @Date: 05 Dec, 2023
     */
    public function register(RegisterRequest $request)
    {
        $data = $request->validated();
        if ($data) {
            $response = $this->authService->register($data);
        }

        return $this->sendResponse($response, 'User register successfully.');
    }

    /**
     * Log in a user with the provided credentials.
     *
     * @param  LoginRequest  $request
     * @return \Illuminate\Http\JsonResponse
     * 
     * @Author: Arham Irfan
     * @Date: 05 Dec, 2023
     */
    public function login(LoginRequest $request)
    {
        $data = $request->validated();

        if (empty($data)) {
            return $this->sendError('Validation Error.', ['error' => 'Invalid data']);
        }

        $response = $this->authService->login($data);
        return $response
            ? $this->sendResponse($response, 'User logged in successfully.')
            : $this->sendError('Password Mismatch.', ['error' => 'Unauthorized']);
    }

    /**
     * Get the authenticated user.
     *
     * @param  Request  $request
     * @return UserResource
     * 
     * @Author: Arham Irfan
     * @Date: 05 Dec, 2023
     */
    public function user(Request $request)
    {
        return new UserResource($request->user());
    }

    /**
     * Log out the authenticated user and revoke access tokens.
     *
     * @return \Illuminate\Http\JsonResponse
     * 
     * @Author: Arham Irfan
     * @Date: 05 Dec, 2023
     */
    public function logout()
    {
        $user = Auth::user();
        $this->revokeTokens($user);

        return response()->json(['message' => 'Logout successful']);
    }

    /**
     * Revoke all access tokens for the given user.
     *
     * @param  mixed  $user
     * @return void
     * 
     * @Author: Arham Irfan
     * @Date: 05 Dec, 2023
     */
    protected function revokeTokens($user)
    {
        $user->tokens()->where('revoked', false)->update(['revoked' => true]);
    }
}
