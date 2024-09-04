'use client';

import { ReactElement } from 'react';

// material-ui
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

// third-party
import { useDraggable, useDroppable } from '@dnd-kit/core';
import { Row } from '@tanstack/react-table';

// project-import
import IconButton from 'components/@extended/IconButton';

// assets
import { HambergerMenu } from 'iconsax-react';

// types
import { TableDataProps } from 'types/table';

// ==============================|| DRAGGABLE ROW ||============================== //

export default function DraggableRow({
  row,
  children
}: {
  row: Row<TableDataProps>;
  reorderRow: (draggedRowIndex: number, targetRowIndex: number) => void;
  children: ReactElement;
}) {
  const { setNodeRef: setDropRef, isOver: isOverCurrent } = useDroppable({
    id: `row-${row.id}`
  });

  const {
    attributes,
    listeners,
    setNodeRef: setDragRef,
    isDragging
  } = useDraggable({
    id: `row-${row.id}`
  });

  return (
    <TableRow ref={setDropRef} sx={{ opacity: isDragging ? 0.5 : 1, bgcolor: isOverCurrent ? 'primary.lighter' : 'inherit' }}>
      <TableCell>
        <IconButton
          ref={setDragRef}
          {...listeners}
          {...attributes}
          size="small"
          sx={{ p: 0, width: 24, height: 24, fontSize: '1rem', mr: 0.75 }}
          color="secondary"
          disabled={row.getIsGrouped()}
        >
          <HambergerMenu size="32" variant="Outline" />
        </IconButton>
      </TableCell>
      {children}
    </TableRow>
  );
}
