import { verifySession } from '@/app/lib/session';
import { pool } from '@/app/lib/db';
import { OfferWithDetails, Row } from '@/app/data/types';
import { NextResponse } from 'next/server';

export async function GET(): Promise<NextResponse> {
    try {
        const session = await verifySession();

        if (!session) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        const userId = parseInt(session.userId);

        const [offers] = await pool.query<Row<OfferWithDetails>[]>(
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

        return NextResponse.json({ success: true, data: offers });
    } catch (error) {
        console.error('Sent Offers API error:', error);
        return NextResponse.json(
            { success: false, message: 'Internal server error' },
            { status: 500 }
        );
    }
}
