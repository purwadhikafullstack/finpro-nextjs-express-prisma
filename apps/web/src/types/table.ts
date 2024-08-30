import { ChangeEvent, SyntheticEvent } from 'react';

// material-ui
import { TableCellProps } from '@mui/material/TableCell';

// project-iports
import { Gender } from 'config';

// types
import { KeyedObject } from './root';

// ==============================|| TYPES - TABLES  ||============================== //

export type ArrangementOrder = 'asc' | 'desc' | undefined;

export type GetComparator = (o: ArrangementOrder, o1: string) => (a: KeyedObject, b: KeyedObject) => number;

export interface EnhancedTableHeadProps extends TableCellProps {
  onSelectAllClick: (e: ChangeEvent<HTMLInputElement>) => void;
  order: ArrangementOrder;
  orderBy?: string;
  numSelected: number;
  rowCount: number;
  onRequestSort: (e: SyntheticEvent, p: string) => void;
}

export interface EnhancedTableToolbarProps {
  numSelected: number;
}

export type HeadCell = {
  id: string;
  numeric: boolean;
  label: string;
  disablePadding?: string | boolean | undefined;
  align?: 'left' | 'right' | 'inherit' | 'center' | 'justify' | undefined;
};

export type TableDataApiResponse = {
  data: TableDataProps[];
  meta: {
    totalRowCount: number;
  };
};

export type TableDataProps = {
  id: number;
  firstName: string;
  lastName: string;
  fullName: string;
  fatherName: string;
  email: string;
  age: number;
  gender: Gender;
  role: string;
  visits: number;
  progress: number;
  status: string;
  orderStatus: string;
  contact: string;
  country: string;
  address: string;
  about: string;
  avatar: number;
  skills: string[];
  time: string[];
};
