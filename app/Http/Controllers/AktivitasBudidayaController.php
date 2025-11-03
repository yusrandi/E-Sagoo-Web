<?php

namespace App\Http\Controllers;

use App\Http\Requests\AktivitasBudidayaRequest;
use App\Models\AktivitasBudidaya;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AktivitasBudidayaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $datas = AktivitasBudidaya::orderBy('level', 'asc')->get();
        return Inertia::render('budidaya-aktivitas/index', [
            'datas' => $datas
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
    public function store(AktivitasBudidayaRequest $request)
    {
        AktivitasBudidaya::create($request->validated());
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
        $aktivitas = AktivitasBudidaya::find($id);
        $aktivitas->update($request->all());
        return redirect()->back()->with('success', 'data updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $aktivitas = AktivitasBudidaya::find($id);
        $aktivitas->delete();
        return redirect()->back()->with('success', 'data deleted successfully.');
    }
}
