import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ShopReviewsType } from '@/types/shop-reviews-type';
import { MessageSquare, Star, Store, Users } from 'lucide-react';

const ShopCard = ({ myShop }: { myShop: ShopReviewsType }) => {
    if (!myShop) return null;

    // Generate avatar fallback dari inisial
    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map((word) => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    const renderStars = (rating: number) => {
        return (
            <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => {
                    const isFull = star <= Math.floor(rating);
                    const isHalf = star === Math.ceil(rating) && rating % 1 !== 0;

                    return (
                        <div key={star} className="relative">
                            <Star className="h-3 w-3 fill-gray-300 text-gray-300" />
                            {(isFull || isHalf) && (
                                <div className={`absolute top-0 left-0 overflow-hidden ${isFull ? 'w-full' : 'w-1/2'}`}>
                                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <Card className="mx-auto w-full max-w-2xl transition-all duration-300 hover:shadow-xl">
            <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Avatar className="h-16 w-16 border-2 border-blue-100">
                            {/* <AvatarImage src={`/storage/${myShop.}`} /> */}
                            <AvatarFallback className="bg-blue-100 text-lg font-semibold text-blue-600">
                                {getInitials(myShop.shop_name || myShop.name)}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <CardTitle className="flex items-center gap-2 text-2xl">
                                <Store className="h-6 w-6 text-blue-600" />
                                {myShop.shop_name || 'Toko Saya'}
                            </CardTitle>
                            <CardDescription className="mt-1 text-base">Pemilik: {myShop.name}</CardDescription>
                        </div>
                    </div>
                    <Badge variant="secondary" className="px-3 py-1 text-sm">
                        {myShop.total_reviews || 0} Reviews
                    </Badge>
                </div>
            </CardHeader>

            <CardContent className="space-y-6">
                {/* Rating Section */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center justify-center rounded-lg border bg-gradient-to-r from-blue-50 to-indigo-50 p-4">
                        <div className="text-center">
                            <div className="mb-2 flex items-center justify-center gap-2">
                                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                                <span className="text-2xl font-bold text-gray-900">{myShop.avg_rating}</span>
                            </div>
                            <p className="text-sm text-gray-600">Rating Rata-rata</p>
                        </div>
                    </div>

                    <div className="flex items-center justify-center rounded-lg border bg-gradient-to-r from-green-50 to-emerald-50 p-4">
                        <div className="text-center">
                            <div className="mb-2 flex items-center justify-center gap-2">
                                <Users className="h-5 w-5 text-green-600" />
                                <span className="text-2xl font-bold text-gray-900">{myShop.total_reviews || 0}</span>
                            </div>
                            <p className="text-sm text-gray-600">Total Review</p>
                        </div>
                    </div>
                </div>

                {/* Recent Reviews Section */}
                <div>
                    <div className="mb-4 flex items-center gap-2">
                        <MessageSquare className="h-5 w-5 text-gray-600" />
                        <h3 className="text-lg font-semibold">Review Terbaru</h3>
                    </div>

                    {myShop.reviews && myShop.reviews.length > 0 ? (
                        <div className="max-h-60 space-y-3 overflow-y-auto">
                            {myShop.reviews.map((review) => (
                                <div key={review.id} className="rounded-lg border border-gray-200 bg-gray-50 p-3 transition-colors hover:bg-white">
                                    <div className="mb-2 flex items-start justify-between">
                                        <div className="flex items-center gap-2">
                                            <Avatar className="h-6 w-6">
                                                <AvatarFallback className="bg-gray-200 text-xs">
                                                    {getInitials(review.reviewer || 'User')}
                                                </AvatarFallback>
                                            </Avatar>
                                            <span className="text-sm font-medium">{review.reviewer || 'Anonymous'}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            {renderStars(review.rating)}
                                            <span className="ml-1 text-sm font-medium">{review.rating}</span>
                                        </div>
                                    </div>
                                    <p className="mb-1 line-clamp-2 text-sm text-gray-700">{review.comment || 'Tidak ada komentar'}</p>
                                    <p className="text-right text-xs text-gray-500">{review.created_at}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="rounded-lg border border-dashed bg-gray-50 py-8 text-center">
                            <MessageSquare className="mx-auto mb-3 h-12 w-12 text-gray-300" />
                            <p className="text-gray-500">Belum ada review</p>
                            <p className="mt-1 text-sm text-gray-400">Review dari pelanggan akan muncul di sini</p>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default ShopCard;
