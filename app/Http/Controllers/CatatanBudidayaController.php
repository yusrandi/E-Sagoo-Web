<?php

namespace App\Http\Controllers;

use App\Http\Requests\CatatanBudidayaRequest;
use App\Models\AktivitasBudidaya;
use App\Models\CatatanBudidaya;
use App\Models\LokasiKebun;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CatatanBudidayaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();
        $data = CatatanBudidaya::query()
            ->when($user->role !== 'admin', function ($query) {
                // Jika bukan admin, hanya tampilkan produk milik user sendiri
                $query->where('user_id', Auth::id());
            })
            ->with(['lokasiKebun', 'aktivitasBudidaya', 'user'])
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'lokasi_id' => $item->lokasi_id,
                    'aktivitas_id' => $item->aktivitas_id,
                    'user_id' => $item->user_id,
                    'tanggal_kegiatan' => $item->tanggal_kegiatan->format('d M Y'),
                    'deskripsi_kegiatan' => $item->deskripsi_kegiatan,
                    'bahan_penggunaan' => $item->bahan_penggunaan,
                    'alat_digunakan' => $item->alat_digunakan,
                    'jumlah_petugas' => $item->jumlah_petugas,
                    'biaya' => $item->biaya,
                    'kendala_catatan' => $item->kendala_catatan,
                    'aktivitas' => $item->aktivitasBudidaya,
                    'status_aktivitas' => $item->aktivitasBudidaya->nama_aktivitas,
                    'lokasi' => $item->lokasiKebun,
                    'kebun' => $item->lokasiKebun->nama_lokasi,
                    'user' => $item->user,
                    'petani' => $item->user->name,
                    'catatan' => $item->catatan,
                    'created_at' => $item->created_at->format('d M Y'),
                    'updated_at' => $item->updated_at->format('d M Y'),
                ];
            });

        // dd($data);

        return Inertia::render('budidaya-catatan/index', [
            'catatans' => $data
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $user = Auth::user();

        $lokasis = LokasiKebun::orderBy('nama_lokasi', 'asc')->get()->map(function ($item) {
            return [
                'id' => $item->id,
                'nama_lokasi' => $item->nama_lokasi,
            ];
        });

        $aktivitases = AktivitasBudidaya::orderBy('level', 'asc')->get()->map(function ($item) {
            return [
                'id' => $item->id,
                'nama_aktivitas' => $item->nama_aktivitas,
            ];
        });

        return Inertia::render('budidaya-catatan/create', [
            'lokasis' => $lokasis,
            'aktivitases' => $aktivitases,
            'user' => $user
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CatatanBudidayaRequest $request)
    {
        $data = $request->validated();
        CatatanBudidaya::create($data);
        return redirect()->route('catatan-budidaya.index')->with('success', 'data created successfully.');
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
}
