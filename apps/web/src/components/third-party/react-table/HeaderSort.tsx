'use client';

// material-ui
import { useTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

// assets
import { ArrowDown2, ArrowUp2 } from 'iconsax-react';

// types
import { Column } from '@tanstack/react-table';

enum SortType {
  ASC = 'asc',
  DESC = 'desc'
}

function SortToggler({ type }: { type?: SortType }) {
  const theme = useTheme();
  return (
    <Stack sx={{ color: 'secondary.light' }}>
      <ArrowUp2
        size="15"
        variant="Bold"
        style={{ fontSize: '0.625rem', color: type === SortType.ASC ? theme.palette.text.secondary : 'inherit' }}
      />

      <ArrowDown2
        size="15"
        variant="Bold"
        style={{ fontSize: '0.625rem', marginTop: -8, color: type === SortType.DESC ? theme.palette.text.secondary : 'inherit' }}
      />
    </Stack>
  );
}

interface HeaderSortProps {
  column: Column<any, unknown>;
  sort?: boolean;
}

// ==============================|| SORT HEADER ||============================== //

export default function HeaderSort({ column, sort }: HeaderSortProps) {
  return (
    <Box {...(sort && { onClick: column.getToggleSortingHandler(), className: 'cursor-pointer prevent-select' })}>
      {{
        asc: <SortToggler type={SortType.ASC} />,
        desc: <SortToggler type={SortType.DESC} />
      }[column.getIsSorted() as string] ?? <SortToggler />}
    </Box>
  );
}
