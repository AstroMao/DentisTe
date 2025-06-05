import React from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const InventoryPage = () => {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Inventory Management</h1>
        <Button onClick={() => alert('Open Add Inventory Item modal/page')}>
          <PlusCircle className="w-4 h-4 mr-2" /> Add New Item
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Inventory List</CardTitle>
          <CardDescription>Track stock levels and manage dental supplies.</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Placeholder for Inventory Table */}
          <p>Inventory item list, stock levels, and search will go here.</p>
        </CardContent>
      </Card>
    </div>
  );
};
export default InventoryPage;