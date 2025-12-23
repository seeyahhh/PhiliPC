import { verifySession } from '@/app/lib/session';
import { pool } from '@/app/lib/db';
import { Row, Transaction } from '@/app/data/types';
import { NextResponse } from 'next/server';

export async function GET(): Promise<NextResponse> {
    try {
        const session = await verifySession();

        if (!session) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        const userId = parseInt(session.userId);

        const [transactions] = await pool.query<Row<Transaction>[]>(
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

        return NextResponse.json({ success: true, data: transactions });
    } catch (error) {
        console.error('Purchases API error:', error);
        return NextResponse.json(
            { success: false, message: 'Internal server error' },
            { status: 500 }
        );
    }
}
