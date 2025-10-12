import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';
import { useTransactions } from './context';

const statuses = [
    { value: 'pending', label: 'Pending' },
    { value: 'waiting_payment', label: 'Waiting Payment' },
    { value: 'paid', label: 'Paid' },
    { value: 'verified', label: 'Verified' },
    { value: 'shipped', label: 'Shipped' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' },
];

export function ComboboxStatus({ value, onChange, transactionId }: { value: string; transactionId: number; onChange: (v: string) => void }) {
    const { reload } = useTransactions();
    const [open, setOpen] = React.useState(false);
    const selected = statuses.find((s) => s.value === value);

    function handleChange(val: string) {
        const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';
        fetch(`/transaction/${transactionId}/status`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': token,
            },
            body: JSON.stringify({
                status: val,
            }),
        }).then(() => {
            // Optionally, you can add some state management to reflect the change immediately
            // For now, we will just reload the page
            // window.location.reload();
            toast.success('Status updated successfully');
            reload();
        });
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline" role="combobox" aria-expanded={open} className="w-[160px] justify-between capitalize">
                    {selected ? selected.label : 'Select status'}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[160px] p-0">
                <Command>
                    <CommandInput placeholder="Cari status..." />
                    <CommandList>
                        <CommandEmpty>No status found.</CommandEmpty>
                        <CommandGroup>
                            {statuses.map((s) => (
                                <CommandItem
                                    key={s.value}
                                    value={s.value}
                                    onSelect={(val) => {
                                        handleChange(val);
                                        setOpen(false);
                                    }}
                                >
                                    <Check className={cn('mr-2 h-4 w-4', s.value === value ? 'opacity-100' : 'opacity-0')} />
                                    {s.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
