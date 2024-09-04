'use client';

import { SetStateAction, useState } from 'react';

// material-ui
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import { InputBaseProps } from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Typography from '@mui/material/Typography';

// third-party
import { Column, SortingState } from '@tanstack/react-table';

interface Props {
  sortBy: string;
  setSorting: (value: SetStateAction<SortingState>) => void;
  getAllColumns: () => Column<any, unknown>[];
  size?: InputBaseProps['size'];
}

// ==============================|| COLUMN SORTING - SELECT ||============================== //

export default function SelectColumnSorting({ sortBy, getAllColumns, setSorting }: Props) {
  const [sort, setSort] = useState<string>(sortBy);

  const handleChange = (event: SelectChangeEvent<string>) => {
    const {
      target: { value }
    } = event;
    setSort(value);
    setSorting([{ id: value, desc: false }]);
  };

  return (
    <FormControl sx={{ width: 200 }}>
      <Select
        id="column-sorting"
        displayEmpty
        onChange={handleChange}
        value={sort}
        input={<OutlinedInput id="select-column-sorting" placeholder="select column" />}
        renderValue={(selected) => {
          const selectedColumn = getAllColumns().filter((column) => selected.length > 0 && column.id === selected)[0];
          if (selectedColumn) {
            return (
              <Typography variant="subtitle2">
                Sort by ({typeof selectedColumn.columnDef.header === 'string' ? selectedColumn.columnDef.header : '#'})
              </Typography>
            );
          }
          return <Typography variant="subtitle2">Sort By</Typography>;
        }}
      >
        {getAllColumns().map(
          (column) =>
            // @ts-ignore
            column.columnDef.accessorKey &&
            column.getCanSort() && (
              <MenuItem key={column.id} value={column.id}>
                <ListItemText primary={typeof column.columnDef.header === 'string' && column.columnDef.header} />
              </MenuItem>
            )
        )}
      </Select>
    </FormControl>
  );
}
