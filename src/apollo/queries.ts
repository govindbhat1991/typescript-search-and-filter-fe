import { gql } from '@apollo/client'

export const SEARCH_RECORDS = gql`
  query SearchRecords(
    $addressTypeId: Int
    $countryId: Int
    $firstSeenFrom: DateTime
    $firstSeenTo: DateTime
    $lastSeenFrom: DateTime
    $lastSeenTo: DateTime
    $organization: String
    $page: Int
    $q: String
    $size: Int
    $sortBy: String
    $sortDir: String
    $threatLevelId: Int
    $usageTypeId: Int
  ) {
    searchRecords(
      addressTypeId: $addressTypeId
      countryId: $countryId
      firstSeenFrom: $firstSeenFrom
      firstSeenTo: $firstSeenTo
      lastSeenFrom: $lastSeenFrom
      lastSeenTo: $lastSeenTo
      organization: $organization
      page: $page
      q: $q
      size: $size
      sortBy: $sortBy
      sortDir: $sortDir
      threatLevelId: $threatLevelId
      usageTypeId: $usageTypeId
    ) {
      total
      currentPage
      pageSize
      totalPages
      items {
        id
        addressIp
        addressType { id name }
        country { id code name }
        firstSeen
        lastSeen
        organization
        threatDetails
        threatLevel { id name }
        usageType { id name }
      }
    }
  }
`

export const GET_ADDRESS_TYPES = gql`
  query GetAddressTypes {
    addressTypes {
      id
      name
    }
  }
`

export const GET_COUNTRIES = gql`
  query GetCountries {
    countries {
      id
      code
      name
    }
  }
`

export const GET_THREAT_LEVELS = gql`
  query GetThreatLevels {
    threatLevels {
      id
      name
    }
  }
`

export const GET_USAGE_TYPES = gql`
  query GetUsageTypes {
    usageTypes {
      id
      name
    }
  }
`
