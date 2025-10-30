import { ShopReviewsType } from '@/types/shop-reviews-type';
import { Star, Store } from 'lucide-react';
import { columns } from './columns';
import { DataTable } from './data-table';

export default function InitDataShopReviewsPage({ shopReviews }: { shopReviews: ShopReviewsType[] }) {
    return (
        <div className="flex flex-1 flex-col gap-4">
            {shopReviews.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
                    <div className="relative mb-2">
                        <Store className="h-12 w-12 text-gray-400" />
                        <Star className="absolute -top-1 -right-1 h-6 w-6 text-yellow-400" />
                    </div>
                    <h3 className="text-lg font-semibold">Belum ada Review</h3>
                    <p className="text-sm">Belum ada customer yang memberikan review untuk toko ini.</p>
                </div>
            ) : (
                <DataTable columns={columns} data={shopReviews} />
            )}
        </div>
    );
}
