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
        ];
    }

    public function reviewsReceived()
    {
        return $this->hasMany(ShopReview::class, 'user_id');
    }

    /**
     * Mendapatkan rata-rata rating toko (1 desimal)
     */
    public function getAvgRatingAttribute()
    {
        return round($this->reviewsReceived()->avg('rating'), 1);
    }

    /**
     * Mendapatkan total ulasan toko
     */
    public function getTotalReviewsAttribute()
    {
        return $this->reviewsReceived()->count();
    }
}
