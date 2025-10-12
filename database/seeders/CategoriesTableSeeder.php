<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('categories')->insert([
            ['name' => 'Mie Sagu', 'description' => 'Produk mie berbahan dasar sagu', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Kue Sagu', 'description' => 'Aneka kue dari sagu', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Papeda', 'description' => 'Olahan bubur sagu khas Papua & Maluku', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Bagea', 'description' => 'Kue kering sagu khas Maluku', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Non-Pangan', 'description' => 'Produk non makanan dari sagu', 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}
