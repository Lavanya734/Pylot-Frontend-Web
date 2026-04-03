export type NearbyWorker = {
  id: string;
  name: string;
  phone: string;
  address: string | null;
  locationLat: number;
  locationLng: number;
  distanceKm: number;
  skillType: string | null;
  experienceYears: number | null;
  rating: number;
  isAvailable: boolean;
};

export const MOCK_WORKERS: NearbyWorker[] = [
  {
    id: "w1",
    name: "Alex Rivera",
    phone: "+1 555-0101",
    address: "Downtown Tech District",
    locationLat: 40.7128,
    locationLng: -74.006,
    distanceKm: 0.84,
    skillType: "Electrical Engineering",
    experienceYears: 5,
    rating: 4.9,
    isAvailable: true,
  },
  {
    id: "w2",
    name: "Jordan Smith",
    phone: "+1 555-0202",
    address: "North Riverside",
    locationLat: 40.7306,
    locationLng: -73.9352,
    distanceKm: 2.15,
    skillType: "Plumbing Specialist",
    experienceYears: 12,
    rating: 4.7,
    isAvailable: true,
  },
  {
    id: "w3",
    name: "Casey Chen",
    phone: "+1 555-0303",
    address: null, // Testing null address as per your type
    locationLat: 40.6782,
    locationLng: -73.9442,
    distanceKm: 3.40,
    skillType: "General Contracting",
    experienceYears: 8,
    rating: 4.5,
    isAvailable: true,
  }
];