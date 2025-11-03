import { Button } from '@/components/ui/button';
import { Shovel } from 'lucide-react';
import { useAktivitasBudidayas } from './context';

export default function ButtonAdd() {
    const { setOpen } = useAktivitasBudidayas();
    return (
        <div className="flex gap-2">
            <Button className="space-x-1" onClick={() => setOpen('add')}>
                <span>Tambah Aktivitas</span> <Shovel size={18} />
            </Button>
        </div>
    );
}
