import { Button } from '@/components/ui/button';
import { Utensils } from 'lucide-react';
import { useCategorys } from './context';

export default function ButtonAdd() {
    const { setOpen } = useCategorys();
    return (
        <div className="flex gap-2">
            <Button className="space-x-1" onClick={() => setOpen('add')}>
                <span>Tambah Kategori</span> <Utensils size={18} />
            </Button>
        </div>
    );
}
