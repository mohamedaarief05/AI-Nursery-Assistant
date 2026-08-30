export type Plant = {
  id: string;
  name: string;
  category_id: string;
  price: number;
  availability: 'Available' | 'Out of Stock';
  description: string;
  sunlight: string;
  watering: string;
  soil: string;
  care_instructions: string;
  image_url: string;
  categories?: { name: string };
};

export type Category = {
  id: string;
  name: string;
};

export type Enquiry = {
  id: string;
  customer_name: string;
  phone: string;
  email: string | null;
  plant_id: string | null;
  message: string;
  status: 'New' | 'Contacted' | 'Completed';
  created_at: string;
  admin_reply?: string;
  plants?: { name: string };
};

export type Order = {
  id: string;
  customer_name: string;
  phone: string;
  email: string | null;
  address: string;
  plant_id: string;
  quantity: number;
  total_price: number;
  status: 'Pending' | 'Processing' | 'Out for Delivery' | 'Delivered' | 'Cancelled';
  created_at: string;
  plants?: { name: string, image_url?: string };
};
