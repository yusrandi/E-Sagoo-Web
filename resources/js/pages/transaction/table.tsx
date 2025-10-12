import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { TransactionType } from '@/types/transaction-type';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

export function TransactionTable({ data }: { data: TransactionType[] }) {
    const [expanded, setExpanded] = useState<number | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [openRow, setOpenRow] = useState<number | null>(null);

    const toggleExpand = (id: number) => {
        setExpanded(expanded === id ? null : id);
    };

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead></TableHead>
                    <TableHead>Invoice</TableHead>
                    <TableHead>Pembeli</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {data.map((trx) => (
                    <>
                        <TableRow key={trx.id} className="cursor-pointer hover:bg-muted/30" onClick={() => toggleExpand(trx.id)}>
                            <TableCell>{expanded === trx.id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}</TableCell>
                            <TableCell>TRX-{trx.id}</TableCell>
                            <TableCell>{trx.user}</TableCell>
                            <TableCell>Rp {trx.total_amount.toLocaleString()}</TableCell>
                            <TableCell>{trx.status}</TableCell>
                        </TableRow>

                        {expanded === trx.id && (
                            <TableRow className="bg-muted/10">
                                <TableCell colSpan={5}>
                                    <div className="space-y-1 p-3">
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Produk</TableHead>
                                                    <TableHead>Jumlah</TableHead>
                                                    <TableHead>Harga</TableHead>
                                                    <TableHead>Subtotal</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {trx.items.map((item) => (
                                                    <TableRow key={item.id}>
                                                        <TableCell>{item.product_name}</TableCell>
                                                        <TableCell>{item.quantity}</TableCell>
                                                        <TableCell>Rp {item.price.toLocaleString()}</TableCell>
                                                        <TableCell>Rp {item.subtotal.toLocaleString()}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )}
                    </>
                ))}
            </TableBody>
        </Table>
    );
}
