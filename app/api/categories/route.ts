import { getCategories } from '@/app/lib/queries/categories';

export async function GET(): Promise<Response> {
    const categories = await getCategories();
    return Response.json(categories ?? []);
}
