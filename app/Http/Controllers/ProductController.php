<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductRequest;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\File;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();
        $products = Product::query()
            ->when($user->role !== 'admin', function ($query) {
                // Jika bukan admin, hanya tampilkan produk milik user sendiri
                $query->where('user_id', Auth::id());
            })
            ->orderBy('name')
            ->get()
            ->map(function ($product) {
                return [
                    'id'                 => $product->id,
                    'name'               => $product->name,
                    'description'        => $product->description,
                    'price'              => $product->price,
                    'stock'              => $product->stock,
                    'status_verifikasi'  => $product->status_verifikasi,
                    'created_at'         => $product->created_at->format('d M Y'),
                    'updated_at'         => $product->updated_at->format('d M Y'),
                    'category'           => $product->category,
                    'user'               => $product->user->name,
                    'bussiness_name'     => $product->user->bussiness_name,
                    'image'              => $product->primaryImage,
                    'images'             => $product->images()->get()->map(fn($image) => $image->image_url),
                ];
            });
        return Inertia::render('product/index', [
            'products' => $products
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Category::orderBy('name')->get()->map(function ($category) {
            return [
                'id' => $category->id,
                'name' => $category->name,
            ];
        });
        return Inertia::render('product/create', [
            'categories' => $categories,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ProductRequest $request)
    {

        $data = $request->validated();
        $message = '';
        if ($request['id'] == 0) {
            // CREATE
            // dd($data);
            $product = Product::create([
                'category_id' => $data['category_id'],
                'user_id'     => \Illuminate\Support\Facades\Auth::id(), // penjual = user login
                'name'        => $data['name'],
                'description' => $data['description'] ?? null,
                'price'       => $data['price'],
                'stock'       => $data['stock'],
            ]);

            if ($request->hasFile('newImages')) {
                foreach ($request->file('newImages') as $index => $image) {
                    $path = $image->store('products', 'public');
                    $product->images()->create([
                        'image_url'  => $path,
                        'is_primary' => $index === 0, // default: gambar pertama jadi utama
                    ]);
                }
            }
            $message = 'Product created successfully.';
        } else {
            // UPDATE
            $product = Product::find($request['id']);

            if (!$product) {
                return redirect()->back()->with('error', 'Product not found.');
            }
            // update data produk
            $product->update([
                'category_id' => $data['category_id'],
                'name'        => $data['name'],
                'description' => $data['description'] ?? null,
                'price'       => $data['price'],
                'stock'       => $data['stock'],
            ]);

            // handle images (hapus / tambah baru sesuai logika mu)
            if ($request->hasFile('newImages')) {
                foreach ($request->file('newImages') as $index => $image) {
                    $path = $image->store('products', 'public');
                    $product->images()->create([
                        'image_url'  => $path,
                        'is_primary' => false,
                    ]);
                }
            }

            if ($request->deletedImages) {
                foreach ($request->deletedImages as $img) {
                    $product->images()->where('image_url', $img)->delete();
                    // Hapus file dari storage jika ada
                    $filePath = storage_path('app/public/' . $img);
                    if (File::exists($filePath)) {
                        File::delete($filePath);
                    }
                }
            }
            $message = 'Product updated successfully.';
        }
        return redirect()->route('product.index')->with('success', $message);
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        $categories = Category::orderBy('name')->get()->map(function ($category) {
            return [
                'id' => $category->id,
                'name' => $category->name,
            ];
        });
        return Inertia::render('product/create', [
            'categories' => $categories,
            'productSelected' => [
                'id'          => $product->id,
                'name'        => $product->name,
                'description' => $product->description,
                'price'       => $product->price,
                'stock'       => $product->stock,
                'category' => $product->category,
                'images'      => $product->images()->get()->map(fn($image) => [
                    'id'         => $image->id,
                    'image_url'  => $image->image_url,
                    'is_primary' => $image->is_primary,
                ]),
            ],
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {

        $data = $request->validated();
        dd([
            'all'   => $request->all(),
            'files' => $request->file(),
        ]);
        // update data produk
        $product->update([
            'category_id' => $data['category_id'],
            'name'        => $data['name'],
            'description' => $data['description'] ?? null,
            'price'       => $data['price'],
            'stock'       => $data['stock'],
        ]);

        // ====== HANDLE GAMBAR ======
        if ($request->has('images')) {
            // ambil semua id gambar lama biar tau mana yg masih dipakai
            $oldImages = $product->images()->pluck('image_url')->toArray();
            $newImages = [];

            foreach ($request->images as $index => $img) {
                // CASE 1: file baru
                if ($request->hasFile("images.$index")) {
                    $path = $request->file("images.$index")->store('products', 'public');
                    $product->images()->create([
                        'image_url'  => $path,
                        'is_primary' => $index === 0,
                    ]);
                    $newImages[] = $path;
                }
                // CASE 2: string lama (url path dari DB)
                elseif (is_string($img)) {
                    // masih dipakai → tambahkan ke daftar baru
                    $newImages[] = $img;
                }
                // CASE 3: null → di-skip (berarti user hapus slot ini)
            }

            // hapus gambar lama yg tidak ada di newImages
            $product->images()
                ->whereNotIn('image_url', $newImages)
                ->delete();
        }

        return redirect()->route('product.index')
            ->with('success', 'Product updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        $product->delete();

        // Hapus file dari storage jika ada
        foreach ($product->images as $img) {
            $filePath = storage_path('app/public/' . $img->image_url);
            if (File::exists($filePath)) {
                File::delete($filePath);
            }
        }

        return redirect()->back()->with('success', 'Product deleted successfully.');
    }

    public function verify(Request $request, $id)
    {
        $request->validate([
            'status_verifikasi' => 'required|in:verified,pending',
        ]);

        $product = Product::findOrFail($id);

        $product->status_verifikasi = $request->status_verifikasi;
        $product->save();

        return response()->json([
            'message' => 'Status verifikasi produk berhasil diperbarui.',
            'product' => $product,
        ]);
    }
}
