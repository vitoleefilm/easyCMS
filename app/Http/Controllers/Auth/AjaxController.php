<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Request;


class AjaxController extends Controller
{
    

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest');
    }

    public function upload_photo()
    {
        $file = Request::file('Filedata');
        if($file->isValid()){
            $entension = $file->getClientOriginalExtension();//获取文件名后缀
            $newname = date('YmdHis').mt_rand(100,999).'.'.$entension;//随机生成新文件名
            $path = $file->move(base_path().'/public/upload',$newname);//移动文件到指定文件夹
            $filepath = 'upload/'.$newname;
            return $filepath;
        }
    }
}
