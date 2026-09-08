import { createClient } from '@/lib/supabase-server';
import { Plant, Category } from '@/lib/types';
import PlantsCatalogClient from './PlantsCatalogClient';

export const revalidate = 60;

export default async function PlantsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const supabase = await createClient();
  const params = await searchParams;

  const search = typeof params?.search === 'string' ? params.search.trim() : '';
  const categoryFilter = typeof params?.category === 'string' ? params.category : '';
  const availabilityFilter = typeof params?.availability === 'string' ? params.availability : '';
  const priceRange = typeof params?.price === 'string' ? params.price : '';
  const sunlightFilter = typeof params?.sunlight === 'string' ? params.sunlight : '';
  const wateringFilter = typeof params?.watering === 'string' ? params.watering : '';
  const sortBy = typeof params?.sort === 'string' ? params.sort : 'name-asc';

  // Fetch all categories
  const { data: categoriesData } = await supabase.from('categories').select('*').order('name');
  const categories = (categoriesData as Category[]) || [];

  // Fetch all plants once
  const { data: plantsData, error } = await supabase
    .from('plants')
    .select('*, categories(name)')
    .order('name');

  const plants = (plantsData as Plant[]) || [];

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="bg-red-50 text-red-800 p-8 rounded-3xl border border-red-100 max-w-lg mx-auto">
          <h3 className="font-bold text-lg mb-1">Catalog Connection Note</h3>
          <p className="text-sm">Unable to fetch live database: {error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <PlantsCatalogClient
      initialPlants={plants}
      categories={categories}
      initialSearch={search}
      initialCategory={categoryFilter}
      initialAvailability={availabilityFilter}
      initialPrice={priceRange}
      initialSunlight={sunlightFilter}
      initialWatering={wateringFilter}
      initialSort={sortBy}
    />
  );
}
