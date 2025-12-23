import { pool } from '@/app/lib/db';
import { Row } from '@/app/data/types';

export type Transaction = {
    transac_id: number;
    listing_id: number;
    buyer_id: number;
    transac_done: boolean;
    created_at: string;
    item_name: string;
    item_price: number;
    item_condition: string;
    image_url?: string;
    seller_name: string;
    seller_username: string;
    buyer_name: string;
    buyer_username: string;
    review_rating?: number;
    review_text?: string;
    review_id?: number;
};

export type OfferWithDetails = {
    offer_id: number;
    listing_id: number;
    buyer_id: number;
    seller_id: number;
    offer_price: number;
    offer_status: 'Pending' | 'Accepted' | 'Rejected';
    created_at: string;
    item_name: string;
    item_price: number;
    image_url?: string;
    seller_name: string;
    seller_username: string;
    buyer_name: string;
    buyer_username: string;
    item_condition: string;
};

interface TransactionsResponse {
    success: boolean;
    message: string;
    data: {
        asBuyer: Transaction[];
        asSeller: Transaction[];
        receivedOffers: OfferWithDetails[];
        sentOffers: OfferWithDetails[];
    } | null;
}

export async function getUserTransactions(userId: number): Promise<TransactionsResponse> {
    try {
        // Get transactions where user is buyer
        const [asBuyer] = await pool.query<Row<Transaction>[]>(
            `SELECT 
                t.transac_id,
                t.listing_id,
                t.buyer_id,
                t.transac_done,
                t.created_at,
                p.item_name,
                p.item_price,
                p.item_condition,
                pi.image_url,
                CONCAT(u.first_name, ' ', u.last_name) AS seller_name,
                u.username AS seller_username,
                CONCAT(buyer.first_name, ' ', buyer.last_name) AS buyer_name,
                buyer.username AS buyer_username,
                r.review_rating,
                r.review_text,
                r.review_id
            FROM transactions t
            JOIN products p ON t.listing_id = p.listing_id
            JOIN users u ON p.seller_id = u.user_id
            JOIN users buyer ON t.buyer_id = buyer.user_id
            LEFT JOIN product_images pi ON p.listing_id = pi.listing_id AND pi.is_cover = 1
            LEFT JOIN reviews r ON t.transac_id = r.transac_id
            WHERE t.buyer_id = ?
            ORDER BY t.created_at DESC`,
            [userId]
        );

        // Get transactions where user is seller
        const [asSeller] = await pool.query<Row<Transaction>[]>(
            `SELECT 
                t.transac_id,
                t.listing_id,
                t.buyer_id,
                t.transac_done,
                t.created_at,
                p.item_name,
                p.item_price,
                p.item_condition,
                pi.image_url,
                CONCAT(u.first_name, ' ', u.last_name) AS seller_name,
                u.username AS seller_username,
                CONCAT(buyer.first_name, ' ', buyer.last_name) AS buyer_name,
                buyer.username AS buyer_username,
                r.review_rating,
                r.review_text,
                r.review_id
            FROM transactions t
            JOIN products p ON t.listing_id = p.listing_id
            JOIN users u ON p.seller_id = u.user_id
            JOIN users buyer ON t.buyer_id = buyer.user_id
            LEFT JOIN product_images pi ON p.listing_id = pi.listing_id AND pi.is_cover = 1
            LEFT JOIN reviews r ON t.transac_id = r.transac_id
            WHERE p.seller_id = ?
            ORDER BY t.created_at DESC`,
            [userId]
        );

        // Get offers received (user is seller)
        const [receivedOffers] = await pool.query<Row<OfferWithDetails>[]>(
            `SELECT 
                o.offer_id,
                o.listing_id,
                o.buyer_id,
                p.seller_id,
                o.offer_price,
                o.offer_status,
                o.created_at,
                p.item_name,
                p.item_price,
                p.item_condition,
                pi.image_url,
                CONCAT(seller.first_name, ' ', seller.last_name) AS seller_name,
                seller.username AS seller_username,
                CONCAT(buyer.first_name, ' ', buyer.last_name) AS buyer_name,
                buyer.username AS buyer_username
            FROM offers o
            JOIN products p ON o.listing_id = p.listing_id
            JOIN users seller ON p.seller_id = seller.user_id
            JOIN users buyer ON o.buyer_id = buyer.user_id
            LEFT JOIN product_images pi ON p.listing_id = pi.listing_id AND pi.is_cover = 1
            WHERE p.seller_id = ?
            ORDER BY o.created_at DESC`,
            [userId]
        );

        // Get offers sent (user is buyer)
        const [sentOffers] = await pool.query<Row<OfferWithDetails>[]>(
            `SELECT 
                o.offer_id,
                o.listing_id,
                o.buyer_id,
                p.seller_id,
                o.offer_price,
                o.offer_status,
                o.created_at,
                p.item_name,
                p.item_price,
                p.item_condition,
                pi.image_url,
                CONCAT(seller.first_name, ' ', seller.last_name) AS seller_name,
                seller.username AS seller_username,
                CONCAT(buyer.first_name, ' ', buyer.last_name) AS buyer_name,
                buyer.username AS buyer_username
            FROM offers o
            JOIN products p ON o.listing_id = p.listing_id
            JOIN users seller ON p.seller_id = seller.user_id
            JOIN users buyer ON o.buyer_id = buyer.user_id
            LEFT JOIN product_images pi ON p.listing_id = pi.listing_id AND pi.is_cover = 1
            WHERE o.buyer_id = ?
            ORDER BY o.created_at DESC`,
            [userId]
        );

        return {
            success: true,
            message: 'Transactions fetched successfully',
            data: {
                asBuyer,
                asSeller,
                receivedOffers,
                sentOffers,
            },
        };
    } catch (error) {
        console.error('getUserTransactions error:', error);
        return {
            success: false,
            message: 'Failed to fetch transactions',
            data: null,
        };
    }
}
