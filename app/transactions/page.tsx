import { redirect } from 'next/navigation';
import React from 'react';

export default function TransactionsPage(): React.JSX.Element {
    redirect('/transactions/purchases');
}
