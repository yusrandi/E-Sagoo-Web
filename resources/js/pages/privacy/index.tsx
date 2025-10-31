type PrivacyPolicyProps = {
    effectiveDate?: string;
};

export default function PrivacyPolicy({
    effectiveDate = new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }),
}: PrivacyPolicyProps) {
    return (
        <main className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl rounded-2xl bg-white p-8 shadow-lg sm:p-12">
                <header className="mb-8">
                    <h1 className="text-3xl font-extrabold text-gray-900">Kebijakan Privasi — eSagooCraft</h1>
                    <p className="mt-2 text-sm text-gray-600">
                        Tanggal Berlaku: <span className="font-medium">{effectiveDate}</span>
                    </p>
                </header>

                <section className="prose prose-slate max-w-none">
                    <p>
                        Selamat datang di <strong>eSagooCraft</strong>. Kami menghargai privasi Anda dan berkomitmen untuk melindungi data pribadi
                        pengguna. Kebijakan ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi pribadi Anda saat
                        menggunakan aplikasi kami.
                    </p>

                    <h2>1. Informasi yang Kami Kumpulkan</h2>
                    <ul>
                        <li>
                            <strong>Data Akun:</strong> nama lengkap, alamat email, dan nomor telepon yang Anda berikan saat membuat akun.
                        </li>
                        <li>
                            <strong>Data Pesanan:</strong> produk yang Anda pesan, alamat pengiriman, dan catatan tambahan.
                        </li>
                        <li>
                            <strong>Bukti Pembayaran:</strong> foto atau file bukti transfer (slip pembayaran) yang Anda unggah sebagai konfirmasi
                            pembayaran.
                        </li>
                        <li>
                            <strong>Data Teknis:</strong> jenis perangkat, sistem operasi, dan waktu akses, yang digunakan untuk meningkatkan kinerja
                            aplikasi.
                        </li>
                    </ul>

                    <h2>2. Penggunaan Informasi</h2>
                    <p>Informasi yang dikumpulkan akan digunakan untuk:</p>
                    <ul>
                        <li>Memproses pesanan dan mengirimkan produk Anda.</li>
                        <li>Memverifikasi pembayaran manual (melalui slip transfer).</li>
                        <li>Memberikan informasi tentang status pesanan Anda.</li>
                        <li>Memberikan dukungan pelanggan dan meningkatkan pengalaman pengguna.</li>
                    </ul>
                    <p>
                        Kami <strong>tidak akan membagikan atau menjual</strong> data pribadi Anda kepada pihak ketiga tanpa izin, kecuali jika
                        diwajibkan oleh hukum yang berlaku.
                    </p>

                    <h2>3. Keamanan Data</h2>
                    <p>
                        Kami berusaha menjaga keamanan data pribadi Anda dengan langkah-langkah teknis dan administratif yang wajar. Namun, perlu
                        diketahui bahwa tidak ada sistem transmisi data melalui internet yang sepenuhnya aman, dan kami tidak dapat menjamin keamanan
                        absolut.
                    </p>

                    <h2>4. Hak Pengguna</h2>
                    <p>Anda memiliki hak untuk:</p>
                    <ul>
                        <li>Meminta salinan data pribadi Anda.</li>
                        <li>Memperbarui atau menghapus akun Anda.</li>
                        <li>Menarik persetujuan penggunaan data kapan pun.</li>
                    </ul>
                    <p>
                        Untuk mengajukan permintaan tersebut, silakan hubungi kami melalui email di
                        <a className="ml-1 text-indigo-600 hover:underline" href="mailto:yusrandhyr@gmail.com">
                            yusrandhyr@gmail.com
                        </a>
                        .
                    </p>

                    <h2>5. Perubahan Kebijakan</h2>
                    <p>
                        Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu. Setiap perubahan akan diumumkan melalui pembaruan di
                        aplikasi atau halaman ini, dengan mencantumkan tanggal berlaku yang baru.
                    </p>

                    <h2>6. Kontak Kami</h2>
                    <p>Jika Anda memiliki pertanyaan, saran, atau keluhan mengenai Kebijakan Privasi ini, silakan hubungi kami di:</p>
                    <div className="rounded-md border bg-gray-50 p-4">
                        <p className="m-0">
                            <strong>Nama Perusahaan:</strong> eSagooCraft
                        </p>
                        <p className="m-0">
                            <strong>Email:</strong>{' '}
                            <a className="text-indigo-600 hover:underline" href="mailto:yusrandhyr@gmail.com">
                                yusrandhyr@gmail.com
                            </a>
                        </p>
                        <p className="m-0">
                            <strong>Alamat:</strong> Makassar, Sulawesi Selatan, Indonesia
                        </p>
                    </div>

                    <h2>Terima kasih</h2>
                    <p>Terima kasih telah menggunakan eSagooCraft.</p>
                </section>

                <footer className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <small className="text-sm text-gray-500">© {new Date().getFullYear()} eSagooCraft. Semua hak dilindungi.</small>
                    <div className="flex gap-2">
                        <a
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                navigator.clipboard?.writeText(window.location.href).catch(() => {});
                                alert('URL saat ini telah disalin ke clipboard (jika didukung oleh browser).');
                            }}
                            className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
                        >
                            Salin URL
                        </a>
                        <a
                            href="mailto:yusrandhyr@gmail.com?subject=Permintaan%20Data%20Pribadi"
                            className="inline-flex items-center rounded-md border border-indigo-600 px-4 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-50"
                        >
                            Hubungi Kami
                        </a>
                    </div>
                </footer>
            </div>
        </main>
    );
}
