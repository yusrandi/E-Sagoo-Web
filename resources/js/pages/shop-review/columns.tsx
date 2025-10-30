import { ShopReviewsType } from '@/types/shop-reviews-type';
import { ColumnDef } from '@tanstack/react-table';
import { MessageSquare, Star, Store } from 'lucide-react';

export const columns: ColumnDef<ShopReviewsType>[] = [
    {
        accessorKey: 'shop_name',
        header: 'Nama Toko',
        cell: ({ row }) => {
            return (
                <div className="flex items-center">
                    <Store className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{row.getValue('shop_name')}</span>
                </div>
            );
        },
    },
    {
        accessorKey: 'avg_rating',
        header: 'Rating Rata-rata',
        cell: ({ row }) => {
            const rating = parseFloat(row.getValue('avg_rating'));
            return (
                <div className="flex items-center">
                    <Star className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{rating.toFixed(1)}</span>
                    <span className="ml-1 text-muted-foreground">({row.original.total_reviews} reviews)</span>
                </div>
            );
        },
    },
    {
        accessorKey: 'total_reviews',
        header: 'Total Reviews',
        cell: ({ row }) => {
            return (
                <div className="flex items-center">
                    <MessageSquare className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{row.getValue('total_reviews')} reviews</span>
                </div>
            );
        },
    },

    // {
    //     accessorKey: 'created_at',
    //     header: 'Review Terakhir',
    //     cell: ({ row }) => {
    //         const reviews = row.original.reviews;
    //         const latestReview = reviews.length > 0 ? reviews[0] : null;

    //         if (!latestReview) {
    //             return <span className="text-muted-foreground">-</span>;
    //         }

    //         return (
    //             <div className="flex items-center">
    //                 <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
    //                 <span>{latestReview.created_at}</span>
    //             </div>
    //         );
    //     },
    // },
];
