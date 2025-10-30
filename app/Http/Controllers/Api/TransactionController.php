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
        return response()->json(['success' => true, 'data' => $transactions, 'message' => 'List of transactions'], 200);
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
            'userId' => 'required|exists:users,id',
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validasi gagal',
                'errors' => $validator->errors(),
            ], 422);
        }

        $buyerId = $request->input('userId'); // ✅ Pembeli

        DB::beginTransaction();

        try {
            // ✅ Kelompokkan items berdasarkan seller (pemilik produk)
            $itemsBySeller = [];

            foreach ($request->items as $item) {
                $product = Product::with('user')->findOrFail($item['product_id']);
                $sellerId = $product->user_id; // ID penjual

                // ✅ Cek stok produk
                if ($product->stock < $item['quantity']) {
                    throw new \Exception("Stok produk '{$product->name}' tidak mencukupi");
                }

                $price = $product->price;
                $subtotal = $price * $item['quantity'];

                if (!isset($itemsBySeller[$sellerId])) {
                    $itemsBySeller[$sellerId] = [
                        'seller_id' => $sellerId,
                        'seller_name' => $product->user->name, // optional
                        'total_amount' => 0,
                        'items' => []
                    ];
                }

                $itemsBySeller[$sellerId]['items'][] = [
                    'product_id' => $product->id,
                    'quantity'   => $item['quantity'],
                    'price'      => $price,
                    'subtotal'   => $subtotal,
                ];

                $itemsBySeller[$sellerId]['total_amount'] += $subtotal;
            }

            $transactions = [];

            // ✅ Buat transaksi untuk setiap seller
            foreach ($itemsBySeller as $sellerData) {
                $transaction = Transaction::create([
                    'user_id'      => $buyerId, // Pembeli
                    'seller_id'    => $sellerData['seller_id'], // Penjual
                    'total_amount' => $sellerData['total_amount'],
                    'status'       => 'waiting_payment',
                ]);

                // ✅ Simpan item transaksi
                foreach ($sellerData['items'] as $itemData) {
                    $transaction->items()->create($itemData);

                    // ✅ Kurangi stok produk
                    Product::where('id', $itemData['product_id'])
                        ->decrement('stock', $itemData['quantity']);
                }

                $transactions[] = $transaction->load('items.product');
            }

            DB::commit();

            return response()->json([
                'success'  => true,
                'message' => 'Transaksi berhasil dibuat',
                'data'    => $transactions,
            ], 201);
        } catch (\Throwable $e) {
            DB::rollBack();

            return response()->json([
                'success'  => false,
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
                'success' => false,
                'message' => 'Validasi gagal',
                'errors' => $validator->errors(),
            ], 422);
        }

        $transaction = Transaction::find($id);
        if (!$transaction) {
            return response()->json([
                'success' => false,
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

        // ✅ Load relasi items dengan product
        $transaction->load(['items.product', 'items.product.images']);

        return response()->json([
            'success' => true,
            'message' => 'Bukti pembayaran berhasil diupload, menunggu verifikasi admin',
            'data' => $transaction,
        ]);
    }

    public function showByUser($userId)
    {
        $transactions = Transaction::where('user_id', $userId)->with(['items.product.images', 'items.product.user'])->orderBy('created_at', 'desc')->get();

        return response()->json([
            'success' => true,
            'message' => 'Daftar transaksi pengguna berhasil diambil',
            'data' => $transactions,
        ]);
    }
}
