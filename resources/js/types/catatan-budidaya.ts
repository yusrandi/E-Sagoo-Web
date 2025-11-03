import { AktivitasBudidayaType } from './aktivitas-budidaya';
import { LokasiKebunType } from './lokasi-kebun';
import { User } from './user';

export interface CatatanBudidayaType {
    id: number;
    lokasi_id: number;
    aktivitas_id: number;
    user_id: number;
    tanggal_kegiatan: string | null;
    bahan_penggunaan: string | null;
    alat_digunakan: string | null;
    jumlah_petugas: number | null;
    kendala_catatan: string | null;
    biaya: number | null;
    deskripsi_kegiatan: string | null;
    lokasi: LokasiKebunType;
    aktivitas: AktivitasBudidayaType;
    user: User;
}
