'use client';

import { useEffect, useMemo, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

// third-party
import {
  flexRender,
  useReactTable,
  ColumnDef,
  HeaderGroup,
  getCoreRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  getPaginationRowModel,
} from '@tanstack/react-table';

// project import
import ScrollX from 'components/ScrollX';
import MainCard from 'components/MainCard';
import {
  TablePagination,
  HeaderSort,
  DebouncedInput,
} from 'components/third-party/react-table';
import instance from 'utils/axiosIntance';

// types
interface OrderStatus {
  transaction_id: number;
  status: string;
  created_at: string;
  updated_at: string;
}

interface ReactTableProps {
  columns: ColumnDef<OrderStatus>[];
  data: OrderStatus[];
  title?: string;
  selectedDate: Date | null;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | null>>;
}

// ==============================|| REACT TABLE ||============================== //

function ReactTable({
  columns,
  data,
  title,
  selectedDate,
  setSelectedDate,
}: ReactTableProps) {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState('');
  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
      rowSelection,
      globalFilter,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
  });

  return (
    <MainCard content={false} title={title}>
      <Box sx={{ p: 3, pb: 0 }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={1}
        >
          <Typography variant="h5">Order List</Typography>
        </Stack>
      </Box>
      <Stack
        direction={matchDownSM ? 'column' : 'row'}
        spacing={2}
        justifyContent="space-between"
        alignItems="center"
        sx={{ padding: 2.5 }}
      >
        <DebouncedInput
          value={globalFilter ?? ''}
          onFilterChange={(value) => setGlobalFilter(String(value))}
          placeholder={`Search ${data.length} records...`}
          sx={{
            width: matchDownSM ? '100%' : '48%', // 48% untuk setengah lebar di desktop
            flexBasis: matchDownSM ? '100%' : '48%', // memastikan setengah lebar di mobile
          }}
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Filter by Date"
            value={selectedDate}
            onChange={(newValue) => setSelectedDate(newValue)}
            slotProps={{
              textField: {
                fullWidth: true,
                sx: {
                  width: matchDownSM ? '100%' : '48%', // 48% untuk setengah lebar di desktop
                  flexBasis: matchDownSM ? '100%' : '48%', // memastikan setengah lebar di mobile
                },
              },
            }}
          />
        </LocalizationProvider>
      </Stack>
      <ScrollX>
        <Stack>
          <TableContainer>
            <Table>
              <TableHead>
                {table
                  .getHeaderGroups()
                  .map((headerGroup: HeaderGroup<any>) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <TableCell
                          key={header.id}
                          {...header.column.columnDef.meta}
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {header.isPlaceholder ? null : (
                            <Stack
                              direction="row"
                              spacing={1}
                              alignItems="center"
                            >
                              <Box>
                                {flexRender(
                                  header.column.columnDef.header,
                                  header.getContext(),
                                )}
                              </Box>
                              {header.column.getCanSort() && (
                                <HeaderSort column={header.column} />
                              )}
                            </Stack>
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
              </TableHead>
              <TableBody>
                {table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} {...cell.column.columnDef.meta}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
                <TableRow
                  sx={{ '&:hover': { bgcolor: 'transparent !important' } }}
                >
                  <TableCell sx={{ p: 2, py: 3 }} colSpan={9}>
                    <TablePagination
                      {...{
                        setPageSize: table.setPageSize,
                        setPageIndex: table.setPageIndex,
                        getState: table.getState,
                        getPageCount: table.getPageCount,
                        initialPageSize: 4,
                      }}
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
      </ScrollX>
    </MainCard>
  );
}

export default function OrderList({ customerId }: { customerId: string }) {
  const [data, setData] = useState<OrderStatus[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

//   const theme = useTheme();

  useEffect(() => {
    const fetchOrderStatuses = async () => {
      try {
        const response = await instance().get(
          `/customers/${customerId}/orders`,
        );
        const filteredData = response.data.data.filter((order: OrderStatus) => {
          if (!selectedDate) return true;
          const orderDate = new Date(order.created_at);
          const selected = new Date(selectedDate);
          return orderDate.toDateString() === selected.toDateString();
        });
        setData(filteredData);
      } catch (error) {
        console.error('Failed to fetch order statuses:', error);
      }
    };

    fetchOrderStatuses();
  }, [customerId, selectedDate]);

  const columns = useMemo<ColumnDef<OrderStatus>[]>(
    () => [
      {
        header: 'Transaction ID',
        accessorKey: 'transaction_id',
        cell: ({ row }) => (
          <Typography variant="subtitle1">
            {row.original.transaction_id}
          </Typography>
        ),
      },
      {
        header: 'Status',
        accessorKey: 'status',
        cell: ({ row }) => (
          <Typography variant="subtitle1">{row.original.status}</Typography>
        ),
      },
      {
        header: 'Created At',
        accessorKey: 'created_at',
        cell: ({ row }) => (
          <Typography variant="subtitle1">
            {new Date(row.original.created_at).toLocaleString()}
          </Typography>
        ),
      },
      {
        header: 'Updated At',
        accessorKey: 'updated_at',
        cell: ({ row }) => (
          <Typography variant="subtitle1">
            {new Date(row.original.updated_at).toLocaleString()}
          </Typography>
        ),
      },
    ],
    [],
  );

  return (
    <MainCard content={false}>
      <ScrollX>
        <ReactTable
          columns={columns}
          data={data}
          title="Order Details"
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </ScrollX>
    </MainCard>
  );
}
