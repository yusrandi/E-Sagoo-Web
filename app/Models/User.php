<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'status_verifikasi',
        'bussiness_name',
        'address',
        'is_active'

    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'is_active' => 'boolean',
        ];
    }

    public function reviewsReceived()
    {
        return $this->hasMany(ShopReview::class, 'user_id');
    }



    // Accessor untuk avg_rating
    public function getAvgRatingAttribute()
    {
        $rating = $this->reviewsReceived()->avg('rating');
        return $rating ? number_format((float)$rating, 1) : '0.0';
    }

    // Accessor untuk total_reviews
    public function getTotalReviewsAttribute()
    {
        return $this->reviewsReceived()->count();
    }

    // Optional: Append accessor ke response
    protected $appends = ['avg_rating', 'total_reviews'];
}
