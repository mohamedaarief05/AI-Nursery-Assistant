import { createClient } from '@/lib/supabase-server';
import PlantCard from '@/components/PlantCard';
import { Search, Filter } from 'lucide-react';
import { Plant, Category } from '@/lib/types';

export const revalidate = 0; // Disable caching for this demo so changes appear immediately

export default async function PlantsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const supabase = await createClient();

  // Extract search params
  // Next 15 awaits searchParams, but we are in Next 14 here based on standard setups, wait Next 15 requires awaiting searchParams. I'll await it to be safe for modern Next.js
  const params = await searchParams;
  const search = typeof params?.search === 'string' ? params.search : '';
  const categoryFilter = typeof params?.category === 'string' ? params.category : '';
  const availabilityFilter = typeof params?.availability === 'string' ? params.availability : '';

  // Fetch categories
  const { data: categoriesData } = await supabase.from('categories').select('*').order('name');
  const categories = (categoriesData as Category[]) || [];

  // Fetch plants
  let query = supabase.from('plants').select('*, categories(name)').order('name');

  if (search) {
    query = query.ilike('name', `%${search}%`);
  }
  if (categoryFilter) {
    query = query.eq('category_id', categoryFilter);
  }
  if (availabilityFilter) {
    query = query.eq('availability', availabilityFilter);
  }

  const { data: plantsData, error } = await query;
  const plants = (plantsData as Plant[]) || [];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Our Plants</h1>
          <p className="text-slate-600">Browse our collection of beautiful plants for your home and garden.</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <aside className="w-full lg:w-64 flex-shrink-0">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 sticky top-24">
            <h2 className="font-bold text-lg mb-4 flex items-center">
              <Filter className="w-5 h-5 mr-2" /> Filters
            </h2>
            
            <form className="space-y-6">
              {/* Search */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Search</label>
                <div className="relative">
                  <input 
                    type="text" 
                    name="search"
                    defaultValue={search}
                    placeholder="Search plants..." 
                    className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
                <select 
                  name="category"
                  defaultValue={categoryFilter}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                >
                  <option value="">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              {/* Availability */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Availability</label>
                <select 
                  name="availability"
                  defaultValue={availabilityFilter}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                >
                  <option value="">All Statuses</option>
                  <option value="Available">Available</option>
                  <option value="Out of Stock">Out of Stock</option>
                </select>
              </div>

              <button 
                type="submit"
                className="w-full bg-green-100 text-green-800 font-medium py-2 rounded-lg hover:bg-green-200 transition"
              >
                Apply Filters
              </button>
            </form>
          </div>
        </aside>

        {/* Plant Grid */}
        <div className="flex-grow">
          {error ? (
             <div className="bg-red-50 text-red-800 p-6 rounded-xl border border-red-100">
               <p>Error loading plants: {error.message}</p>
             </div>
          ) : plants.length === 0 ? (
            <div className="bg-white text-center p-12 rounded-2xl border border-slate-100">
              <span className="text-4xl block mb-4">🏜️</span>
              <h3 className="text-xl font-bold text-slate-800 mb-2">No plants found</h3>
              <p className="text-slate-600">Try adjusting your filters or searching for something else.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {plants.map((plant) => (
                <PlantCard key={plant.id} plant={plant} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
