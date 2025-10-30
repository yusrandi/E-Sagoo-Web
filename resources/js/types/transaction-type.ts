export interface TransactionType {
    id: number;
    user: string;
    shop: string;
    total_amount: number;
    payment_slip: string;
    status: string;
    items: TransactionItem[];
    created_at: string;
    updated_at: string;
}

export interface TransactionItem {
    id: number;
    product_name: string;
    quantity: number;
    price: number;
    subtotal: number;
}

export const TransactionStatus = new Map<string, string>([
    ['pending', 'bg-gray-100/30 text-gray-800 dark:text-gray-300 border border-gray-300'],
    ['waiting_payment', 'bg-yellow-100/30 text-yellow-800 dark:text-yellow-300 border border-yellow-300'],
    ['paid', 'bg-blue-100/30 text-blue-800 dark:text-blue-300 border border-blue-300'],
    ['verified', 'bg-green-100/30 text-green-800 dark:text-green-300 border border-green-300'],
    ['shipped', 'bg-indigo-100/30 text-indigo-800 dark:text-indigo-300 border border-indigo-300'],
    ['completed', 'bg-emerald-100/30 text-emerald-800 dark:text-emerald-300 border border-emerald-300'],
    ['cancelled', 'bg-red-100/30 text-red-800 dark:text-red-300 border border-red-300'],
]);

export const TransactionStatusOptions = [
    { value: 'pending', label: 'Pending' },
    { value: 'waiting_payment', label: 'Waiting Payment' },
    { value: 'paid', label: 'Paid' },
    { value: 'verified', label: 'Verified' },
    { value: 'shipped', label: 'Shipped' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' },
];
