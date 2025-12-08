import { pool } from '@/app/lib/db';
import { verifySession } from '@/app/lib/session';
import { User } from '@/app/data/types';

interface UserProfile extends User {
    listings?: any[];
    reviews?: any[];
}

export async function getUser(username: string): Promise<UserProfile | null> {
    const [users] = await pool.query<any[]>('SELECT * FROM users WHERE username = ?', [username]);

    if (!Array.isArray(users) || users.length === 0) {
        return null;
    }

    const user = users[0];
    const { user_id } = user;

    const [listings] = await pool.query('SELECT * FROM products WHERE seller_id = ?', [user_id]);

    const [reviews] = await pool.query(
        `SELECT *
            FROM reviews
            WHERE transac_id IN (
                SELECT transac_id 
                FROM transactions t
                JOIN products p ON t.listing_id = p.listing_id
                WHERE t.listing_id IN (
                    SELECT listing_id
                    FROM products 
                    WHERE seller_id = ? AND is_avail = 0
                )
            )`,
        [user_id]
    );

    return {
        ...user,
        listings: Array.isArray(listings) ? listings : [],
        reviews: Array.isArray(reviews) ? reviews : [],
    };
}

export async function getCurrentUser(): Promise<UserProfile | null> {
    const session = await verifySession();

    if (!session) {
        return null;
    }

    const [users] = await pool.query<any[]>('SELECT * FROM users WHERE user_id = ?', [
        session.userId,
    ]);

    if (!Array.isArray(users) || users.length === 0) {
        return null;
    }

    return users[0];
}
