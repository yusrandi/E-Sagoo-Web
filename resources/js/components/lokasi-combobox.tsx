import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { LokasiKebunType } from '@/types/lokasi-kebun';
import { Check, ChevronsUpDown } from 'lucide-react';

interface Props {
    lokasis: LokasiKebunType[];
    lokasi: LokasiKebunType | null;
    setLokasi: (lokasi: LokasiKebunType | null) => void;
}

export function LokasiCombobox({ lokasis, lokasi, setLokasi }: Props) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" role="combobox" className={cn('w-full justify-between', !lokasi && 'text-muted-foreground')}>
                    {lokasi ? lokasi.nama_lokasi : 'Pilih Lokasi Kebun'}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[var(--radix-popover-trigger-width)] max-w-full p-0">
                <Command>
                    <CommandInput placeholder="Search category..." />
                    <CommandEmpty>Tidak ada lokasi ditemukan</CommandEmpty>
                    <CommandGroup>
                        <CommandList>
                            {lokasis.map((c) => (
                                <CommandItem key={c.id} value={c.nama_lokasi} onSelect={() => setLokasi(c)}>
                                    <Check className={cn('mr-2 h-4 w-4', c.id === lokasi?.id ? 'opacity-100' : 'opacity-0')} />
                                    {c.nama_lokasi}
                                </CommandItem>
                            ))}
                        </CommandList>
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
