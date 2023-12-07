<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthService
{
    /**
     * Register a new user with the provided data.
     *
     * @param  array  $data
     * @return array
     * 
     * @Author: Arham Irfan
     * @Date: 05 Dec, 2023
     */
    public function register(array $data)
    {
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);

        $success['token'] = $user->createToken('MyApp')->accessToken;
        $success['user'] = $user;

        return $success;
    }

    /**
     * Log in a user with the provided credentials.
     *
     * @param  array  $data
     * @return array|null
     * 
     * @Author: Arham Irfan
     * @Date: 05 Dec, 2023
     */
    public function login($data){ 
        if(Auth::attempt(['email' => $data['email'], 'password' => $data['password']])){ 
            $user = Auth::user();
            $success['token'] =  $user->createToken('MyApp')->accessToken; 
            $success['user'] =  $user;
   
            return $success;
        } 
        else{ 
            return null;
        }
    }
}
