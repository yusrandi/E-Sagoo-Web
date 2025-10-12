<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class TransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $transactions = Transaction::all();
        return response()->json(['status' => 'success', 'data' => $transactions, 'message' => 'List of transactions'], 200);
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
        // ✅ Validasi input
        $validator = Validator::make($request->all(), [
            'user.id' => 'required|exists:users,id',
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validasi gagal',
                'errors' => $validator->errors(),
            ], 422);
        }

        $userId = $request->input('user.id'); // ✅ Ambil ID user dari payload

        DB::beginTransaction();

        try {
            $totalAmount = 0;
            $itemsData = [];

            foreach ($request->items as $item) {
                $product = Product::findOrFail($item['product_id']);

                // ✅ Cek stok produk
                if ($product->stock < $item['quantity']) {
                    throw new \Exception("Stok produk '{$product->name}' tidak mencukupi");
                }

                $price = $product->price;
                $subtotal = $price * $item['quantity'];
                $totalAmount += $subtotal;

                $itemsData[] = [
                    'product_id' => $product->id,
                    'quantity'   => $item['quantity'],
                    'price'      => $price,
                    'subtotal'   => $subtotal,
                ];

                // ✅ Kurangi stok
                $product->decrement('stock', $item['quantity']);
            }

            // ✅ Buat transaksi
            $transaction = Transaction::create([
                'user_id'      => $userId,
                'total_amount' => $totalAmount,
                'status'       => 'waiting_payment',
            ]);

            // ✅ Simpan item transaksi
            foreach ($itemsData as $data) {
                $transaction->items()->create($data);
            }

            DB::commit();

            return response()->json([
                'status'  => true,
                'message' => 'Transaksi berhasil dibuat',
                'data'    => $transaction->load('items.product'),
            ], 201);
        } catch (\Throwable $e) {
            DB::rollBack();

            return response()->json([
                'status'  => false,
                'message' => 'Gagal membuat transaksi: ' . $e->getMessage(),
            ], 500);
        }
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

    public function uploadSlip(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'payment_slip' => 'required|file|mimes:jpg,jpeg,png,pdf|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validasi gagal',
                'errors' => $validator->errors(),
            ], 422);
        }

        $transaction = Transaction::find($id);
        if (!$transaction) {
            return response()->json([
                'status' => false,
                'message' => 'Transaksi tidak ditemukan',
            ], 404);
        }

        // ✅ Simpan file ke storage/app/public/payment_slips
        $path = $request->file('payment_slip')->store('payment_slips', 'public');

        // ✅ Update transaksi
        $transaction->update([
            'payment_slip' => $path,
            'status' => 'paid',
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Bukti pembayaran berhasil diupload, menunggu verifikasi admin',
            'data' => $transaction,
        ]);
    }
}
