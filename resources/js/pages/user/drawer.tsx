import { Button } from '@/components/ui/button';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { User } from '@/types/user';

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    currentRow?: User;
    reload: () => void;
}

const nationalities = ['Indonesia', 'Belanda', 'Korea', 'Inggris', 'Italia', 'Jepang', 'Jerman', 'Prancis', 'Amerika Serikat', 'Brazil'];

export function UserDrawer({ open, onOpenChange, currentRow, reload }: Props) {
    const isUpdate = !!currentRow;

    const nationalityOptions = nationalities.map((nation) => ({
        label: nation,
        value: nation.replace(/\s+/g, '_'),
    }));

    const onSubmit = async () => {};

    return (
        <Sheet
            open={open}
            onOpenChange={(v) => {
                onOpenChange(v);
            }}
        >
            <SheetContent className="flex flex-col">
                <SheetHeader className="text-left">
                    <SheetTitle>{isUpdate ? 'Update' : 'Create'} Coach</SheetTitle>
                    <SheetDescription>
                        Please scroll down to complete the form.
                        <br /> Don&apos;t forget to Click save when you&apos;re done.
                    </SheetDescription>
                </SheetHeader>

                <SheetContent>
                    <h1>This is content</h1>
                </SheetContent>

                <SheetFooter className="gap-2">
                    <SheetClose asChild>
                        <Button variant="outline">Close</Button>
                    </SheetClose>
                    <Button form="tasks-form" type="submit">
                        Save changes
                    </Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
