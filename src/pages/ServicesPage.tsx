import React from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const ServicesPage = () => {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Services Management</h1>
        <Button onClick={() => alert('Open Add Service modal/page')}>
          <PlusCircle className="w-4 h-4 mr-2" /> Add New Service
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Service List</CardTitle>
          <CardDescription>Define and manage billable clinic services.</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Placeholder for Service Table */}
          <p>Service list, pricing, and management features will go here.</p>
        </CardContent>
      </Card>
    </div>
  );
};
export default ServicesPage;