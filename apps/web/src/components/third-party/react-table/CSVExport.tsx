'use client';

// material-ui
import { useTheme } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';

// third-party
import { CSVLink } from 'react-csv';
import { Headers } from 'react-csv/lib/core';

// assets
import { DocumentDownload } from 'iconsax-react';

interface CSVExportProps {
  data: never[] | any[];
  filename: string;
  headers?: Headers;
}

// ==============================|| CSV EXPORT ||============================== //

export default function CSVExport({ data, filename, headers }: CSVExportProps) {
  const theme = useTheme();

  return (
    <CSVLink data={data} filename={filename} headers={headers}>
      <Tooltip title="CSV Export">
        <DocumentDownload
          size={28}
          variant="Outline"
          style={{ color: theme.palette.text.secondary, marginTop: 4, marginRight: 4, marginLeft: 4 }}
        />
      </Tooltip>
    </CSVLink>
  );
}
