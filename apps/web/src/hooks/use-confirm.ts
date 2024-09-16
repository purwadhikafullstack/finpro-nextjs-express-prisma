'use client';

import * as React from 'react';

import ConfirmContext from '@/context/confirm';

export default function useConfirm() {
  const context = React.useContext(ConfirmContext);
  if (!context) {
    throw new Error('useConfirm must be used within an ConfirmProvider');
  }
  return context;
}
