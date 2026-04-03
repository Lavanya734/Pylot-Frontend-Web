export type OwnerProfileData = {
  id: string;
  name: string;
  phone: string;
  role: string;
  is_verified: boolean;
  address: string | null;
  profile_image_url: string | null;
  business_name: string | null;
  business_type: string | null;
  total_spent: number;
  total_transactions: number;
  monthly_volume: number | null;
  credit_limit: number | null;
};

export const MOCK_OWNER: OwnerProfileData = {
  id: "ov-101",
  name: "Shreya Mehra",
  phone: "+91 9876543210",
  role: "owner",
  is_verified: true,
  address: "Sector 45, Gurgaon, HR",
  profile_image_url: null,
  business_name: "Mehra Logistics & Co.",
  business_type: "Supply Chain",
  total_spent: 124500.50,
  total_transactions: 84,
  monthly_volume: 150,
  credit_limit: 500000.00,
};