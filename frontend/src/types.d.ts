export interface User {
    _id: string;
    username: string;
    displayName?: string;
    token: string;
    role: string;
}

export interface ValidationError {
    errors: {
        [key: string]: {
            name: string;
            message: string;
        }
    },
    message: string;
    name: string;
    _message: string;
}

export interface GlobalError {
    error: string;
}

export interface RegisterMutation {
    username: string;
    password: string;
    confirmPassword: string;
}

export interface LoginMutation {
    username: string;
    password: string;
}

export interface Product {
    _id: string;
    category: Category;
    title: string;
    description: string;
    price: number;
    images: string[];
}

export interface ProductMutation  {
    category: string;
    title: string;
    description: string;
    price: string;
    images: FileList | null;
}

export interface Category {
    _id: number;
    title: string;
    description: string;
}