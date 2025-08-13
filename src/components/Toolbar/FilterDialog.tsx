import React, { useState } from 'react'
import { 
  Button, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Grid, 
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress
} from '@mui/material'
import { useLazyQuery } from '@apollo/client'
import { 
  GET_ADDRESS_TYPES, 
  GET_COUNTRIES, 
  GET_THREAT_LEVELS, 
  GET_USAGE_TYPES 
} from '../../apollo/queries'
import dayjs from 'dayjs'
import type { SearchVariables } from '../../types/graphql'

interface Props {
  onApply: (filters: Partial<SearchVariables>) => void
  initial?: Partial<SearchVariables>
}

export default function FilterDialog({ onApply, initial }: Props) {
  const [open, setOpen] = useState(false)
  const [values, setValues] = useState<Partial<SearchVariables>>(initial || {})
  
  // Lazy queries for dropdown data
  const [getAddressTypes, { data: addressTypesData, loading: addressTypesLoading }] = useLazyQuery(GET_ADDRESS_TYPES)
  const [getCountries, { data: countriesData, loading: countriesLoading }] = useLazyQuery(GET_COUNTRIES)
  const [getThreatLevels, { data: threatLevelsData, loading: threatLevelsLoading }] = useLazyQuery(GET_THREAT_LEVELS)
  const [getUsageTypes, { data: usageTypesData, loading: usageTypesLoading }] = useLazyQuery(GET_USAGE_TYPES)

  function set<K extends keyof SearchVariables>(key: K, val: SearchVariables[K]) {
    setValues(v => ({ ...v, [key]: val }))
  }

  const handleDropdownClick = (type: 'addressTypes' | 'countries' | 'threatLevels' | 'usageTypes') => {
    switch (type) {
      case 'addressTypes':
        if (!addressTypesData) getAddressTypes()
        break
      case 'countries':
        if (!countriesData) getCountries()
        break
      case 'threatLevels':
        if (!threatLevelsData) getThreatLevels()
        break
      case 'usageTypes':
        if (!usageTypesData) getUsageTypes()
        break
    }
  }

  return (
    <>
      <Button variant="outlined" size="small" onClick={() => setOpen(true)}>Filter</Button>
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Filters</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 0.5 }}>
            <Grid item xs={6} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel>Address Type</InputLabel>
                <Select
                  label="Address Type"
                  value={values.addressTypeId || ''}
                  onChange={(e) => set('addressTypeId', e.target.value ? Number(e.target.value) : undefined)}
                  onOpen={() => handleDropdownClick('addressTypes')}
                  endAdornment={addressTypesLoading ? <CircularProgress size={20} /> : null}
                >
                  <MenuItem value="">
                    <em>All</em>
                  </MenuItem>
                  {addressTypesData?.addressTypes?.map((type: any) => (
                    <MenuItem key={type.id} value={type.id}>
                      {type.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={6} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel>Country</InputLabel>
                <Select
                  label="Country"
                  value={values.countryId || ''}
                  onChange={(e) => set('countryId', e.target.value ? Number(e.target.value) : undefined)}
                  onOpen={() => handleDropdownClick('countries')}
                  endAdornment={countriesLoading ? <CircularProgress size={20} /> : null}
                >
                  <MenuItem value="">
                    <em>All</em>
                  </MenuItem>
                  {countriesData?.countries?.map((country: any) => (
                    <MenuItem key={country.id} value={country.id}>
                      {country.name} ({country.code})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={6} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel>Threat Level</InputLabel>
                <Select
                  label="Threat Level"
                  value={values.threatLevelId || ''}
                  onChange={(e) => set('threatLevelId', e.target.value ? Number(e.target.value) : undefined)}
                  onOpen={() => handleDropdownClick('threatLevels')}
                  endAdornment={threatLevelsLoading ? <CircularProgress size={20} /> : null}
                >
                  <MenuItem value="">
                    <em>All</em>
                  </MenuItem>
                  {threatLevelsData?.threatLevels?.map((level: any) => (
                    <MenuItem key={level.id} value={level.id}>
                      {level.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={6} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel>Usage Type</InputLabel>
                <Select
                  label="Usage Type"
                  value={values.usageTypeId || ''}
                  onChange={(e) => set('usageTypeId', e.target.value ? Number(e.target.value) : undefined)}
                  onOpen={() => handleDropdownClick('usageTypes')}
                  endAdornment={usageTypesLoading ? <CircularProgress size={20} /> : null}
                >
                  <MenuItem value="">
                    <em>All</em>
                  </MenuItem>
                  {usageTypesData?.usageTypes?.map((type: any) => (
                    <MenuItem key={type.id} value={type.id}>
                      {type.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField label="Organization" size="small"
                value={values.organization ?? ''}
                onChange={(e) => set('organization', e.target.value || undefined)} fullWidth />
            </Grid>

            <Grid item xs={6} md={3}>
              <TextField label="First Seen From" size="small" type="datetime-local"
                value={values.firstSeenFrom ?? ''}
                onChange={(e) => set('firstSeenFrom', e.target.value || undefined)} fullWidth />
            </Grid>
            <Grid item xs={6} md={3}>
              <TextField label="First Seen To" size="small" type="datetime-local"
                value={values.firstSeenTo ?? ''}
                onChange={(e) => set('firstSeenTo', e.target.value || undefined)} fullWidth />
            </Grid>
            <Grid item xs={6} md={3}>
              <TextField label="Last Seen From" size="small" type="datetime-local"
                value={values.lastSeenFrom ?? ''}
                onChange={(e) => set('lastSeenFrom', e.target.value || undefined)} fullWidth />
            </Grid>
            <Grid item xs={6} md={3}>
              <TextField label="Last Seen To" size="small" type="datetime-local"
                value={values.lastSeenTo ?? ''}
                onChange={(e) => set('lastSeenTo', e.target.value || undefined)} fullWidth />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { setValues(initial || {}); }}>Reset</Button>
          <Button variant="contained" onClick={() => { onApply(values); setOpen(false); }}>Apply</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
