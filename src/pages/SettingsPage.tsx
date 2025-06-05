import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const SettingsPage = () => {
  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Settings</h1>
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Clinic Profile</CardTitle>
            <CardDescription>Manage your clinic's information.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Form for clinic name, address, contact, etc.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>User Management</CardTitle>
            <CardDescription>Manage staff and dentist accounts.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>List of users, roles, ability to add/edit users.</p>
          </CardContent>
        </Card>
         <Card>
          <CardHeader>
            <CardTitle>Billing Settings</CardTitle>
            <CardDescription>Configure tax rates, invoice templates, etc.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Settings related to billing.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
export default SettingsPage;