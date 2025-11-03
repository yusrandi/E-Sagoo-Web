<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('catatan_budidayas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('lokasi_id')->constrained('lokasi_kebuns', 'id');
            $table->foreignId('aktivitas_id')->constrained('aktivitas_budidayas', 'id');
            $table->foreignId('user_id')->constrained('users', 'id');
            $table->date('tanggal_kegiatan');
            $table->text('deskripsi_kegiatan')->nullable();
            $table->text('bahan_penggunaan')->nullable();
            $table->text('alat_digunakan')->nullable();
            $table->integer('jumlah_petugas')->nullable();
            $table->decimal('biaya', 15, 2)->nullable();
            $table->text('kendala_catatan')->nullable();

            // Index untuk performa query
            $table->index('tanggal_kegiatan');
            $table->index('lokasi_id');
            $table->index('aktivitas_id');
            $table->index('user_id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('catatan_budidayas');
    }
};
