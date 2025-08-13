import { create } from 'zustand'
import type { SearchVariables, SortDir } from '../types/graphql'

type ColumnKey =
  | 'addressIp' | 'addressType' | 'country' | 'firstSeen' | 'lastSeen' | 'organization' | 'threatLevel' | 'usageType'

interface UIState {
  query: string
  page: number
  size: number
  sortBy: ColumnKey
  sortDir: SortDir
  columns: Record<ColumnKey, boolean>
  filters: Partial<SearchVariables>

  setQuery: (q: string) => void
  setPage: (p: number) => void
  setSize: (s: number) => void
  setSort: (by: ColumnKey, dir: SortDir) => void
  setColumnVisible: (key: ColumnKey, v: boolean) => void
  setFilters: (f: Partial<SearchVariables>) => void
  resetFilters: () => void
}

export const useUIStore = create<UIState>((set) => ({
  query: '',
  page: 0,
  size: 20,
  sortBy: 'lastSeen',
  sortDir: 'desc',
  columns: {
    addressIp: true,
    addressType: true,
    country: true,
    firstSeen: true,
    lastSeen: true,
    organization: true,
    threatLevel: true,
    usageType: true
  },
  filters: {},
  setQuery: (q) => set({ query: q, page: 0 }),
  setPage: (p) => set({ page: p }),
  setSize: (s) => set({ size: s, page: 0 }),
  setSort: (by, dir) => set({ sortBy: by, sortDir: dir, page: 0 }),
  setColumnVisible: (key, v) => set((st) => ({ columns: { ...st.columns, [key]: v } })),
  setFilters: (f) => set({ filters: f, page: 0 }),
  resetFilters: () => set({ filters: {}, page: 0 })
}))
