import { Button } from '@/components/ui/button';
import { Navigation } from 'lucide-react';
import { useLokasiKebuns } from './context';

export default function ButtonAdd() {
    const { setOpen } = useLokasiKebuns();
    return (
        <div className="flex gap-2">
            <Button className="space-x-1" onClick={() => setOpen('add')}>
                <span>Tambah Lokasi</span> <Navigation size={18} />
            </Button>
        </div>
    );
}
