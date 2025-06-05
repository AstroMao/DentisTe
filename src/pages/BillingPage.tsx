import React from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const BillingPage = () => {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Billing & Invoices</h1>
        <Button onClick={() => alert('Navigate to Create Invoice page')}>
          <PlusCircle className="w-4 h-4 mr-2" /> Create New Invoice
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Invoice List</CardTitle>
          <CardDescription>Manage and track all patient invoices.</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Placeholder for Invoice Table */}
          <p>Invoice list and search functionality will go here.</p>
        </CardContent>
      </Card>
    </div>
  );
};
export default BillingPage;