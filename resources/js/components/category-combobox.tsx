import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Category } from '@/types/category';
import { Check, ChevronsUpDown } from 'lucide-react';

interface CategoryComboboxProps {
    categories: Category[];
    category: Category | null;
    setCategory: (category: Category | null) => void;
}

export function CategoryCombobox({ categories, category, setCategory }: CategoryComboboxProps) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" role="combobox" className={cn('w-full justify-between', !category && 'text-muted-foreground')}>
                    {category ? category.name : 'Select category'}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[var(--radix-popover-trigger-width)] max-w-full p-0">
                <Command>
                    <CommandInput placeholder="Search category..." />
                    <CommandEmpty>No category found.</CommandEmpty>
                    <CommandGroup>
                        <CommandList>
                            {categories.map((c) => (
                                <CommandItem key={c.id} value={c.name} onSelect={() => setCategory(c)}>
                                    <Check className={cn('mr-2 h-4 w-4', c.id === category?.id ? 'opacity-100' : 'opacity-0')} />
                                    {c.name}
                                </CommandItem>
                            ))}
                        </CommandList>
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
