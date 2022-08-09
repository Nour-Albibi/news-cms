<?php
Route::group(['prefix'=>'admin'],function(){
    Auth::routes();
    Route::group(['middleware' => ['auth']],function(){
        Route::get('home','HomeController@index');
        Route::Resource('article','ArticleController');
        Route::post('article/query_gif','ArticleController@query_gif')->name('query_gif');
    });
});

