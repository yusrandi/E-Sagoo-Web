<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $transactions = Transaction::orderBy('created_at', 'desc')->get()->map(function ($transaction) {
            return [
                'id' => $transaction->id,
                'user' => $transaction->user->name,
                'total_amount' => $transaction->total_amount,
                'payment_slip' => $transaction->payment_slip,
                'items' => $transaction->items()->get()->map(fn($item) => [
                    'id' => $item->id,
                    'product_name' => $item->product->name,
                    'quantity' => $item->quantity,
                    'price' => $item->price,
                    'subtotal' => $item->subtotal,
                ]),
                'items_count' => $transaction->items()->count(),
                'status' => $transaction->status,
                'created_at' => $transaction->created_at->format('d M Y'),
                'updated_at' => $transaction->updated_at->toDateTimeString(),
            ];
        }); // Ganti dengan logika untuk mengambil data transaksi
        return Inertia::render('transaction/index', [
            'transactions' => $transactions
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

    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required',
        ]);

        $transaction = Transaction::findOrFail($id);

        $transaction->status = $request->status;
        $transaction->save();
        return response()->json([
            'message' => 'Status transaksi produk berhasil diperbarui.',
        ]);
    }
}
