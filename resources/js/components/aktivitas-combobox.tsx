import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { AktivitasBudidayaType } from '@/types/aktivitas-budidaya';
import { Check, ChevronsUpDown } from 'lucide-react';

interface Props {
    aktivitases: AktivitasBudidayaType[];
    aktivitas: AktivitasBudidayaType | null;
    setAktivitas: (aktivitas: AktivitasBudidayaType | null) => void;
}

export function AktivitasCombobox({ aktivitases, aktivitas, setAktivitas }: Props) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" role="combobox" className={cn('w-full justify-between', !aktivitas && 'text-muted-foreground')}>
                    {aktivitas ? aktivitas.nama_aktivitas : 'Pilih Aktivitas Kebun'}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[var(--radix-popover-trigger-width)] max-w-full p-0">
                <Command>
                    <CommandInput placeholder="Search category..." />
                    <CommandEmpty>Tidak ada aktivitas ditemukan</CommandEmpty>
                    <CommandGroup>
                        <CommandList>
                            {aktivitases.map((c) => (
                                <CommandItem key={c.id} value={c.nama_aktivitas} onSelect={() => setAktivitas(c)}>
                                    <Check className={cn('mr-2 h-4 w-4', c.id === aktivitas?.id ? 'opacity-100' : 'opacity-0')} />
                                    {c.nama_aktivitas}
                                </CommandItem>
                            ))}
                        </CommandList>
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
