import { createConnection } from '@/app/lib/db';
import { RowDataPacket } from 'mysql2/promise';

interface Product extends RowDataPacket {
    listing_id : number;
    seller_id : number;
    category : string;
    item_name : string; 
    item_condition : string;
    item_price : number;
    item_description: string;
    item_location : string;
    is_avail: boolean;
    full_name : string
}

export async function getProducts(): Promise<Product[]> {
    const db = await createConnection();
    const [products] =
        await db.query<Product[]>(`SELECT products.*, CONCAT(users.first_name, " ", users.last_name) AS full_name 
                                      FROM products 
                                      JOIN users 
                                      ON products.seller_id = users.user_id;`);
    return products;
}
