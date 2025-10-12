import { Category } from './category';

// src/types/category.ts
export interface ProductType {
    id: number;
    name: string;
    description: string;
    status_verifikasi: string;
    price: number;
    stock: number;
    image: ProductImage;
    category: Category;
    category_id: number;
    user: string;
    images: ProductImage[];
    created_at: string;
    updated_at: string;
}

export interface ProductImage {
    id: number;
    image_url: string;
    is_primary: boolean;
    product_id: number;
}
