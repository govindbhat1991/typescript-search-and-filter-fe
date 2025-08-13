import React, { useEffect, useMemo, useRef, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import type { RecordDto } from "../../types/graphql";

interface Props {
  rows: RecordDto[];
  columnsVisible: Record<string, boolean>;
  total: number;
  page: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

// Helper function to format dates to US format
const formatDate = (dateString: string | null | undefined): string => {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  } catch {
    return dateString;
  }
};

export default function DataTable({
  rows,
  columnsVisible,
  total,
  page,
  pageSize,
  onPageChange,
}: Props) {

  const columns = useMemo<GridColDef[]>(
    () => [
      {
        field: "addressIp",
        headerName: "IP",
        flex: 1,
        valueGetter: (p) => p || "",
      },
      {
        field: "addressType",
        headerName: "Address Type",
        flex: 1,
        valueGetter: (p) => p?.name || "",
      },
      {
        field: "country",
        headerName: "Country",
        flex: 1,
        valueGetter: (p) => p?.name || "",
      },
      {
        field: "firstSeen",
        headerName: "First Seen",
        flex: 1,
        valueGetter: (p) => p ? formatDate(p) : "",
      },
      {
        field: "lastSeen",
        headerName: "Last Seen",
        flex: 1,
        valueGetter: (p) => p ? formatDate(p) : "",
      },
      {
        field: "organization",
        headerName: "Organization",
        flex: 1,
        valueGetter: (p) => p || "",
      },
      {
        field: "threatLevel",
        headerName: "Threat Level",
        flex: 1,
        valueGetter: (p) => p?.name || "",
      },
      {
        field: "usageType",
        headerName: "Usage Type",
        flex: 1,
        valueGetter: (p) => p?.name || "",
      },
    ],
    []
  );

  const visibleModel = Object.fromEntries(
    Object.entries(columnsVisible).map(([k, v]) => [k, v])
  );

  const handlePaginationModelChange = (m: { page: number; pageSize: number }) => {
    // @TODO, fix this
    if(m.page === 0) { return }
    onPageChange(m.page);
  };

  return (
    <div style={{ width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(r) => r.id}
        columnVisibilityModel={visibleModel}
        pagination
        paginationMode="server"
        rowCount={total}
        paginationModel={{ page, pageSize }}
        onPaginationModelChange={handlePaginationModelChange}
        autoHeight
        disableRowSelectionOnClick
      />
    </div>
  );
}
