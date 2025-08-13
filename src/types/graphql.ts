export interface AddressTypeDto {
  id: number;
  name: string;
}

export interface CountryDto {
  code: string;
  id: number;
  name: string;
}

export interface ThreatLevelDto {
  id: number;
  name: string;
}

export interface UsageTypeDto {
  id: number;
  name: string;
}

export interface RecordDto {
  addressIp: string;
  addressType: AddressTypeDto;
  country?: CountryDto | null;
  firstSeen?: string | null;
  id: number;
  lastSeen?: string | null;
  organization?: string | null;
  threatDetails?: string | null;
  threatLevel: ThreatLevelDto;
  usageType: UsageTypeDto;
}

export interface SearchRecordsResponseDto {
  items: RecordDto[];
  total: number;
}

export type SortDir = 'asc' | 'desc';

export interface SearchVariables {
  addressTypeId?: number;
  countryId?: number;
  firstSeenFrom?: string;
  firstSeenTo?: string;
  lastSeenFrom?: string;
  lastSeenTo?: string;
  organization?: string;
  page?: number;
  q?: string;
  size?: number;
  sortBy?: string;
  sortDir?: SortDir;
  threatLevelId?: number;
  usageTypeId?: number;
}
