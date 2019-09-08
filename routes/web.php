<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', 'PageController@index');
Route::get('/page/edit/{id}','\App\Http\Controllers\PageController@edit');
Route::get('/page/detail/{id}','\App\Http\Controllers\PageController@detail');

 Route::post('/upload_photo', 'AjaxController@upload_photo');
 Route::post('/save_cms', 'AjaxController@save_cms');
 Route::post('/add_page', 'AjaxController@add_page');
