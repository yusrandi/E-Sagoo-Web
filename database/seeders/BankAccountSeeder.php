<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BankAccountSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('bank_accounts')->insert([
            [
                'bank_name' => 'BCA',
                'account_number' => '1234 5678 9012',
                'account_name' => 'SAGOO CRAFT STORE',
                'logo' => 'assets/banks/bca.png',
                'is_active' => true,
            ],
            [
                'bank_name' => 'BNI',
                'account_number' => '3456 7890 1234',
                'account_name' => 'SAGOO CRAFT STORE',
                'logo' => 'assets/banks/bni.png',
                'is_active' => true,
            ],
            [
                'bank_name' => 'Mandiri',
                'account_number' => '5678 9012 3456',
                'account_name' => 'SAGOO CRAFT STORE',
                'logo' => 'assets/banks/mandiri.png',
                'is_active' => true,
            ],
            [
                'bank_name' => 'BRI',
                'account_number' => '7890 1234 5678',
                'account_name' => 'SAGOO CRAFT STORE',
                'logo' => 'assets/banks/bri.png',
                'is_active' => true,
            ],
        ]);
    }
}
