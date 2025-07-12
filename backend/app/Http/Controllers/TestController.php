<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TestController extends Controller
{
    public function holaMundo()
    {
        return response()->json(['mensaje' => 'hola mundo']);
    }
}
