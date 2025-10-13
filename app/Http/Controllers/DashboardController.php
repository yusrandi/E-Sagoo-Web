<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index()
    {
        $userRole = Auth::user()->role;

        // Hitung total produk
        $totalProduk = Product::count();

        // Hitung total transaksi
        $totalTransaksi = Transaction::count();

        // Total mitra produktif (contoh: role = 'mitra' dan status = 'produktif')
        $totalMitraProduktif = User::where('role', 'petani')
            ->where('status_verifikasi', 'verified')
            ->count();

        // Total mitra non produktif
        $totalMitraNonProduktif = User::where('role', 'penjual')
            ->where('status_verifikasi', 'verified')
            ->count();

        // Total pembeli
        $totalPembeli = User::where('role', 'pembeli')->where('status_verifikasi', 'verified')->count();

        // Buat array stats untuk dikirim ke React
        $stats = [
            [
                'title' => 'Total Produk',
                'value' => number_format($totalProduk, 0, ',', '.'),
                'unit'  => 'item',
                'change' => '+12%',
                'positive' => true,
            ],
            [
                'title' => 'Total Transaksi',
                'value' => number_format($totalTransaksi, 0, ',', '.'),
                'unit'  => 'transaksi',
                'change' => '-3%',
                'positive' => false,
            ],
            [
                'title' => 'Total Mitra Produktif',
                'value' => number_format($totalMitraProduktif, 0, ',', '.'), // contoh rumus
                'unit'  => 'orang',
                'change' => '+8%',
                'positive' => true,
            ],
            [
                'title' => 'Total Mitra Non Produktif',
                'value' => number_format($totalMitraNonProduktif, 0, ',', '.'),
                'unit'  => 'orang',
                'change' => '+4%',
                'positive' => true,
            ],
            [
                'title' => 'Total Pembeli',
                'value' => number_format($totalPembeli, 0, ',', '.'),
                'unit'  => 'pengguna',
                'change' => '0%',
                'positive' => true,
            ],
        ];

        $transaksiPerBulan = Transaction::selectRaw("
            MONTHNAME(created_at) as month,
            SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completed,
            SUM(CASE WHEN status = 'cancelled' THEN 1 ELSE 0 END) as cancelled
        ")
            ->groupBy(DB::raw('MONTH(created_at)'), DB::raw('MONTHNAME(created_at)'))
            ->orderBy(DB::raw('MONTH(created_at)'))
            ->get();


        // Hitung total per status
        $statusCounts = Transaction::select('status', DB::raw('COUNT(*) as total'))
            ->groupBy('status')
            ->pluck('total', 'status')
            ->toArray();

        // Buat format data untuk chart
        $chartDataPie = [
            [
                'status' => 'pending',
                'value' => (int) ($statusCounts['pending'] ?? 0),
                'fill' => 'var(--color-pending)',
            ],
            [
                'status' => 'waiting_payment',
                'value' => (int) ($statusCounts['waiting_payment'] ?? 0),
                'fill' => 'var(--color-waiting_payment)',
            ],
            [
                'status' => 'paid',
                'value' => (int) ($statusCounts['paid'] ?? 0),
                'fill' => 'var(--color-paid)',
            ],
            [
                'status' => 'verified',
                'value' => (int) ($statusCounts['verified'] ?? 0),
                'fill' => 'var(--color-verified)',
            ],
            [
                'status' => 'shipped',
                'value' => (int) ($statusCounts['shipped'] ?? 0),
                'fill' => 'var(--color-shipped)',
            ],
            [
                'status' => 'completed',
                'value' => (int) ($statusCounts['completed'] ?? 0),
                'fill' => 'var(--color-chart-2)',
            ],
            [
                'status' => 'cancelled',
                'value' => (int) ($statusCounts['cancelled'] ?? 0),
                'fill' => 'var(--color-cancelled)',
            ],
        ];

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

        return Inertia::render('dashboard', [
            'stats' => $stats,
            'chartData' => $transaksiPerBulan,
            'chartDataPie' => $chartDataPie,
            'transactions' => $transactions,
        ]);

        // if ($userRole === 'admin') {
        //     return Inertia::render('dashboard', [
        //         'stats' => $stats,
        //         'chartData' => $transaksiPerBulan,
        //         'chartDataPie' => $chartDataPie,
        //         'transactions' => $transactions,
        //     ]);
        // } elseif ($userRole === 'petani') {
        //     return Inertia::render('dashboard-petani');
        // } elseif ($userRole === 'penjual') {
        //     return Inertia::render('dashboard-penjual');
        // } else {
        //     abort(403, 'Unauthorized action.');
        // }
    }
}
