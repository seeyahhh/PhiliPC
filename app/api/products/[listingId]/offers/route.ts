import { verifySession } from '@/app/lib/session';
import { createOffer, getOffersForListing } from '@/app/lib/queries/offers';

export async function GET(
    req: Request,
    { params }: { params: { listingId: string } }
): Promise<Response> {
    const { listingId } = await params;

    const session = await verifySession();
    if (!session?.userId) {
        return new Response(
            JSON.stringify({ success: false, message: 'Unauthorized', data: null }),
            { status: 401 }
        );
    }

    const listingIdNum = Number(listingId);
    if (Number.isNaN(listingIdNum)) {
        return new Response(
            JSON.stringify({ success: false, message: 'Invalid listing id', data: null }),
            { status: 400 }
        );
    }

    const result = await getOffersForListing(listingIdNum, Number(session.userId));
    return Response.json(result);
}

export async function POST(
    req: Request,
    { params }: { params: { listingId: string } }
): Promise<Response> {
    try {
        const { listingId } = await params;

        const session = await verifySession();
        if (!session?.userId) {
            return new Response(JSON.stringify({ success: false, message: 'Unauthorized' }), {
                status: 401,
            });
        }

        const listingIdNum = Number(listingId);
        if (Number.isNaN(listingIdNum)) {
            return new Response(JSON.stringify({ success: false, message: 'Invalid listing id' }), {
                status: 400,
            });
        }

        const body = await req.json();
        const offerPrice = Number(body?.offer_price ?? body?.offerPrice);
        if (!Number.isFinite(offerPrice) || offerPrice <= 0) {
            return new Response(
                JSON.stringify({ success: false, message: 'Invalid offer price' }),
                { status: 400 }
            );
        }

        // Create Offer
        const result = await createOffer(listingIdNum, Number(session.userId), offerPrice);
        return Response.json(result);
    } catch (error) {
        console.error('POST /offers error:', error);
        return new Response(JSON.stringify({ success: false, message: 'Failed to submit offer' }), {
            status: 500,
        });
    }
}
