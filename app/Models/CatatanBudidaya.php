<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CatatanBudidaya extends Model
{
    use HasFactory;

    protected $table = 'catatan_budidayas';
    protected $primaryKey = 'id';
    public $timestamps = true;

    protected $fillable = [
        'lokasi_id',
        'aktivitas_id',
        'user_id',
        'tanggal_kegiatan',
        'deskripsi_kegiatan',
        'bahan_penggunaan',
        'alat_digunakan',
        'jumlah_petugas',
        'biaya',
        'kendala_catatan',
    ];

    protected $casts = [
        'lokasi_id' => 'integer',
        'aktivitas_id' => 'integer',
        'user_id' => 'integer',
        'tanggal_kegiatan' => 'date',
        'biaya' => 'decimal:2',
        'jumlah_petugas' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the lokasi kebun that owns the catatan budidaya.
     */
    public function lokasiKebun(): BelongsTo
    {
        return $this->belongsTo(LokasiKebun::class, 'lokasi_id');
    }

    /**
     * Get the aktivitas budidaya that owns the catatan budidaya.
     */
    public function aktivitasBudidaya(): BelongsTo
    {
        return $this->belongsTo(AktivitasBudidaya::class, 'aktivitas_id');
    }
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
