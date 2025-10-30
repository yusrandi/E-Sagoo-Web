<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\BankAccount;
use Illuminate\Http\Request;

class BankAccountController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $bankAccounts = BankAccount::where('is_active', true)
                ->orderBy('bank_name')
                ->get();

            return response()->json([
                'success' => true,
                'message' => 'Daftar bank account berhasil diambil',
                'data' => $bankAccounts
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil daftar bank account',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'bank_name' => 'required|string|max:255',
                'account_number' => 'required|string|max:255',
                'account_name' => 'required|string|max:255',
                'logo' => 'nullable|string|max:255',
            ]);

            $bankAccount = BankAccount::create($validated);

            return response()->json([
                'success' => true,
                'message' => 'Bank account berhasil dibuat',
                'data' => $bankAccount
            ], 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validasi gagal',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal membuat bank account',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        try {
            $bankAccount = BankAccount::find($id);

            if (!$bankAccount) {
                return response()->json([
                    'success' => false,
                    'message' => 'Bank account tidak ditemukan'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'message' => 'Detail bank account berhasil diambil',
                'data' => $bankAccount
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil detail bank account',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        try {
            $bankAccount = BankAccount::find($id);

            if (!$bankAccount) {
                return response()->json([
                    'success' => false,
                    'message' => 'Bank account tidak ditemukan'
                ], 404);
            }

            $validated = $request->validate([
                'bank_name' => 'sometimes|required|string|max:255',
                'account_number' => 'sometimes|required|string|max:255',
                'account_name' => 'sometimes|required|string|max:255',
                'logo' => 'nullable|string|max:255',
                'is_active' => 'sometimes|boolean',
            ]);

            $bankAccount->update($validated);

            return response()->json([
                'success' => true,
                'message' => 'Bank account berhasil diupdate',
                'data' => $bankAccount
            ], 200);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validasi gagal',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengupdate bank account',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $bankAccount = BankAccount::find($id);

            if (!$bankAccount) {
                return response()->json([
                    'success' => false,
                    'message' => 'Bank account tidak ditemukan'
                ], 404);
            }

            $bankAccount->delete();

            return response()->json([
                'success' => true,
                'message' => 'Bank account berhasil dihapus'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal menghapus bank account',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Toggle active status
     */
    public function toggleStatus($id)
    {
        try {
            $bankAccount = BankAccount::find($id);

            if (!$bankAccount) {
                return response()->json([
                    'success' => false,
                    'message' => 'Bank account tidak ditemukan'
                ], 404);
            }

            $bankAccount->update([
                'is_active' => !$bankAccount->is_active
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Status bank account berhasil diupdate',
                'data' => $bankAccount
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengupdate status bank account',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
