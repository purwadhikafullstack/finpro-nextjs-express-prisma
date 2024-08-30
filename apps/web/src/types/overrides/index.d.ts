// eslint-disable-next-line
import * as Color from '@mui/material';

declare module '@mui/material' {
  interface Color {
    0?: string;
  }
}
// react-table
declare module '@tanstack/react-table' {
  export interface ColumnMeta {
    className?: string;
  }

  export interface TableMeta {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
    revertData?: (rowIndex: number, revert: unknown) => void;
    selectedRow?: any;
    setSelectedRow?: any;
  }
}
