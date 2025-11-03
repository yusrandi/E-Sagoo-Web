<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LokasiKebunRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $rules = [
            'nama_lokasi' => 'required|string|max:100|unique:lokasi_kebuns,nama_lokasi',
            'luas_lahan' => 'nullable|numeric|min:0.01|max:999999.99',
            'alamat' => 'nullable|string|max:500',
            'keterangan' => 'nullable|string|max:1000',
        ];

        // Untuk update, ignore unique rule untuk current record
        if ($this->isMethod('PUT') || $this->isMethod('PATCH')) {
            $rules['nama_lokasi'] = 'required|string|max:100|unique:lokasi_kebuns,nama_lokasi,' . $this->route('lokasi_kebun');
        }

        return $rules;
    }

    public function messages(): array
    {
        return [
            'nama_lokasi.required' => 'Nama lokasi wajib diisi',
            'nama_lokasi.string' => 'Nama lokasi harus berupa teks',
            'nama_lokasi.max' => 'Nama lokasi maksimal 100 karakter',
            'nama_lokasi.unique' => 'Nama lokasi sudah digunakan, silakan gunakan nama lain',

            'luas_lahan.numeric' => 'Luas lahan harus berupa angka',
            'luas_lahan.min' => 'Luas lahan minimal 0.01 hektar',
            'luas_lahan.max' => 'Luas lahan maksimal 999.999,99 hektar',

            'alamat.string' => 'Alamat harus berupa teks',
            'alamat.max' => 'Alamat maksimal 500 karakter',

            'keterangan.string' => 'Keterangan harus berupa teks',
            'keterangan.max' => 'Keterangan maksimal 1000 karakter',
        ];
    }

    public function attributes(): array
    {
        return [
            'nama_lokasi' => 'nama lokasi',
            'luas_lahan' => 'luas lahan',
            'alamat' => 'alamat',
            'keterangan' => 'keterangan',
        ];
    }

    /**
     * Prepare the data for validation.
     */
    protected function prepareForValidation(): void
    {
        // Trim string inputs
        $this->merge([
            'nama_lokasi' => trim($this->nama_lokasi),
            'alamat' => $this->alamat ? trim($this->alamat) : null,
            'keterangan' => $this->keterangan ? trim($this->keterangan) : null,
        ]);
    }
}
