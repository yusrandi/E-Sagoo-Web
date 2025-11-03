<?php

namespace App\Http\Controllers;

use App\Http\Requests\LokasiKebunRequest;
use App\Models\LokasiKebun;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LokasiKebunController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $lokasis = LokasiKebun::orderBy('nama_lokasi', 'asc')->get();
        return Inertia::render('budidaya-lokasi-kebun/index', [
            'lokasis' => $lokasis
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
    public function store(LokasiKebunRequest $request)
    {
        LokasiKebun::create($request->validated());
        return redirect()->back()->with('success', 'data created successfully.');
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
        $lokasi = LokasiKebun::find($id);
        $lokasi->update($request->all());
        return redirect()->back()->with('success', 'data updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $lokasi = LokasiKebun::find($id);
        $lokasi->delete();
        return redirect()->back()->with('success', 'data deleted successfully.');
    }
}
