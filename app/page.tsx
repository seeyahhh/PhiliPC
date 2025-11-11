'use client';

import Banner from '@/app/components/HomeBanner';
import Navigation from '@/app/components/Navigation';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import products from '@/app/data/productMock.json';
import Products from '@/app/components/Products';

const Home: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-200 dark:bg-gray-800">
            <Navigation />
            <div className="mx-10">
                <Banner />
                <section
                    id="recommendations"
                    className="mx-auto max-w-7xl"
                >
                    <div className="flex justify-between">
                        <div className="text-black dark:text-white">
                            <span className="text-lg font-semibold">Recommended for you</span>
                        </div>
                        <div className="">
                            <Link
                                href={'#'}
                                className="text-primary flex hover:text-blue-700 hover:underline"
                            >
                                View All
                                <ChevronRight className="h-6 w-6" />
                            </Link>
                        </div>
                    </div>
                    <div className="grid grid-flow-row gap-5 p-5 md:grid-cols-2 lg:grid-cols-3">
                        {products.map((product) => {
                            return (
                                <Products
                                    key={product.listing_id}
                                    product={product}
                                    onClick={() => console.log('view')}
                                />
                            );
                        })}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Home;
