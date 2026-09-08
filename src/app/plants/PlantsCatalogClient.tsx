'use client';

import { useState, useMemo, useEffect } from 'react';
import { Plant, Category } from '@/lib/types';
import PlantCard from '@/components/PlantCard';
import { Search, RotateCcw, SlidersHorizontal, Zap, Check } from 'lucide-react';
import Link from 'next/link';

interface PlantsCatalogClientProps {
  initialPlants: Plant[];
  categories: Category[];
  initialSearch?: string;
  initialCategory?: string;
  initialAvailability?: string;
  initialPrice?: string;
  initialSunlight?: string;
  initialWatering?: string;
  initialSort?: string;
}

export default function PlantsCatalogClient({
  initialPlants,
  categories,
  initialSearch = '',
  initialCategory = '',
  initialAvailability = '',
  initialPrice = '',
  initialSunlight = '',
  initialWatering = '',
  initialSort = 'name-asc',
}: PlantsCatalogClientProps) {
  const [search, setSearch] = useState(initialSearch);
  const [categoryFilter, setCategoryFilter] = useState(initialCategory);
  const [availabilityFilter, setAvailabilityFilter] = useState(initialAvailability);
  const [priceRange, setPriceRange] = useState(initialPrice);
  const [sunlightFilter, setSunlightFilter] = useState(initialSunlight);
  const [wateringFilter, setWateringFilter] = useState(initialWatering);
  const [sortBy, setSortBy] = useState(initialSort);

  // Sync state to URL search params without triggering full page reloads
  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (categoryFilter) params.set('category', categoryFilter);
    if (availabilityFilter) params.set('availability', availabilityFilter);
    if (priceRange) params.set('price', priceRange);
    if (sunlightFilter) params.set('sunlight', sunlightFilter);
    if (wateringFilter) params.set('watering', wateringFilter);
    if (sortBy && sortBy !== 'name-asc') params.set('sort', sortBy);

    const newUrl = params.toString() ? `/plants?${params.toString()}` : '/plants';
    window.history.replaceState(null, '', newUrl);
  }, [search, categoryFilter, availabilityFilter, priceRange, sunlightFilter, wateringFilter, sortBy]);

  // Real-time instant filtering & sorting on client (0ms delay)
  const filteredPlants = useMemo(() => {
    let result = [...initialPlants];

    // Search filter
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.description && p.description.toLowerCase().includes(q)) ||
          (p.categories?.name && p.categories.name.toLowerCase().includes(q))
      );
    }

    // Category filter
    if (categoryFilter) {
      result = result.filter((p) => String(p.category_id) === String(categoryFilter));
    }

    // Availability filter
    if (availabilityFilter) {
      result = result.filter((p) => p.availability === availabilityFilter);
    }

    // Sunlight filter
    if (sunlightFilter) {
      result = result.filter((p) => p.sunlight?.toLowerCase().includes(sunlightFilter.toLowerCase()));
    }

    // Watering filter
    if (wateringFilter) {
      result = result.filter((p) => p.watering?.toLowerCase().includes(wateringFilter.toLowerCase()));
    }

    // Price range filter
    if (priceRange === 'under-100') {
      result = result.filter((p) => p.price < 100);
    } else if (priceRange === '100-250') {
      result = result.filter((p) => p.price >= 100 && p.price <= 250);
    } else if (priceRange === '250-500') {
      result = result.filter((p) => p.price >= 250 && p.price <= 500);
    } else if (priceRange === 'above-500') {
      result = result.filter((p) => p.price > 500);
    }

    // Sorting
    result.sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'name-desc') return b.name.localeCompare(a.name);
      return a.name.localeCompare(b.name);
    });

    return result;
  }, [initialPlants, search, categoryFilter, availabilityFilter, priceRange, sunlightFilter, wateringFilter, sortBy]);

  const hasActiveFilters = Boolean(
    search || categoryFilter || availabilityFilter || priceRange || sunlightFilter || wateringFilter || (sortBy && sortBy !== 'name-asc')
  );

  const handleResetFilters = () => {
    setSearch('');
    setCategoryFilter('');
    setAvailabilityFilter('');
    setPriceRange('');
    setSunlightFilter('');
    setWateringFilter('');
    setSortBy('name-asc');
  };

  return (
    <div className="container mx-auto px-4 py-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4 border-b border-slate-100 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-green-700 text-xs font-extrabold uppercase tracking-wider bg-green-50 px-3 py-1 rounded-full border border-green-200">
              Nursery Catalog
            </span>
            <span className="text-emerald-800 text-[11px] font-bold bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
              <Zap className="w-3 h-3 text-emerald-600 fill-emerald-500" /> Instant Filters Active
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-800 tracking-tight">
            Our Plant Collection
          </h1>
          <p className="text-slate-600 text-sm sm:text-base mt-1">
            Showing <strong className="text-green-800">{filteredPlants.length}</strong> of {initialPlants.length} plants available from our nursery database.
          </p>
        </div>

        {hasActiveFilters && (
          <button
            onClick={handleResetFilters}
            className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-red-600 bg-slate-100 hover:bg-red-50 px-3 py-2 rounded-xl transition cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset All Filters
          </button>
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
                <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1">
                  <Check className="w-3 h-3 text-emerald-600" /> Instant
                </span>
              )}
            </div>

            <div className="space-y-4">
              {/* Search */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Search
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search plant name..."
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition"
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
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-slate-50 focus:bg-white transition"
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
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-slate-50 focus:bg-white transition"
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
                  value={sunlightFilter}
                  onChange={(e) => setSunlightFilter(e.target.value)}
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-slate-50 focus:bg-white transition"
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
                  value={wateringFilter}
                  onChange={(e) => setWateringFilter(e.target.value)}
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-slate-50 focus:bg-white transition"
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
                  value={availabilityFilter}
                  onChange={(e) => setAvailabilityFilter(e.target.value)}
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-slate-50 focus:bg-white transition"
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
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-slate-50 focus:bg-white transition"
                >
                  <option value="name-asc">Name (A to Z)</option>
                  <option value="name-desc">Name (Z to A)</option>
                  <option value="price-asc">Price (Low to High)</option>
                  <option value="price-desc">Price (High to Low)</option>
                </select>
              </div>

              {hasActiveFilters && (
                <div className="pt-2">
                  <button
                    onClick={handleResetFilters}
                    className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 rounded-xl transition text-xs flex items-center justify-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Clear Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </aside>

        {/* Plant Cards Grid */}
        <div className="flex-grow">
          {filteredPlants.length === 0 ? (
            <div className="bg-white text-center py-16 px-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center">
              <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center text-4xl mb-4">
                🔍
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">No matching plants found</h3>
              <p className="text-slate-500 text-sm max-w-md mb-6 leading-relaxed">
                We couldn't find any plants matching your filter criteria. Try broadening your search or resetting filters.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm rounded-xl transition cursor-pointer"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredPlants.map((plant) => (
                <PlantCard key={plant.id} plant={plant} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
