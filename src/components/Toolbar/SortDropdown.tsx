import React, { useMemo } from 'react'
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import type { SortDir } from '../../types/graphql'

type Field = 'addressIp' | 'addressType' | 'country' | 'firstSeen' | 'lastSeen' | 'organization' | 'threatLevel' | 'usageType'

interface Props {
  onChange: (field: Field, dir: SortDir) => void
  value?: { field: Field, dir: SortDir }
}

export default function SortDropdown({ onChange, value }: Props) {
  const items = useMemo(() => ([
    { label: 'IP • Asc', field: 'addressIp', dir: 'asc' as SortDir },
    { label: 'IP • Desc', field: 'addressIp', dir: 'desc' as SortDir },
    { label: 'Address Type • Asc', field: 'addressType', dir: 'asc' as SortDir },
    { label: 'Address Type • Desc', field: 'addressType', dir: 'desc' as SortDir },
    { label: 'Country • Asc', field: 'country', dir: 'asc' as SortDir },
    { label: 'Country • Desc', field: 'country', dir: 'desc' as SortDir },
    { label: 'First Seen • Asc', field: 'firstSeen', dir: 'asc' as SortDir },
    { label: 'First Seen • Desc', field: 'firstSeen', dir: 'desc' as SortDir },
    { label: 'Last Seen • Asc', field: 'lastSeen', dir: 'asc' as SortDir },
    { label: 'Last Seen • Desc', field: 'lastSeen', dir: 'desc' as SortDir },
    { label: 'Organization • Asc', field: 'organization', dir: 'asc' as SortDir },
    { label: 'Organization • Desc', field: 'organization', dir: 'desc' as SortDir },
    { label: 'Threat Level • Asc', field: 'threatLevel', dir: 'asc' as SortDir },
    { label: 'Threat Level • Desc', field: 'threatLevel', dir: 'desc' as SortDir },
    { label: 'Usage Type • Asc', field: 'usageType', dir: 'asc' as SortDir },
    { label: 'Usage Type • Desc', field: 'usageType', dir: 'desc' as SortDir }
  ]), [])

  return (
    <FormControl size="small" sx={{ minWidth: 220 }}>
      <InputLabel id="sort-label">Sort</InputLabel>
      <Select
        labelId="sort-label"
        label="Sort"
        value={value ? `${value.field}-${value.dir}` : ''}
        onChange={(e) => {
          const [field, dir] = String(e.target.value).split('-') as [Field, SortDir]
          onChange(field, dir)
        }}
      >
        {items.map(i => (
          <MenuItem key={`${i.field}-${i.dir}`} value={`${i.field}-${i.dir}`}>{i.label}</MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
