<?php

namespace App\Http\Controllers;

use Request;
use Image;
use Illuminate\Support\Facades\DB;

class AjaxController extends Controller
{
    public function upload_photo()
    {
        $file = Request::file('Filedata');
        if($file->isValid()){
            $entension = $file->getClientOriginalExtension();
            $newname = date('YmdHis').mt_rand(100,999).'.'.$entension;
            $path = $file->move(base_path().'/public/upload',$newname);
            $filepath = 'upload/'.$newname;
            $data = array();
            $data['src'] = 'http://'.Request::server('HTTP_HOST'). '/' .$filepath;
            $data['media_url'] = $filepath;
            return json_encode($data);
        }
    }

    public function save_cms(Request $request)
    {
        $insert_bool = DB::table('page')->where('id', $request::post('id'))->update(['content' => $request::post('content')]);
    }


    public function add_page(Request $request)
    {
        if($request::post('id')) {
            $res = DB::table('page')->where('id',$request::post('id'))->update(['title' => $request::post('title')]);
        } else {
            $res = DB::table('page')->insert(['id' => $request::post('id'),'title' => $request::post('title')]);
        }
        die('SUCCESS');
    }
}
