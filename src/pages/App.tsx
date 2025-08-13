import React, { useMemo } from 'react'
import { Container, Paper } from '@mui/material'
import ToolbarContainer from '../components/Toolbar/ToolbarContainer'
import DataTable from '../components/DataTable/DataTable'
import { useQuery } from '@apollo/client'
import { SEARCH_RECORDS } from '../apollo/queries'
import { useUIStore } from '../store/useUIStore'
import { useDebouncedValue } from '../hooks/useDebouncedValue'
import type { RecordDto } from '../types/graphql'

export default function App() {
  const { query, setQuery, page, setPage, size, sortBy, sortDir, columns, filters, setFilters, setColumnVisible, setSort } = useUIStore()
  const debouncedQuery = useDebouncedValue(query, 300)

  const variables = useMemo(() => ({
    q: debouncedQuery || undefined,
    page,
    size,
    sortBy,
    sortDir,
    ...filters
  }), [debouncedQuery, page, size, sortBy, sortDir, filters])

  const { data, loading, refetch } = useQuery(SEARCH_RECORDS, { variables })

  const rows: RecordDto[] = data?.searchRecords?.items ?? []
  const total = data?.searchRecords?.total ?? 0

  async function getSuggestions(q: string) {
    // Simple adaptive suggestions using current results; replace with a dedicated suggestions endpoint if available
    const resp = await refetch({ ...variables, q, size: 20, page: 0 })
    const items: RecordDto[] = resp.data?.searchRecords?.items ?? []
    // Build suggestions from IP + org + country
    const set = new Set<string>()
    items.forEach(r => {
      if (r.addressIp) set.add(r.addressIp)
      if (r.organization) set.add(r.organization)
      if (r.country?.name) set.add(r.country.name)
    })
    return Array.from(set).slice(0, 8)
  }

  return (
    <Container maxWidth="xl" sx={{ py: 2 }}>
      <Paper variant="outlined">
        <ToolbarContainer
          query={query}
          onSearch={setQuery}
          onApplyFilters={setFilters}
          sort={{ field: sortBy, dir: sortDir }}
          onSortChange={(f, d) => setSort(f, d)}
          columns={columns}
          onColumnChange={setColumnVisible}
          getSuggestions={getSuggestions}
        />
        <DataTable
          rows={rows}
          columnsVisible={columns as any}
          total={total}
          page={page}
          pageSize={size}
          onPageChange={setPage}
        />
      </Paper>
    </Container>
  )
}
