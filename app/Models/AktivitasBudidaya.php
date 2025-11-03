<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class AktivitasBudidaya extends Model
{
    use HasFactory;

    protected $table = 'aktivitas_budidayas';
    protected $primaryKey = 'id';
    public $timestamps = true;

    protected $fillable = [
        'nama_aktivitas',
        'level',
        'deskripsi',
    ];

    protected $casts = [
        'level' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get all catatan budidaya for this aktivitas.
     */
    public function catatanBudidayas(): HasMany
    {
        return $this->hasMany(CatatanBudidaya::class);
    }
}
