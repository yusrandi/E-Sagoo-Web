<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CatatanBudidayaRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'lokasi_id' => [
                'required',
                'integer',
                Rule::exists('lokasi_kebuns', 'id')
            ],
            'aktivitas_id' => [
                'required',
                'integer',
                Rule::exists('aktivitas_budidayas', 'id')
            ],
            'user_id' => [
                'required',
                'integer',
                Rule::exists('users', 'id')
            ],
            'tanggal_kegiatan' => 'required|date|before_or_equal:today',
            'deskripsi_kegiatan' => 'nullable|string|min:10|max:2000',
            'bahan_penggunaan' => 'nullable|string|max:1000',
            'alat_digunakan' => 'nullable|string|max:500',
            'jumlah_petugas' => 'nullable|integer|min:1|max:1000',
            'biaya' => 'nullable|numeric|min:0|max:999999999999.99',
            'kendala_catatan' => 'nullable|string|max:1000',
        ];
    }
    public function messages(): array
    {
        return [
            'lokasi_id.required' => 'Lokasi kebun wajib dipilih',
            'lokasi_id.integer' => 'Lokasi kebun tidak valid',
            'lokasi_id.exists' => 'Lokasi kebun yang dipilih tidak ditemukan',

            'aktivitas_id.required' => 'Jenis aktivitas wajib dipilih',
            'aktivitas_id.integer' => 'Jenis aktivitas tidak valid',
            'aktivitas_id.exists' => 'Jenis aktivitas yang dipilih tidak ditemukan',

            'user_id.required' => 'Pencatat wajib dipilih',
            'user_id.integer' => 'Pencatat tidak valid',
            'user_id.exists' => 'Pencatat yang dipilih tidak ditemukan',

            'tanggal_kegiatan.required' => 'Tanggal kegiatan wajib diisi',
            'tanggal_kegiatan.date' => 'Format tanggal tidak valid',
            'tanggal_kegiatan.before_or_equal' => 'Tanggal kegiatan tidak boleh melebihi tanggal hari ini',

            'deskripsi_kegiatan.string' => 'Deskripsi kegiatan harus berupa teks',
            'deskripsi_kegiatan.min' => 'Deskripsi kegiatan minimal 10 karakter',
            'deskripsi_kegiatan.max' => 'Deskripsi kegiatan maksimal 2000 karakter',

            'bahan_penggunaan.string' => 'Bahan penggunaan harus berupa teks',
            'bahan_penggunaan.max' => 'Bahan penggunaan maksimal 1000 karakter',

            'alat_digunakan.string' => 'Alat digunakan harus berupa teks',
            'alat_digunakan.max' => 'Alat digunakan maksimal 500 karakter',

            'jumlah_petugas.integer' => 'Jumlah petugas harus berupa angka',
            'jumlah_petugas.min' => 'Jumlah petugas minimal 1 orang',
            'jumlah_petugas.max' => 'Jumlah petugas maksimal 1000 orang',

            'biaya.numeric' => 'Biaya harus berupa angka',
            'biaya.min' => 'Biaya tidak boleh negatif',
            'biaya.max' => 'Biaya terlalu besar',

            'kendala_catatan.string' => 'Catatan kendala harus berupa teks',
            'kendala_catatan.max' => 'Catatan kendala maksimal 1000 karakter',
        ];
    }
    public function attributes(): array
    {
        return [
            'lokasi_id' => 'lokasi kebun',
            'aktivitas_id' => 'jenis aktivitas',
            'user_id' => 'pencatat',
            'tanggal_kegiatan' => 'tanggal kegiatan',
            'deskripsi_kegiatan' => 'deskripsi kegiatan',
            'bahan_penggunaan' => 'bahan penggunaan',
            'alat_digunakan' => 'alat digunakan',
            'jumlah_petugas' => 'jumlah petugas',
            'biaya' => 'biaya',
            'kendala_catatan' => 'catatan kendala',
            'foto_dokumentasi' => 'foto dokumentasi',
            'dia_input_oleh' => 'nama pencatat',
        ];
    }
    protected function prepareForValidation(): void
    {
        $this->merge([
            'deskripsi_kegiatan' => trim($this->deskripsi_kegiatan),
            'bahan_penggunaan' => $this->bahan_penggunaan ? trim($this->bahan_penggunaan) : null,
            'alat_digunakan' => $this->alat_digunakan ? trim($this->alat_digunakan) : null,
            'kendala_catatan' => $this->kendala_catatan ? trim($this->kendala_catatan) : null,
            'dia_input_oleh' => trim($this->dia_input_oleh),

            // Convert empty strings to null for nullable fields
            'jumlah_petugas' => $this->jumlah_petugas === '' ? null : $this->jumlah_petugas,
            'biaya' => $this->biaya === '' ? null : $this->biaya,
        ]);
    }
    public function validated($key = null, $default = null)
    {
        $validated = parent::validated($key, $default);

        // Set default values for nullable fields if needed
        if (!isset($validated['jumlah_petugas'])) {
            $validated['jumlah_petugas'] = null;
        }
        if (!isset($validated['biaya'])) {
            $validated['biaya'] = null;
        }

        return $validated;
    }
}
