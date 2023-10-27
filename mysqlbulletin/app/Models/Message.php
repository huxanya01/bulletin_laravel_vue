<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Message extends Model
{
    use HasFactory;
    protected $fillable =['user_id','name','content'];

    public static function findAll()
    {
        return DB::table('messages')->orderBy('created_at', 'desc')->get();
    }
}
