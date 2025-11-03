<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class LokasiKebun extends Model
{
    use HasFactory;

    protected $table = 'lokasi_kebuns';
    protected $primaryKey = 'id';
    public $timestamps = true;

    protected $fillable = [
        'nama_lokasi',
        'luas_lahan',
        'alamat',
        'keterangan',
    ];

    protected $casts = [
        'luas_lahan' => 'decimal:2',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get all catatan budidaya for this lokasi kebun.
     */
    public function catatanBudidayas(): HasMany
    {
        return $this->hasMany(CatatanBudidaya::class);
    }
}
