<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;

class Authenticate extends Middleware
{
  protected function redirectTo($request)
{
    if ($request->expectsJson()) {
        return null; // ما يوجهش لصفحة، يرد خطأ 401 JSON
    }

    // إلا كانت route login موجودة، يوجه ليها
    if (Route::has('login')) {
        return route('login');
    }
    
    return null; // إلا ماكانش، ميدير والو
}


}
