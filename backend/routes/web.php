<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/test', [App\Http\Controllers\TestController::class, 'holaMundo']);

// Ruta de prueba simple
Route::get('/test-simple', function () {
    throw new Exception('¡Error de prueba!');
});
