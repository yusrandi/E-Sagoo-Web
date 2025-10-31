export default function DeleteAccountPage() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
            <div className="w-full max-w-3xl rounded-2xl bg-white p-8 shadow-lg lg:p-12">
                <header className="mb-6">
                    <h1 className="text-2xl font-semibold text-gray-900 lg:text-3xl">Hapus Akun — eSagooCraft</h1>
                    <p className="mt-2 text-sm text-gray-600">
                        Panduan langkah demi langkah untuk menghapus akun dan semua data terkait di aplikasi mobile eSagooCraft.
                    </p>
                </header>

                <section className="space-y-6">
                    <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
                        <h2 className="text-lg font-medium text-gray-800">Ringkasan</h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Anda dapat menghapus akun langsung dari dalam aplikasi. Setelah penghapusan dikonfirmasi, akun dan data yang terkait akan
                            dihapus secara permanen dari sistem kami.
                        </p>
                    </div>

                    <div className="rounded-lg border border-gray-100 p-4">
                        <h3 className="text-md font-medium text-gray-800">Langkah-langkah Menghapus Akun (di aplikasi)</h3>
                        <ol className="mt-3 list-inside list-decimal space-y-3 text-sm text-gray-700">
                            <li>
                                Buka aplikasi <strong>eSagooCraft</strong> pada perangkat seluler Anda.
                            </li>
                            <li>Masuk ke akun Anda (jika belum login).</li>
                            <li>
                                Ketuk ikon <strong>foto/avatar</strong> di pojok kanan atas <strong>AppBar</strong> untuk membuka menu{' '}
                                <strong>Profile</strong>.
                            </li>
                            <li>
                                Pilih opsi <strong>Delete Account</strong> atau <strong>Hapus Akun</strong>.
                            </li>
                            <li>Baca peringatan dan konfirmasi bahwa Anda ingin menghapus akun beserta semua data terkait.</li>
                            <li>
                                Tekan <em>Confirm / Hapus</em>.
                            </li>
                        </ol>
                        <p className="mt-3 text-sm text-gray-600">
                            Setelah dikonfirmasi, proses penghapusan akan segera dijalankan. Proses ini tidak dapat dibatalkan.
                        </p>
                    </div>

                    <div className="rounded-lg border border-gray-100 bg-white p-4">
                        <h3 className="text-md font-medium text-gray-800">Jika Anda Mengalami Masalah</h3>
                        <p className="mt-2 text-sm text-gray-600">
                            Jika tombol <em>Delete Account</em> tidak tampil atau Anda mengalami kesulitan, silakan hubungi tim dukungan kami:
                        </p>
                        <ul className="mt-3 space-y-2 text-sm">
                            <li>
                                Email:{' '}
                                <a className="text-indigo-600 hover:underline" href="mailto:yusrandhyr@gmail.com">
                                    yusrandhyr@gmail.com
                                </a>
                            </li>
                            <li>
                                Subject yang disarankan: <strong>Request Account Deletion — [your email]</strong>
                            </li>
                            <li>Isi pesan: jelaskan email akun, username (jika ada) dan masalah yang Anda alami.</li>
                        </ul>
                    </div>

                    <footer className="border-t border-gray-100 pt-4">
                        <p className="text-xs text-gray-500">
                            eSagooCraft • Jika Anda butuh bantuan lebih lanjut, kirim email ke{' '}
                            <a className="text-indigo-600 hover:underline" href="mailto:yusrandhyr@gmail.com">
                                yusrandhyr@gmail.com
                            </a>
                            .
                        </p>
                    </footer>
                </section>
            </div>
        </main>
    );
}
