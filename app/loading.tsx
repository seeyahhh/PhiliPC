'use client';

import { JSX } from 'react';

export default function Loading(): JSX.Element {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-gray-900">
            <div className="flex space-x-2">
                <span className="dot bg-primary h-3 w-3 animate-bounce rounded-full delay-0"></span>
                <span className="dot bg-primary h-3 w-3 animate-bounce rounded-full delay-200"></span>
                <span className="dot bg-primary h-3 w-3 animate-bounce rounded-full delay-400"></span>
            </div>
        </div>
    );
}
