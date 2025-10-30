export interface ShopReviewsType {
    id: number;
    name: string;
    shop_name: string;
    avg_rating: string;
    total_reviews: number;
    reviews: ReviewType[];
}
export interface ReviewType {
    id: number;
    reviewer: string;
    rating: number;
    comment: string;
    created_at: string;
}
