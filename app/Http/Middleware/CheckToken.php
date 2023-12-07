<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CheckToken
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        $token = env('VITE_APP_AUTH_TOKEN');
        $requestHeader = $request->header('x-auth-token');

        if($requestHeader != $token){
            return response()->json(['error'=>'Unauthorize access token']);
        }
        return $next($request);
    }
}
