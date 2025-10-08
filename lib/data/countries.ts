/**
 * Country data for world map visualization
 * Source: Customer Report - Rev1.xlsx
 */

export interface CountryData {
  name: string
  topoName: string // Name as it appears in TopoJSON
  iso2: string // ISO 3166-1 alpha-2 code
  iso3: string // ISO 3166-1 alpha-3 code
  customers: number
}

export const countriesData: CountryData[] = [
  { name: 'Argentina', topoName: 'Argentina', iso2: 'AR', iso3: 'ARG', customers: 2 },
  { name: 'Australia', topoName: 'Australia', iso2: 'AU', iso3: 'AUS', customers: 5 },
  { name: 'Bangladesh', topoName: 'Bangladesh', iso2: 'BD', iso3: 'BGD', customers: 2 },
  { name: 'Canada', topoName: 'Canada', iso2: 'CA', iso3: 'CAN', customers: 22 },
  { name: 'China', topoName: 'China', iso2: 'CN', iso3: 'CHN', customers: 1 },
  { name: 'Chile', topoName: 'Chile', iso2: 'CL', iso3: 'CHL', customers: 1 },
  { name: 'Denmark', topoName: 'Denmark', iso2: 'DK', iso3: 'DNK', customers: 2 },
  { name: 'Dominican Republic', topoName: 'Dominican Rep.', iso2: 'DO', iso3: 'DOM', customers: 1 },
  { name: 'Egypt', topoName: 'Egypt', iso2: 'EG', iso3: 'EGY', customers: 7 },
  { name: 'France', topoName: 'France', iso2: 'FR', iso3: 'FRA', customers: 1 },
  { name: 'Germany', topoName: 'Germany', iso2: 'DE', iso3: 'DEU', customers: 6 },
  { name: 'Greece', topoName: 'Greece', iso2: 'GR', iso3: 'GRC', customers: 1 },
  { name: 'India', topoName: 'India', iso2: 'IN', iso3: 'IND', customers: 3 },
  { name: 'Indonesia', topoName: 'Indonesia', iso2: 'ID', iso3: 'IDN', customers: 2 },
  { name: 'Ireland', topoName: 'Ireland', iso2: 'IE', iso3: 'IRL', customers: 1 },
  { name: 'Italy', topoName: 'Italy', iso2: 'IT', iso3: 'ITA', customers: 1 },
  { name: 'Malaysia', topoName: 'Malaysia', iso2: 'MY', iso3: 'MYS', customers: 1 },
  { name: 'Mexico', topoName: 'Mexico', iso2: 'MX', iso3: 'MEX', customers: 4 },
  { name: 'Pakistan', topoName: 'Pakistan', iso2: 'PK', iso3: 'PAK', customers: 2 },
  { name: 'Panama', topoName: 'Panama', iso2: 'PA', iso3: 'PAN', customers: 2 },
  { name: 'Peru', topoName: 'Peru', iso2: 'PE', iso3: 'PER', customers: 1 },
  { name: 'Poland', topoName: 'Poland', iso2: 'PL', iso3: 'POL', customers: 1 },
  { name: 'Portugal', topoName: 'Portugal', iso2: 'PT', iso3: 'PRT', customers: 1 },
  { name: 'Saudi Arabia', topoName: 'Saudi Arabia', iso2: 'SA', iso3: 'SAU', customers: 2 },
  { name: 'Senegal', topoName: 'Senegal', iso2: 'SN', iso3: 'SEN', customers: 1 },
  { name: 'Singapore', topoName: 'Singapore', iso2: 'SG', iso3: 'SGP', customers: 1 },
  { name: 'Slovenia', topoName: 'Slovenia', iso2: 'SI', iso3: 'SVN', customers: 2 },
  { name: 'South Africa', topoName: 'South Africa', iso2: 'ZA', iso3: 'ZAF', customers: 8 },
  { name: 'South Korea', topoName: 'Korea', iso2: 'KR', iso3: 'KOR', customers: 2 },
  { name: 'Spain', topoName: 'Spain', iso2: 'ES', iso3: 'ESP', customers: 1 },
  { name: 'Sri Lanka', topoName: 'Sri Lanka', iso2: 'LK', iso3: 'LKA', customers: 1 },
  { name: 'Taiwan', topoName: 'Taiwan', iso2: 'TW', iso3: 'TWN', customers: 2 },
  { name: 'Tanzania', topoName: 'Tanzania', iso2: 'TZ', iso3: 'TZA', customers: 1 },
  { name: 'Turkey', topoName: 'Turkey', iso2: 'TR', iso3: 'TUR', customers: 14 },
  { name: 'UAE', topoName: 'United Arab Emirates', iso2: 'AE', iso3: 'ARE', customers: 6 },
  { name: 'United Kingdom', topoName: 'United Kingdom', iso2: 'GB', iso3: 'GBR', customers: 2 },
  { name: 'USA', topoName: 'United States of America', iso2: 'US', iso3: 'USA', customers: 50 },
]

// Create a map for quick lookups by TopoJSON name
export const countryMap = new Map(
  countriesData.map((country) => [country.topoName, country])
)

// Get total number of countries
export const totalCountries = countriesData.length

// Get total number of customers
export const totalCustomers = countriesData.reduce(
  (sum, country) => sum + country.customers,
  0
)

// Helper function to get flag emoji from ISO2 code
export function getFlagEmoji(iso2: string): string {
  return iso2
    .toUpperCase()
    .split('')
    .map((char) => String.fromCodePoint(127397 + char.charCodeAt(0)))
    .join('')
}
