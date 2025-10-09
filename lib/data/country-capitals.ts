/**
 * Country capital coordinates for marker placement on world map
 */

export interface CapitalCoordinate {
  iso2: string
  name: string
  capital: string
  coordinates: [number, number] // [longitude, latitude]
  customers: number
}

export const capitalCoordinates: CapitalCoordinate[] = [
  { iso2: 'AR', name: 'Argentina', capital: 'Buenos Aires', coordinates: [-58.3816, -34.6037], customers: 2 },
  { iso2: 'AU', name: 'Australia', capital: 'Canberra', coordinates: [149.1300, -35.2809], customers: 5 },
  { iso2: 'BD', name: 'Bangladesh', capital: 'Dhaka', coordinates: [90.4125, 23.8103], customers: 2 },
  { iso2: 'CA', name: 'Canada', capital: 'Ottawa', coordinates: [-75.6972, 45.4215], customers: 22 },
  { iso2: 'CN', name: 'China', capital: 'Beijing', coordinates: [116.4074, 39.9042], customers: 1 },
  { iso2: 'CL', name: 'Chile', capital: 'Santiago', coordinates: [-70.6693, -33.4489], customers: 1 },
  { iso2: 'DK', name: 'Denmark', capital: 'Copenhagen', coordinates: [12.5683, 55.6761], customers: 2 },
  { iso2: 'DO', name: 'Dominican Republic', capital: 'Santo Domingo', coordinates: [-69.9312, 18.4861], customers: 1 },
  { iso2: 'EG', name: 'Egypt', capital: 'Cairo', coordinates: [31.2357, 30.0444], customers: 7 },
  { iso2: 'FR', name: 'France', capital: 'Paris', coordinates: [2.3522, 48.8566], customers: 1 },
  { iso2: 'DE', name: 'Germany', capital: 'Berlin', coordinates: [13.4050, 52.5200], customers: 6 },
  { iso2: 'GR', name: 'Greece', capital: 'Athens', coordinates: [23.7275, 37.9838], customers: 1 },
  { iso2: 'IN', name: 'India', capital: 'New Delhi', coordinates: [77.1025, 28.7041], customers: 3 },
  { iso2: 'ID', name: 'Indonesia', capital: 'Jakarta', coordinates: [106.8456, -6.2088], customers: 2 },
  { iso2: 'IE', name: 'Ireland', capital: 'Dublin', coordinates: [-6.2603, 53.3498], customers: 1 },
  { iso2: 'IT', name: 'Italy', capital: 'Rome', coordinates: [12.4964, 41.9028], customers: 1 },
  { iso2: 'MY', name: 'Malaysia', capital: 'Kuala Lumpur', coordinates: [101.6869, 3.1390], customers: 1 },
  { iso2: 'MX', name: 'Mexico', capital: 'Mexico City', coordinates: [-99.1332, 19.4326], customers: 4 },
  { iso2: 'PK', name: 'Pakistan', capital: 'Islamabad', coordinates: [73.0479, 33.6844], customers: 2 },
  { iso2: 'PA', name: 'Panama', capital: 'Panama City', coordinates: [-79.5199, 8.9824], customers: 2 },
  { iso2: 'PE', name: 'Peru', capital: 'Lima', coordinates: [-77.0428, -12.0464], customers: 1 },
  { iso2: 'PL', name: 'Poland', capital: 'Warsaw', coordinates: [21.0122, 52.2297], customers: 1 },
  { iso2: 'PT', name: 'Portugal', capital: 'Lisbon', coordinates: [-9.1393, 38.7223], customers: 1 },
  { iso2: 'SA', name: 'Saudi Arabia', capital: 'Riyadh', coordinates: [46.6753, 24.7136], customers: 2 },
  { iso2: 'SN', name: 'Senegal', capital: 'Dakar', coordinates: [-17.4677, 14.7167], customers: 1 },
  { iso2: 'SG', name: 'Singapore', capital: 'Singapore', coordinates: [103.8198, 1.3521], customers: 1 },
  { iso2: 'SI', name: 'Slovenia', capital: 'Ljubljana', coordinates: [14.5058, 46.0569], customers: 2 },
  { iso2: 'ZA', name: 'South Africa', capital: 'Pretoria', coordinates: [28.1881, -25.7479], customers: 8 },
  { iso2: 'KR', name: 'South Korea', capital: 'Seoul', coordinates: [126.9780, 37.5665], customers: 2 },
  { iso2: 'ES', name: 'Spain', capital: 'Madrid', coordinates: [-3.7038, 40.4168], customers: 1 },
  { iso2: 'LK', name: 'Sri Lanka', capital: 'Colombo', coordinates: [79.8612, 6.9271], customers: 1 },
  { iso2: 'TW', name: 'Taiwan', capital: 'Taipei', coordinates: [121.5654, 25.0330], customers: 2 },
  { iso2: 'TZ', name: 'Tanzania', capital: 'Dodoma', coordinates: [35.7516, -6.1630], customers: 1 },
  { iso2: 'TR', name: 'Turkey', capital: 'Ankara', coordinates: [32.8597, 39.9334], customers: 14 },
  { iso2: 'AE', name: 'UAE', capital: 'Abu Dhabi', coordinates: [54.3773, 24.4539], customers: 6 },
  { iso2: 'GB', name: 'United Kingdom', capital: 'London', coordinates: [-0.1278, 51.5074], customers: 2 },
  { iso2: 'US', name: 'USA', capital: 'Washington DC', coordinates: [-77.0369, 38.9072], customers: 50 },
]
