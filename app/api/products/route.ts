import { getProducts } from '@/app/lib/products';

export async function GET(){
  const products = await getProducts();
  return Response.json(products);
}

