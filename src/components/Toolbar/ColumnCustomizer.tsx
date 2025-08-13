import React, { useState } from 'react'
import { Button, Dialog, DialogTitle, DialogContent, FormGroup, FormControlLabel, Checkbox, DialogActions } from '@mui/material'

type ColumnKey =
  | 'addressIp' | 'addressType' | 'country' | 'firstSeen' | 'lastSeen' | 'organization' | 'threatLevel' | 'usageType'

interface Props {
  columns: Record<ColumnKey, boolean>
  onChange: (key: ColumnKey, visible: boolean) => void
}

export default function ColumnCustomizer({ columns, onChange }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button variant="outlined" size="small" onClick={() => setOpen(true)}>Columns</Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Customize Columns</DialogTitle>
        <DialogContent>
          <FormGroup sx={{ minWidth: 320 }}>
            {Object.entries(columns).map(([key, val]) => (
              <FormControlLabel
                key={key}
                control={<Checkbox checked={!!val} onChange={(_, c) => onChange(key as ColumnKey, c)} />}
                label={key}
              />
            ))}
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
