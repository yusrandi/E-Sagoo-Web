<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            [
                'name' => 'Super Admin',
                'email' => 'admin@sagu.com',
                'password' => Hash::make('1sampai8'), // ubah sesuai kebutuhan
                'role' => 'admin',
                'status_verifikasi' => 'verified',
                'created_at' => now(),
                'updated_at' => now(),
            ],

        ]);
    }
}
