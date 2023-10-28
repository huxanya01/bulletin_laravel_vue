<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\SoftDeletes;

class Message extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $fillable =['user_id','name','content'];

    public static function findAll()
    {
        return DB::table('messages')->whereNull('deleted_at')->orderBy('created_at', 'desc')->get();
    }
}
