import React from 'react'
import { Box } from '@mui/material'
import SearchBar from './SearchBar'
import FilterDialog from './FilterDialog'
import SortDropdown from './SortDropdown'
import ColumnCustomizer from './ColumnCustomizer'
import type { SearchVariables, SortDir } from '../../types/graphql'

type ColumnKey = 'addressIp' | 'addressType' | 'country' | 'firstSeen' | 'lastSeen' | 'organization' | 'threatLevel' | 'usageType'

interface Props {
  query: string
  onSearch: (q: string) => void
  onApplyFilters: (f: Partial<SearchVariables>) => void
  sort: { field: ColumnKey, dir: SortDir }
  onSortChange: (field: ColumnKey, dir: SortDir) => void
  columns: Record<ColumnKey, boolean>
  onColumnChange: (key: ColumnKey, visible: boolean) => void
  getSuggestions: (q: string) => Promise<string[]>
}

export default function ToolbarContainer(props: Props) {
  const { query, onSearch, onApplyFilters, sort, onSortChange, columns, onColumnChange, getSuggestions } = props
  return (
    <Box display="flex" alignItems="center" justifyContent="space-between" gap={1} sx={{ p: 1 }}>
      <SearchBar onSearch={onSearch} getSuggestions={getSuggestions} />
      <Box display="flex" gap={1}>
        <FilterDialog onApply={onApplyFilters} />
        <ColumnCustomizer columns={columns} onChange={onColumnChange} />
        <SortDropdown onChange={onSortChange} value={{ field: sort.field, dir: sort.dir }} />
      </Box>
    </Box>
  )
}
