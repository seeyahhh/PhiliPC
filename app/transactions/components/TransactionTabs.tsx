'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const TransactionTabs: React.FC = () => {
    const pathname = usePathname();

    const tabs = [
        { name: 'Purchases', href: '/transactions/purchases' },
        { name: 'Sales', href: '/transactions/sales' },
        { name: 'Sent Offers', href: '/transactions/sent-offers' },
        { name: 'Received Offers', href: '/transactions/received-offers' },
    ];

    return (
        <div className="flex border-b border-gray-300 dark:border-gray-500">
            {tabs.map((tab) => (
                <Link
                    key={tab.href}
                    href={tab.href}
                    className={`text-md px-4 py-2 font-semibold hover:cursor-pointer md:text-[16px] ${
                        pathname === tab.href
                            ? 'border-b-2 border-blue-600 text-blue-600'
                            : 'text-gray-700 dark:text-gray-400'
                    }`}
                >
                    {tab.name}
                </Link>
            ))}
        </div>
    );
};

export default TransactionTabs;
