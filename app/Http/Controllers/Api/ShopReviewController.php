<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ShopReview;
use App\Models\User;
use Illuminate\Http\Request;

class ShopReviewController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Ambil semua user dengan role 'petani' atau 'penjual'
        $shops = User::whereIn('role', ['petani', 'penjual'])
            ->with(['reviewsReceived.reviewer:id,name']) // ambil review & reviewer
            ->get()
            ->map(function ($shop) {
                return [
                    'id' => $shop->id,
                    'name' => $shop->name,
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

        return response()->json([
            'data' => $shops,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create() {}

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'reviewer_id' => 'required|exists:users,id',
            'user_id' => 'required|exists:users,id', // toko yang direview
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'nullable|string|max:1000',
        ]);

        if ($validated['reviewer_id'] === $validated['user_id']) {
            return response()->json(['message' => 'Kamu tidak bisa mereview dirimu sendiri'], 422);
        }

        $review = ShopReview::create([
            'reviewer_id' => $validated['reviewer_id'],
            'user_id' => $validated['user_id'],
            'rating' => $validated['rating'],
            'comment' => $validated['comment'] ?? null,
        ]);

        return response()->json([
            'message' => 'Ulasan berhasil disimpan',
            'data' => $review,
        ], 201);
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
