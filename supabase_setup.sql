-- Supabase Setup Script for AI Nursery Assistant

-- Drop existing tables and policies to allow re-running the script
DROP TABLE IF EXISTS public.enquiries CASCADE;
DROP TABLE IF EXISTS public.plants CASCADE;
DROP TABLE IF EXISTS public.categories CASCADE;
DROP TABLE IF EXISTS public.admin_users CASCADE;

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create categories table
CREATE TABLE public.categories (

    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL UNIQUE
);

-- Create plants table
CREATE TABLE public.plants (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    category_id UUID REFERENCES public.categories(id),
    price DECIMAL(10, 2) NOT NULL,
    availability TEXT NOT NULL CHECK (availability IN ('Available', 'Out of Stock')),
    description TEXT NOT NULL,
    sunlight TEXT NOT NULL,
    watering TEXT NOT NULL,
    soil TEXT NOT NULL,
    care_instructions TEXT NOT NULL,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create enquiries table
CREATE TABLE public.enquiries (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    customer_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    plant_id UUID REFERENCES public.plants(id),
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'New' CHECK (status IN ('New', 'Contacted', 'Completed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create admin_users table (optional)
CREATE TABLE public.admin_users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    role TEXT NOT NULL DEFAULT 'admin',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Insert categories
INSERT INTO public.categories (name) VALUES
('Flower Plants'),
('Indoor Plants'),
('Outdoor Plants'),
('Fruit Plants'),
('Vegetable Plants'),
('Decorative Plants');

-- Insert sample plants
DO $$
DECLARE
    flower_id UUID;
    indoor_id UUID;
    outdoor_id UUID;
    fruit_id UUID;
    veg_id UUID;
    deco_id UUID;
BEGIN
    SELECT id INTO flower_id FROM public.categories WHERE name = 'Flower Plants';
    SELECT id INTO indoor_id FROM public.categories WHERE name = 'Indoor Plants';
    SELECT id INTO outdoor_id FROM public.categories WHERE name = 'Outdoor Plants';
    SELECT id INTO fruit_id FROM public.categories WHERE name = 'Fruit Plants';
    SELECT id INTO veg_id FROM public.categories WHERE name = 'Vegetable Plants';
    SELECT id INTO deco_id FROM public.categories WHERE name = 'Decorative Plants';

    INSERT INTO public.plants (name, category_id, price, availability, description, sunlight, watering, soil, care_instructions, image_url) VALUES
    ('Rose', flower_id, 80.00, 'Available', 'A classic romantic flower with beautiful red petals.', 'High', 'Daily', 'Well-drained', 'Prune regularly to encourage new growth.', 'https://images.unsplash.com/photo-1496062031456-07b8f162a322?w=500&q=80'),
    ('Jasmine', flower_id, 120.00, 'Available', 'Known for its fragrant white flowers, perfect for gardens.', 'High', 'Daily', 'Moist, well-drained', 'Needs support to climb.', 'https://images.unsplash.com/photo-1599824245657-3a116b47c617?w=500&q=80'),
    ('Money Plant', indoor_id, 100.00, 'Available', 'A popular indoor plant believed to bring prosperity.', 'Low to Medium', 'Weekly', 'Well-drained potting mix', 'Allow top soil to dry between waterings.', 'https://images.unsplash.com/photo-1621274403997-37aace184f49?w=500&q=80'),
    ('Hibiscus', flower_id, 150.00, 'Out of Stock', 'Tropical plant with large, colorful blooms.', 'High', 'Daily', 'Rich, well-drained', 'Protect from frost in winter.', 'https://images.unsplash.com/photo-1555541011-8e3e4a2d1d05?w=500&q=80'),
    ('Snake Plant', indoor_id, 200.00, 'Available', 'Hardy indoor plant that purifies the air.', 'Low', 'Rarely (every 2-3 weeks)', 'Sandy, well-drained', 'Do not overwater, prone to root rot.', 'https://images.unsplash.com/photo-1593482892290-f54927ae2b7e?w=500&q=80'),
    ('Lemon Tree', fruit_id, 350.00, 'Available', 'Produces fresh, juicy lemons. Great for sunny spots.', 'High', 'A few times a week', 'Citrus potting mix', 'Fertilize regularly during growing season.', 'https://images.unsplash.com/photo-1590494165264-1ebe3602eb80?w=500&q=80'),
    ('Aloe Vera', indoor_id, 90.00, 'Available', 'Succulent with medicinal properties.', 'Medium to High', 'Rarely', 'Cactus/Succulent mix', 'Keep in bright, indirect light.', 'https://images.unsplash.com/photo-1596547609652-9fc5d8d4285b?w=500&q=80'),
    ('Mango Tree (Alphonso)', fruit_id, 500.00, 'Out of Stock', 'The king of fruits! Needs space to grow.', 'High', 'Daily (when young)', 'Deep, well-drained', 'Protect from strong winds.', 'https://images.unsplash.com/photo-1601314117070-5573faec6bb2?w=500&q=80'),
    ('Tomato Plant', veg_id, 60.00, 'Available', 'Easy to grow vegetable plant for home gardens.', 'High', 'Daily', 'Rich, loamy', 'Provide support with stakes as it grows.', 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=500&q=80'),
    ('Areca Palm', deco_id, 250.00, 'Available', 'Excellent decorative palm that brings a tropical feel indoors.', 'Medium', 'A few times a week', 'Well-drained peat based', 'Mist leaves occasionally to increase humidity.', 'https://images.unsplash.com/photo-1600411833196-7c1f6b1a8b90?w=500&q=80'),
    ('Peace Lily', indoor_id, 180.00, 'Available', 'Beautiful indoor plant with white blooms, great for low light.', 'Low', 'Weekly', 'Moist, well-drained', 'Keep soil slightly moist but not soggy.', 'https://images.unsplash.com/photo-1593691509543-c20fb514074d?w=500&q=80'),
    ('Mint', veg_id, 40.00, 'Available', 'Fast-growing herb perfect for teas and cooking.', 'Medium', 'Daily', 'Moist', 'Best grown in pots to control spreading.', 'https://images.unsplash.com/photo-1628156108489-307a01dc02ba?w=500&q=80'),
    ('Bougainvillea', outdoor_id, 300.00, 'Available', 'Vibrant climbing plant with papery flowers.', 'High', 'A few times a week', 'Well-drained', 'Prune after flowering to maintain shape.', 'https://images.unsplash.com/photo-1595163651134-45371c4c1a4e?w=500&q=80'),
    ('Tulsi (Holy Basil)', outdoor_id, 50.00, 'Available', 'Sacred and medicinal plant common in Indian households.', 'High', 'Daily', 'Well-drained', 'Pinch off flowers to encourage leaf growth.', 'https://images.unsplash.com/photo-1613521140785-e85e427f8002?w=500&q=80'),
    ('Fiddle Leaf Fig', deco_id, 450.00, 'Out of Stock', 'Trendy large-leafed decorative plant.', 'Medium to High (Indirect)', 'Weekly', 'Well-drained potting soil', 'Wipe leaves with a damp cloth to keep them shiny.', 'https://images.unsplash.com/photo-1550522105-9a84a66e60b2?w=500&q=80');
END $$;

-- Enable Row Level Security
ALTER TABLE public.plants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (read-only)
CREATE POLICY "Allow public read access on plants" ON public.plants FOR SELECT USING (true);
CREATE POLICY "Allow public read access on categories" ON public.categories FOR SELECT USING (true);

-- Create policy for public to insert enquiries
CREATE POLICY "Allow public insert on enquiries" ON public.enquiries FOR INSERT WITH CHECK (true);

-- For admin access, ideally we would use Supabase Auth and check roles.
-- For the sake of this prototype working without complex auth setup, we'll allow all actions.
-- In a real production app, uncomment the following and replace with proper auth checks.
CREATE POLICY "Allow all on plants for authenticated users" ON public.plants FOR ALL USING (true);
CREATE POLICY "Allow all on categories for authenticated users" ON public.categories FOR ALL USING (true);
CREATE POLICY "Allow all on enquiries for authenticated users" ON public.enquiries FOR ALL USING (true);
