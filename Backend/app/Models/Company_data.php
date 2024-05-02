<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Company_data extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'twitter_followers',
        'reddit_members'
    ];
}
