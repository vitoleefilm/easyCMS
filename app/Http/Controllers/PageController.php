<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PageController extends Controller
{
    //
    public function index()
    {
    	$Pages = DB::table('page')->get();
    	return view('index')->with('Pages',$Pages);
    }

    public function edit($id)
    {
        $Page = DB::table('page')->where('id',$id)->first();
        return view('easyCMS')->with('data',$Page);
    }


    public function detail($id)
    {
    	$Page = DB::table('page')->where('id',$id)->first();
        $content = json_decode($Page->content);
        print_r($content);die;
    	return view('detail')->with('data',$Page);
    }


}
