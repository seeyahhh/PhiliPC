import { CreateProductInput } from '@/app/data/types';
import { getProducts, postProduct } from '@/app/lib/queries/products';
import { NextResponse } from 'next/server';

export async function GET(): Promise<Response> {
    const products = await getProducts();
    return Response.json(products);
}

export async function POST(req: Request) {
    try {
        const body = (await req.json()) as CreateProductInput;

        const result = await postProduct(body);

        return NextResponse.json({ success: true, result });
    } catch (error) {
        console.log(error);
    }
}
