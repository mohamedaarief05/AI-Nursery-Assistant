import { createClient } from '@/lib/supabase-server';
import PlantCard from '@/components/PlantCard';
import { Search, Filter, RotateCcw, SlidersHorizontal } from 'lucide-react';
import { Plant, Category } from '@/lib/types';
import Link from 'next/link';

export const revalidate = 0;

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

  // Fetch categories for dropdown
  const { data: categoriesData } = await supabase.from('categories').select('*').order('name');
  const categories = (categoriesData as Category[]) || [];

  // Build query
  let query = supabase.from('plants').select('*, categories(name)');

  const sanitizedSearch = search.replace(/[,()]/g, '').trim();
  if (sanitizedSearch) {
    query = query.or(`name.ilike.%${sanitizedSearch}%,description.ilike.%${sanitizedSearch}%`);
  }
  if (categoryFilter) {
    query = query.eq('category_id', categoryFilter);
  }
  if (availabilityFilter) {
    query = query.eq('availability', availabilityFilter);
  }
  if (sunlightFilter) {
    query = query.ilike('sunlight', `%${sunlightFilter}%`);
  }
  if (wateringFilter) {
    query = query.ilike('watering', `%${wateringFilter}%`);
  }

  // Price range filters
  if (priceRange === 'under-100') {
    query = query.lte('price', 100);
  } else if (priceRange === '100-250') {
    query = query.gte('price', 100).lte('price', 250);
  } else if (priceRange === '250-500') {
    query = query.gte('price', 250).lte('price', 500);
  } else if (priceRange === 'above-500') {
    query = query.gte('price', 500);
  }

  // Sorting
  if (sortBy === 'price-asc') {
    query = query.order('price', { ascending: true });
  } else if (sortBy === 'price-desc') {
    query = query.order('price', { ascending: false });
  } else if (sortBy === 'name-desc') {
    query = query.order('name', { ascending: false });
  } else {
    query = query.order('name', { ascending: true });
  }

  const { data: plantsData, error } = await query;
  const plants = (plantsData as Plant[]) || [];

  const hasActiveFilters = Boolean(
    search || categoryFilter || availabilityFilter || priceRange || sunlightFilter || wateringFilter || (sortBy && sortBy !== 'name-asc')
  );

  return (
    <div className="container mx-auto px-4 py-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4 border-b border-slate-100 pb-6">
        <div>
          <span className="text-green-700 text-xs font-extrabold uppercase tracking-wider bg-green-50 px-3 py-1 rounded-full border border-green-200">
            Nursery Catalog
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-800 mt-2 mb-1 tracking-tight">
            Our Plant Collection
          </h1>
          <p className="text-slate-600 text-sm sm:text-base">
            Showing <strong className="text-green-800">{plants.length}</strong> plants available from our nursery database.
          </p>
        </div>

        {hasActiveFilters && (
          <Link
            href="/plants"
            className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-red-600 bg-slate-100 hover:bg-red-50 px-3 py-2 rounded-xl transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset All Filters
          </Link>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <aside className="w-full lg:w-72 flex-shrink-0">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm sticky top-24">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold text-base text-slate-800 flex items-center">
                <SlidersHorizontal className="w-4 h-4 mr-2 text-green-600" /> Filter Catalog
              </h2>
              {hasActiveFilters && (
                <span className="text-[10px] bg-green-100 text-green-800 px-2 py-0.5 rounded-full font-bold">
                  Active
                </span>
              )}
            </div>
            
            <form method="GET" action="/plants" className="space-y-4">
              {/* Search */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Search
                </label>
                <div className="relative">
                  <input 
                    type="text" 
                    name="search"
                    defaultValue={search}
                    placeholder="Plant name or type..." 
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white"
                  />
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Category
                </label>
                <select 
                  name="category"
                  defaultValue={categoryFilter}
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-slate-50 focus:bg-white"
                >
                  <option value="">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Price Range
                </label>
                <select 
                  name="price"
                  defaultValue={priceRange}
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-slate-50 focus:bg-white"
                >
                  <option value="">Any Price</option>
                  <option value="under-100">Under ₹100</option>
                  <option value="100-250">₹100 - ₹250</option>
                  <option value="250-500">₹250 - ₹500</option>
                  <option value="above-500">Above ₹500</option>
                </select>
              </div>

              {/* Sunlight Requirement */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Sunlight
                </label>
                <select 
                  name="sunlight"
                  defaultValue={sunlightFilter}
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-slate-50 focus:bg-white"
                >
                  <option value="">Any Light Level</option>
                  <option value="Low">Low Light (Indoor friendly)</option>
                  <option value="Medium">Medium Light</option>
                  <option value="High">High / Direct Sunlight</option>
                </select>
              </div>

              {/* Watering */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Watering Needs
                </label>
                <select 
                  name="watering"
                  defaultValue={wateringFilter}
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-slate-50 focus:bg-white"
                >
                  <option value="">Any Schedule</option>
                  <option value="Daily">Daily</option>
                  <option value="few times">Few times a week</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Rarely">Rarely (Low maintenance)</option>
                </select>
              </div>

              {/* Availability */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Availability
                </label>
                <select 
                  name="availability"
                  defaultValue={availabilityFilter}
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-slate-50 focus:bg-white"
                >
                  <option value="">All Statuses</option>
                  <option value="Available">In Stock Only</option>
                  <option value="Out of Stock">Out of Stock</option>
                </select>
              </div>

              {/* Sort Order */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Sort By
                </label>
                <select 
                  name="sort"
                  defaultValue={sortBy}
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-slate-50 focus:bg-white"
                >
                  <option value="name-asc">Name (A to Z)</option>
                  <option value="name-desc">Name (Z to A)</option>
                  <option value="price-asc">Price (Low to High)</option>
                  <option value="price-desc">Price (High to Low)</option>
                </select>
              </div>

              <div className="pt-2">
                <button 
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl transition shadow-sm text-sm"
                >
                  Apply Filters
                </button>
              </div>
            </form>
          </div>
        </aside>

        {/* Plant Cards Grid */}
        <div className="flex-grow">
          {error ? (
            <div className="bg-red-50 text-red-800 p-8 rounded-3xl border border-red-100">
              <h3 className="font-bold text-lg mb-1">Database Error</h3>
              <p className="text-sm">Unable to load plants: {error.message}</p>
            </div>
          ) : plants.length === 0 ? (
            <div className="bg-white text-center py-16 px-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center">
              <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center text-4xl mb-4">
                🔍
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">No matching plants found</h3>
              <p className="text-slate-500 text-sm max-w-md mb-6 leading-relaxed">
                We couldn't find any plants matching your current filter criteria. Try broadening your search or resetting filters.
              </p>
              <Link
                href="/plants"
                className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm rounded-xl transition"
              >
                Clear All Filters
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
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
