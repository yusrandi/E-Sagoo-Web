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
        $user = Auth::user();

        // Hitung total produk
        $totalProduk = Product::query()
            ->when($user->role !== 'admin', function ($query) use ($user) {
                $query->where('user_id', $user->id);
            })
            ->count();

        // Hitung total transaksi
        $totalTransaksi = Transaction::query()
            ->when($user->role !== 'admin', function ($query) use ($user) {
                $query->whereHas('items.product', function ($subQuery) use ($user) {
                    $subQuery->where('user_id', $user->id);
                });
            })
            ->count();

        // Hitung transaksi berdasarkan status
        $transaksiWaiting = Transaction::query()
            ->where('status', 'waiting_payment')
            ->when($user->role !== 'admin', function ($query) use ($user) {
                $query->whereHas('items.product', function ($subQuery) use ($user) {
                    $subQuery->where('user_id', $user->id);
                });
            })
            ->count();

        // Hitung transaksi berdasarkan status
        $transaksiPaid = Transaction::query()
            ->where('status', 'paid')
            ->when($user->role !== 'admin', function ($query) use ($user) {
                $query->whereHas('items.product', function ($subQuery) use ($user) {
                    $subQuery->where('user_id', $user->id);
                });
            })
            ->count();
        // Hitung transaksi berdasarkan status
        $transaksiCompleted = Transaction::query()
            ->where('status', 'completed')
            ->when($user->role !== 'admin', function ($query) use ($user) {
                $query->whereHas('items.product', function ($subQuery) use ($user) {
                    $subQuery->where('user_id', $user->id);
                });
            })
            ->count();

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

        $penjualStats = [
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
                'title' => 'Transaksi Menunggu Pembayaran',
                'value' => number_format($transaksiWaiting, 0, ',', '.'),
                'unit'  => 'transaksi',
                'change' => '-3%',
                'positive' => false,
            ],
            [
                'title' => 'Transaksi Dibayar',
                'value' => number_format($transaksiPaid, 0, ',', '.'),
                'unit'  => 'transaksi',
                'change' => '-3%',
                'positive' => false,
            ],
            [
                'title' => 'Transaksi Selesai',
                'value' => number_format($transaksiCompleted, 0, ',', '.'),
                'unit'  => 'transaksi',
                'change' => '-3%',
                'positive' => false,
            ],
        ];

        $transaksiPerBulan = Transaction::selectRaw("
        MONTHNAME(created_at) as month,
        SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completed,
        SUM(CASE WHEN status = 'cancelled' THEN 1 ELSE 0 END) as cancelled,
        SUM(CASE WHEN status = 'waiting_payment' THEN 1 ELSE 0 END) as waiting_payment,
        SUM(CASE WHEN status = 'paid' THEN 1 ELSE 0 END) as paid,
        SUM(CASE WHEN status = 'shipped' THEN 1 ELSE 0 END) as shipped
    ")
            ->when($user->role !== 'admin', function ($query) use ($user) {
                $query->whereHas('items.product', function ($subQuery) use ($user) {
                    $subQuery->where('user_id', $user->id);
                });
            })
            ->groupBy(DB::raw('MONTH(created_at)'), DB::raw('MONTHNAME(created_at)'))
            ->orderBy(DB::raw('MONTH(created_at)'))
            ->get();


        // Hitung total per status
        $statusCounts = Transaction::select('status', DB::raw('COUNT(*) as total'))
            ->when($user->role !== 'admin', function ($query) use ($user) {
                $query->whereHas('items.product', function ($subQuery) use ($user) {
                    $subQuery->where('user_id', $user->id);
                });
            })
            ->groupBy('status')
            ->pluck('total', 'status')
            ->toArray();

        // Buat format data untuk chart
        $chartDataPie = [
            [
                'status' => 'pending',
                'value' => (int) ($statusCounts['pending'] ?? 0),
                'fill' => 'var(--chart-1)',
            ],
            [
                'status' => 'waiting_payment',
                'value' => (int) ($statusCounts['waiting_payment'] ?? 0),
                'fill' => 'var(--chart-2)',
            ],
            [
                'status' => 'paid',
                'value' => (int) ($statusCounts['paid'] ?? 0),
                'fill' => 'var(--chart-3)',
            ],
            [
                'status' => 'verified',
                'value' => (int) ($statusCounts['verified'] ?? 0),
                'fill' => 'var(--chart-4)',
            ],
            [
                'status' => 'shipped',
                'value' => (int) ($statusCounts['shipped'] ?? 0),
                'fill' => 'var(--chart-5)',
            ],
            [
                'status' => 'completed',
                'value' => (int) ($statusCounts['completed'] ?? 0),
                'fill' => 'var(--chart-6)',
            ],
            [
                'status' => 'cancelled',
                'value' => (int) ($statusCounts['cancelled'] ?? 0),
                'fill' => 'var(--chart-7)',
            ],
        ];

        //
        $transactions = Transaction::when($user->role !== 'admin', function ($query) use ($user) {
            $query->whereHas('items.product', function ($subQuery) use ($user) {
                $subQuery->where('user_id', $user->id);
            });
        })
            ->orderBy('created_at', 'desc')->get()->map(function ($transaction) {
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

        $shopReviews = User::whereIn('role', ['petani', 'penjual'])
            ->with(['reviewsReceived.reviewer:id,name']) // ambil review & reviewer
            ->get()
            ->map(function ($shop) {
                return [
                    'id' => $shop->id,
                    'name' => $shop->name,
                    'shop_name' => $shop->bussiness_name,
                    'avg_rating' => $shop->avg_rating ? number_format($shop->avg_rating, 1) : '0.0',
                    'total_reviews' => $shop->total_reviews,
                    'reviews' => $shop->reviewsReceived->map(function ($r) {
                        return [
                            'id' => $r->id,
                            'reviewer' => $r->reviewer->name ?? null,
                            'rating' => $r->rating,
                            'comment' => $r->comment,
                            'created_at' => $r->created_at->diffForHumans(),
                        ];
                    }),
                ];
            });

        // Ambil data toko user yang login (jika role petani/penjual)
        $myShop = null;
        if (in_array($user->role, ['petani', 'penjual'])) {
            $myShop = User::with([
                'reviewsReceived' => function ($query) {
                    $query->orderBy('created_at', 'desc')
                        ->take(10)
                        ->with('reviewer:id,name'); // Nested eager loading
                }
            ])->find($user->id);

            if ($myShop) {
                $myShop = [
                    'id' => $myShop->id,
                    'name' => $myShop->name,
                    'shop_name' => $myShop->bussiness_name,
                    'avg_rating' => $myShop->avg_rating ? number_format($myShop->avg_rating, 1) : '0.0',
                    'total_reviews' => $myShop->total_reviews,
                    'reviews' => $myShop->reviewsReceived->map(function ($r) {
                        return [
                            'id' => $r->id,
                            'reviewer' => $r->reviewer->name ?? null,
                            'rating' => $r->rating,
                            'comment' => $r->comment,
                            'created_at' => $r->created_at->diffForHumans(),
                        ];
                    }),
                ];
            }
        }

        // dd($myShop);
        if ($user->role === 'admin') {
            return Inertia::render('dashboard', [
                'stats' => $stats,
                'chartData' => $transaksiPerBulan,
                'chartDataPie' => $chartDataPie,
                'transactions' => $transactions,
                'shopReviews' => $shopReviews,
            ]);
        } else {
            return Inertia::render('dashboard-penjual', [
                'stats' => $penjualStats,
                'shopReviews' => $shopReviews,
                'chartData' => $transaksiPerBulan,
                'chartDataPie' => $chartDataPie,
                'shopReviews' => $myShop,
                'transactions' => $transactions,
            ]);
        }
    }
}
