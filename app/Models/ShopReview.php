<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ShopReview extends Model
{
    protected $fillable = ['reviewer_id', 'user_id', 'rating', 'comment'];

    public function reviewer()
    {
        return $this->belongsTo(User::class, 'reviewer_id');
    }

    public function user() // toko yang direview
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
