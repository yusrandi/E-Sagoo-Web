<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AktivitasBudidayaRequest extends FormRequest
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
        $rules = [
            'nama_aktivitas' => 'required|string|max:100|unique:aktivitas_budidayas,nama_aktivitas',
            'level' => 'required|numeric|max:100|unique:aktivitas_budidayas,level',
            'deskripsi' => 'nullable|string|max:500',
        ];

        // Untuk update, ignore unique rule untuk current record
        if ($this->isMethod('PUT') || $this->isMethod('PATCH')) {
            $rules['nama_aktivitas'] = 'required|string|max:100|unique:aktivitas_budidayas,nama_aktivitas,' . $this->route('aktivitas_budidaya');
        }

        return $rules;
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'nama_aktivitas.required' => 'Nama aktivitas wajib diisi',
            'nama_aktivitas.string' => 'Nama aktivitas harus berupa teks',
            'nama_aktivitas.max' => 'Nama aktivitas maksimal 100 karakter',
            'nama_aktivitas.unique' => 'Nama aktivitas sudah ada dalam sistem',

            'level.required' => 'Level wajib diisi',
            'level.numeric' => 'Level harus berupa angka',
            'level.max' => 'Level maksimal 100',
            'level.unique' => 'Level sudah ada dalam sistem',

            'deskripsi.string' => 'Deskripsi harus berupa teks',
            'deskripsi.max' => 'Deskripsi maksimal 500 karakter',
        ];
    }

    /**
     * Get custom attributes for validator errors.
     *
     * @return array<string, string>
     */
    public function attributes(): array
    {
        return [
            'nama_aktivitas' => 'nama aktivitas',
            'level' => 'level',
            'deskripsi' => 'deskripsi',
        ];
    }

    /**
     * Prepare the data for validation.
     */
    protected function prepareForValidation(): void
    {
        $this->merge([
            'nama_aktivitas' => trim($this->nama_aktivitas),
            'level' => trim($this->level),
            'deskripsi' => $this->deskripsi ? trim($this->deskripsi) : null,
        ]);
    }
}
