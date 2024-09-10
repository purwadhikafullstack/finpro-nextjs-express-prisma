import * as React from 'react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { Button } from '@/components/ui/button';

interface SidebarCardProps {
  //
}

const SidebarCard: React.FC<SidebarCardProps> = ({ ...props }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-lg'>Upgrade to Pro</CardTitle>
        <CardDescription>Unlock all features and get unlimited access to our support team.</CardDescription>
      </CardHeader>
      <CardContent>
        <Button size='sm' className='w-full'>
          Upgrade
        </Button>
      </CardContent>
    </Card>
  );
};

export default SidebarCard;
