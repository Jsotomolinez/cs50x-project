export interface ProductInfo {
    id: number;
    name: string;
    description: string;
    image: string;
    cost: number;
    price: number;
    department: string;
    brand: string;
    line: string;
}

export interface ProductDb {
    id: number;
    name: string;
    description: string;
    image: string;
    cost: number;
    price: number;
    department_id: number;
    brand_id: number;
    line_id: number;
    provider_id: number;
}

export interface Brand {
    id: number;
    name: string;
}

export interface Department {
    id: number;
    name: string;
}

export interface ProviderInfo {
    name: string;
    phone_number: string | null;
    email: string | null;
}

export interface Line {
    id: number;
    name: string;
}

export interface LineCreate {
    name: string;
    department: string;
}

export interface CartItem {
    id: number;
    quantity: number;
}

export interface CartProductInfo {
    id: number;
    name: string;
    price: number;
    line: string;
    quantity: number;
}

export interface Transaction_info{
    product_id: number;
    quantity: number;
    price: number;
}

export interface Transaction_create{
    role: 'buy' | 'wishlist';
    info: Transaction_info[];
}