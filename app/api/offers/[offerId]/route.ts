import { verifySession } from '@/app/lib/session';
import { updateOfferStatus } from '@/app/lib/queries/offers';

export async function PATCH(
    req: Request,
    { params }: { params: { offerId: string } }
): Promise<Response> {
    try {
        const { offerId } = await params;

        const session = await verifySession();
        if (!session?.userId) {
            return new Response(JSON.stringify({ success: false, message: 'Unauthorized' }), {
                status: 401,
            });
        }

        const offerIdNum = Number(offerId);
        if (Number.isNaN(offerIdNum)) {
            return new Response(JSON.stringify({ success: false, message: 'Invalid offer id' }), {
                status: 400,
            });
        }

        const body = await req.json();
        const status = (body?.status ?? body?.offer_status) as 'Accepted' | 'Rejected';

        const result = await updateOfferStatus(offerIdNum, Number(session.userId), status);
        return Response.json(result);
    } catch (error) {
        console.error('PATCH /offers/:offerId error:', error);
        return new Response(JSON.stringify({ success: false, message: 'Failed to update offer' }), {
            status: 500,
        });
    }
}
