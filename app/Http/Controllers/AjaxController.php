<?php

namespace App\Http\Controllers;

use Request;
use Image;
use Illuminate\Support\Facades\DB;

class AjaxController extends Controller
{
    public function upload_photo()
    {
    	// print(Request::all('Filedata'));die;
        $file = Request::file('Filedata');
        if($file->isValid()){
            $entension = $file->getClientOriginalExtension();//获取文件名后缀
            $newname = date('YmdHis').mt_rand(100,999).'.'.$entension;//随机生成新文件名
            $path = $file->move(base_path().'/public/upload',$newname);//移动文件到指定文件夹
            $filepath = 'upload/'.$newname;
            $data = array();
            $data['src'] = 'http://'.Request::server('HTTP_HOST'). '/' .$filepath;
            $data['media_url'] = $filepath;
            return json_encode($data);
        }
    }

    public function save_cms(Request $request)
    {
        $insert_bool = DB::table('page')->where('id', $request::post('id'))->update(['content' => json_encode($request::post('content'),JSON_HEX_QUOT)]);
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
