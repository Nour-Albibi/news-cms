<?php

namespace App\Http\Controllers;

use App\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ArticleController extends Controller
{
    //
    public function index(){
        $articles=Article::all();
            return $articles;
    }
    public function create(){
        return view('articles.create');
    }
    public function store(Request $request){
        $data = $request->only('title','ArticleContent');
        $validator = Validator::make($data, [
            'title' => 'required|string',
            'ArticleContent' => 'required|string',
        ]);
        //Send failed response if request is not valid
        if ($validator->fails()) {
            return response()->json(['error' => $validator->messages()], 200);
        }
        //Request is valid, create new Article
        Article::create([
            'title' => $request->title,
            'content' => $request->ArticleContent,
        ]);
        return redirect('admin/article');
    }
    public function query_gif(Request $request){
        return 1;
    }
    public function GetArticlesForWeb(){
        $articles=Article::all();
        return view('website.articles.index',compact('articles'));
    }
    public function ShowArticleForWeb($slug){
        $article=Article::where('title',$slug)->first();
        return view('website.articles.show',compact('article'));
    }
}
