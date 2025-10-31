<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::latest()
            ->whereNot('role', 'admin')
            ->get()->map(function ($user) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'bussiness_name' => $user->bussiness_name,
                    'address' => $user->address,
                    'email' => $user->email,
                    'role' => $user->role,
                    'status_verifikasi' => $user->status_verifikasi,
                    'created_at' => $user->created_at->format('d M Y H:i'),
                    'updated_at' => $user->updated_at->format('d M Y H:i'),
                ];
            });

        return Inertia::render('user/index', [
            'users' => $users
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function verify(Request $request, $id)
    {
        $request->validate([
            'status_verifikasi' => 'required|in:verified,pending',
        ]);

        $user = User::findOrFail($id);

        $user->status_verifikasi = $request->status_verifikasi;
        $user->save();

        return response()->json([
            'message' => 'Status verifikasi pengguna berhasil diperbarui.',
            'user' => $user,
        ]);
    }

    public function deleteAccountGuidence()
    {
        return Inertia::render('delete-account-page');
    }
}
