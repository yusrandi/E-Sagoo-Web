import { dashboard, login, register } from '@/routes';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="relative flex min-h-screen flex-col items-center justify-center bg-[#FDFDFC] bg-[url('/bg.jpg')] bg-cover bg-center p-6 text-[#1b1b18] lg:justify-center lg:p-8">
                {/* overlay untuk blur + darken background */}
                <div className="absolute inset-0 bg-zinc-900/70"></div>

                {/* content */}
                <div className="relative z-10 w-full">
                    <header className="mb-6 w-full max-w-[335px] text-sm not-has-[nav]:hidden lg:max-w-4xl"></header>

                    <div className="flex w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">
                        <main className="flex w-full max-w-[335px] flex-col-reverse lg:max-w-4xl lg:flex-row">
                            <div className="flex-1 rounded-lg bg-white p-6 pb-12 text-[13px] leading-[20px] shadow-[inset_0px_0px_0px_1px_rgba(26,26,0,0.16)] lg:rounded-lg lg:p-20 dark:bg-[#161615] dark:text-[#EDEDEC] dark:shadow-[inset_0px_0px_0px_1px_#fffaed2d]">
                                <h1 className="mb-2 font-medium">Esagoo Craft</h1>
                                <p className="mb-5 text-[#706f6c] dark:text-[#A1A09A]">
                                    Esagoo Craft adalah aplikasi digital yang dirancang untuk mendukung para pengrajin lokal dalam memasarkan,
                                    mengelola, dan mengembangkan produk kerajinan tangan mereka.
                                    <br />
                                    Melalui platform ini, penjual dapat menampilkan karya mereka secara profesional, sementara pembeli dapat dengan
                                    mudah menemukan dan membeli produk unik yang dibuat dengan keterampilan tinggi.
                                </p>

                                <ul className="flex gap-3 text-sm leading-normal">
                                    {auth.user ? (
                                        <li>
                                            <Link
                                                href={dashboard()}
                                                target="_blank"
                                                className="inline-block rounded-sm border border-black bg-[#1b1b18] px-5 py-1.5 text-sm leading-normal text-white hover:border-black hover:bg-black dark:border-[#eeeeec] dark:bg-[#eeeeec] dark:text-[#1C1C1A] dark:hover:border-white dark:hover:bg-white"
                                            >
                                                Dashboard
                                            </Link>
                                        </li>
                                    ) : (
                                        <>
                                            <li>
                                                <Link
                                                    href={login()}
                                                    target="_blank"
                                                    className="inline-block rounded-sm border border-black bg-[#1b1b18] px-5 py-1.5 text-sm leading-normal text-white hover:border-black hover:bg-black dark:border-[#eeeeec] dark:bg-[#eeeeec] dark:text-[#1C1C1A] dark:hover:border-white dark:hover:bg-white"
                                                >
                                                    Login now
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    href={register()}
                                                    className="inline-block rounded-sm border border-black px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:bg-black hover:text-white dark:border-[#eeeeec] dark:text-[#EDEDEC] dark:hover:bg-[#eeeeec] dark:hover:text-[#1C1C1A]"
                                                >
                                                    Register
                                                </Link>
                                            </li>
                                        </>
                                    )}
                                </ul>
                            </div>
                        </main>
                    </div>
                    <div className="hidden h-14.5 lg:block"></div>
                </div>
            </div>
        </>
    );
}
