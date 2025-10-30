import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { Check, ChevronsUpDown, Lock } from 'lucide-react';
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

    const page = usePage<SharedData>();
    const { auth } = page.props;

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
                            {statuses.map((s) => {
                                const isDisabled =
                                    auth.user?.role !== 'admin' && ['pending', 'waiting_payment', 'paid', 'cancelled'].includes(s.value);

                                const commandItem = (
                                    <CommandItem
                                        key={s.value}
                                        value={s.value}
                                        onSelect={(val) => {
                                            if (!isDisabled) {
                                                handleChange(val);
                                                setOpen(false);
                                            }
                                        }}
                                        className={cn('flex items-center', isDisabled && 'cursor-not-allowed opacity-50')}
                                    >
                                        <Check className={cn('mr-2 h-4 w-4', s.value === value ? 'opacity-100' : 'opacity-0')} />
                                        <span className="flex-1">{s.label}</span>
                                        {isDisabled && <Lock className="ml-2 h-3 w-3 text-muted-foreground" />}
                                    </CommandItem>
                                );

                                return isDisabled ? (
                                    <TooltipProvider key={s.value}>
                                        <Tooltip>
                                            <TooltipTrigger asChild>{commandItem}</TooltipTrigger>
                                            <TooltipContent>
                                                <p>Hanya admin yang dapat memilih status ini</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                ) : (
                                    commandItem
                                );
                            })}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
