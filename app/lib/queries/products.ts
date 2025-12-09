import { CreateProductInput, Product, Row } from '@/app/data/types';
import { pool } from '@/app/lib/db';
import { QueryResult } from 'mysql2';

interface GetProductResponse {
    success: boolean;
    message: string;
    data: {
        products: Product[];
    } | null;
}

interface PostProductResponse {
    success: boolean;
    message: string;
    data: {
        products: QueryResult;
    } | null;
}

export async function getProducts(): Promise<GetProductResponse> {
    const [products] = await pool.query<
        Row<Product>[]
    >(`SELECT products.*, CONCAT(users.first_name, " ", users.last_name) AS full_name 
                                      FROM products 
                                      JOIN users 
                                      ON products.seller_id = users.user_id;`);
    if (products.length === 0) {
        return {
            success: false,
            message: 'Products does not exist',
            data: null,
        };
    }

    return {
        success: true,
        message: 'Products Fetched Successfully',
        data: {
            products: products,
        },
    };
}

export async function postProduct(data: CreateProductInput): Promise<PostProductResponse> {
    try {
        const query = `INSERT INTO products (seller_id, category, item_name, item_condition, item_description, item_location) 
                                    VALUES (?, 'GPU', ?, ?, ?, ?)`;

        const values = [
            data.seller_id,
            data.name,
            data.price,
            data.conditioning,
            data.description,
            data.location,
        ];

        const [result] = await pool.execute(query, values);

        return {
            success: true,
            message: 'Product Posted Successfully',
            data: {
                products: result,
            },
        };
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: 'Failed to Create Product',
            data: null,
        };
    }
}
