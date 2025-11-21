import { createConnection } from '@/app/lib/db';
import { RowDataPacket } from 'mysql2';

interface User extends RowDataPacket {
    user_id: number;
    username: string;
}

interface Product extends RowDataPacket {
    listing_id: number;
    seller_id: number;
}

interface Review extends RowDataPacket {
    review_rating: number;
    transac_id: number;
}

interface AvgRating extends RowDataPacket {
    avg_rating: number;
}

type FullUser = User & {
  listings: Product[];
  reviews: Review[];
  avg_rating: AvgRating[];
}

export async function getUser(username: string): Promise<FullUser> {
    const db = await createConnection();

    const [users] = await db.query<User[]>('SELECT * FROM users WHERE username = ?', [username]);
    const user = users[0];

    const { user_id } = users[0];

    const [listings] = await db.query<Product[]>('SELECT * FROM products WHERE seller_id = ?', [user_id]);

    const [reviews] = await db.query<Review[]>(
        `SELECT * 
        FROM reviews r
        JOIN transactions t
        ON r.transac_id = t.transac_id
        JOIN products p
        ON t.listing_id = p.listing_id
        WHERE p.seller_id = ? AND is_avail = 0;`,
        [user_id]
    );

    const [avg_rating] = await db.query<AvgRating[]>(
        `SELECT AVG(review_rating) AS avg_rating 
        FROM reviews r
        JOIN transactions t
        ON r.transac_id = t.transac_id
        JOIN products p
        ON t.listing_id = p.listing_id
        WHERE p.seller_id = ? AND is_avail = 0;`,
        [user_id]
    );

    return {
      ...user, 
      listings, 
      reviews,
      avg_rating,
    };
}
