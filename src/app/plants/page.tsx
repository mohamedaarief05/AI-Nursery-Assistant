import { createClient } from '@/lib/supabase-server';
import { Plant, Category } from '@/lib/types';
import { FALLBACK_PLANTS, FALLBACK_CATEGORIES } from '@/lib/fallback-data';
import PlantsCatalogClient from './PlantsCatalogClient';

export const revalidate = 60;

export default async function PlantsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;

  const search = typeof params?.search === 'string' ? params.search.trim() : '';
  const categoryFilter = typeof params?.category === 'string' ? params.category : '';
  const availabilityFilter = typeof params?.availability === 'string' ? params.availability : '';
  const priceRange = typeof params?.price === 'string' ? params.price : '';
  const sunlightFilter = typeof params?.sunlight === 'string' ? params.sunlight : '';
  const wateringFilter = typeof params?.watering === 'string' ? params.watering : '';
  const sortBy = typeof params?.sort === 'string' ? params.sort : 'name-asc';

  let categories: Category[] = FALLBACK_CATEGORIES;
  let plants: Plant[] = FALLBACK_PLANTS;

  try {
    const supabase = await createClient();

    // Fetch all categories
    const { data: categoriesData, error: catError } = await supabase.from('categories').select('*').order('name');
    if (!catError && categoriesData && categoriesData.length > 0) {
      categories = categoriesData as Category[];
    }

    // Fetch all plants
    const { data: plantsData, error: plantError } = await supabase
      .from('plants')
      .select('*, categories(name)')
      .order('name');

    if (!plantError && plantsData && plantsData.length > 0) {
      plants = plantsData as Plant[];
    }
  } catch (err) {
    console.warn('Supabase fetch failed, utilizing verified nursery catalog fallback dataset.', err);
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
