export interface ProductInfo {
    id: number;
    name: string;
    description: string;
    image: string;
    cost: number;
    price: number;
    brand: string;
    line: string;
}

export interface ProductDb {
    id: number;
    name: string;
    description: string;
    image: string;
    price: number;
    brand_id: number;
    line_id: number;
    provider_id: number;
}