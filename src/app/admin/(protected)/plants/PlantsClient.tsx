'use client';

import { useState } from 'react';
import { Plant, Category } from '@/lib/types';
import { Edit2, Trash2, Plus, X, Search, Check, AlertCircle, Sparkles } from 'lucide-react';
import { createClient } from '@/lib/supabase';
import { useToast } from '@/context/ToastContext';

export default function PlantsClient({ 
  initialPlants, 
  categories 
}: { 
  initialPlants: Plant[]; 
  categories: Category[]; 
}) {
  const [plants, setPlants] = useState<Plant[]>(initialPlants);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlant, setEditingPlant] = useState<Plant | null>(null);
  const [plantToDelete, setPlantToDelete] = useState<Plant | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { success, error: toastError } = useToast();
  
  // Comprehensive form state
  const [formData, setFormData] = useState({
    name: '',
    category_id: categories[0]?.id || '',
    price: 0,
    availability: 'Available' as 'Available' | 'Out of Stock',
    image_url: '',
    description: '',
    sunlight: 'Medium to High',
    watering: 'Weekly',
    soil: 'Well-drained potting mix',
    care_instructions: ''
  });

  const openAddModal = () => {
    setEditingPlant(null);
    setFormData({
      name: '',
      category_id: categories[0]?.id || '',
      price: 150,
      availability: 'Available',
      image_url: '',
      description: '',
      sunlight: 'Medium to High',
      watering: 'Weekly',
      soil: 'Well-drained potting mix',
      care_instructions: ''
    });
    setIsModalOpen(true);
  };

  const openEditModal = (plant: Plant) => {
    setEditingPlant(plant);
    setFormData({
      name: plant.name,
      category_id: plant.category_id,
      price: plant.price,
      availability: plant.availability,
      image_url: plant.image_url || '',
      description: plant.description || '',
      sunlight: plant.sunlight || 'Medium',
      watering: plant.watering || 'Weekly',
      soil: plant.soil || 'Well-drained potting mix',
      care_instructions: plant.care_instructions || ''
    });
    setIsModalOpen(true);
  };

  // Toggle availability with 1 click
  const toggleAvailability = async (plant: Plant) => {
    const newStatus = plant.availability === 'Available' ? 'Out of Stock' : 'Available';
    const previous = [...plants];
    setPlants(plants.map(p => p.id === plant.id ? { ...p, availability: newStatus } : p));

    const supabase = createClient();
    const { error } = await supabase
      .from('plants')
      .update({ availability: newStatus })
      .eq('id', plant.id);

    if (error) {
      toastError('Failed to update status: ' + error.message);
      setPlants(previous);
    } else {
      success(`${plant.name} marked as ${newStatus}`);
    }
  };

  const confirmDelete = async () => {
    if (!plantToDelete) return;
    const previous = [...plants];
    setPlants(plants.filter(p => p.id !== plantToDelete.id));

    const supabase = createClient();
    const { error } = await supabase.from('plants').delete().eq('id', plantToDelete.id);

    if (error) {
      toastError('Failed to delete plant: ' + error.message);
      setPlants(previous);
    } else {
      success(`Plant "${plantToDelete.name}" deleted successfully.`);
    }
    setPlantToDelete(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toastError('Plant name is required.');
      return;
    }
    setIsSubmitting(true);

    const supabase = createClient();

    if (editingPlant) {
      // Update existing
      const { data, error } = await supabase
        .from('plants')
        .update(formData)
        .eq('id', editingPlant.id)
        .select('*, categories(name)')
        .single();
        
      if (error) {
        toastError('Error updating plant: ' + error.message);
      } else if (data) {
        setPlants(plants.map(p => p.id === data.id ? data as Plant : p));
        success(`"${formData.name}" updated successfully!`);
        setIsModalOpen(false);
      }
    } else {
      // Insert new
      const { data, error } = await supabase
        .from('plants')
        .insert(formData)
        .select('*, categories(name)')
        .single();
        
      if (error) {
        toastError('Error adding plant: ' + error.message);
      } else if (data) {
        setPlants([...plants, data as Plant]);
        success(`"${formData.name}" added to nursery catalog!`);
        setIsModalOpen(false);
      }
    }

    setIsSubmitting(false);
  };

  // Filtered plants
  const filteredPlants = plants.filter((plant) => {
    const matchesCategory = !categoryFilter || plant.category_id === categoryFilter;
    const query = searchTerm.toLowerCase();
    const matchesSearch = 
      plant.name.toLowerCase().includes(query) ||
      plant.description?.toLowerCase().includes(query) ||
      plant.sunlight?.toLowerCase().includes(query) ||
      plant.watering?.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">Plant Inventory</h1>
          <p className="text-slate-500 text-sm mt-1">
            Manage your nursery catalog, update pricing, and modify care guides.
          </p>
        </div>
        <button 
          onClick={openAddModal}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 rounded-xl transition flex items-center font-bold text-sm shadow-md"
        >
          <Plus className="w-4 h-4 mr-2" /> Add New Plant
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col sm:flex-row gap-3 justify-between items-center">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Search plants by name, light, water..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Category:</span>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="">All Categories ({plants.length})</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-100 text-xs uppercase tracking-wider text-slate-500 font-bold">
                <th className="px-6 py-4">Plant & Image</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Care Specs</th>
                <th className="px-6 py-4">Availability</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredPlants.map((plant) => (
                <tr key={plant.id} className="hover:bg-slate-50/60 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden flex-shrink-0">
                        {plant.image_url ? (
                          <img src={plant.image_url} alt={plant.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs">No img</div>
                        )}
                      </div>
                      <div>
                        <span className="font-bold text-slate-800 block">{plant.name}</span>
                        <span className="text-xs text-slate-400 line-clamp-1 max-w-xs">{plant.description}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600 font-medium">
                    {plant.categories?.name || 'Unassigned'}
                  </td>
                  <td className="px-6 py-4 font-black text-slate-900">
                    ₹{plant.price}
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-500 space-y-0.5">
                    <div><strong className="text-slate-700">Light:</strong> {plant.sunlight}</div>
                    <div><strong className="text-slate-700">Water:</strong> {plant.watering}</div>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => toggleAvailability(plant)}
                      className={`px-3 py-1 rounded-full text-xs font-bold transition shadow-2xs ${
                        plant.availability === 'Available'
                          ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                          : 'bg-rose-100 text-rose-800 hover:bg-rose-200'
                      }`}
                      title="Click to toggle availability"
                    >
                      {plant.availability}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button 
                      onClick={() => openEditModal(plant)} 
                      className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition" 
                      title="Edit Plant"
                    >
                      <Edit2 className="w-4 h-4 inline" />
                    </button>
                    <button 
                      onClick={() => setPlantToDelete(plant)} 
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition" 
                      title="Delete Plant"
                    >
                      <Trash2 className="w-4 h-4 inline" />
                    </button>
                  </td>
                </tr>
              ))}

              {filteredPlants.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                    No plants found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95">
            <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-slate-50">
              <h3 className="text-xl font-black text-slate-800 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-600" />
                {editingPlant ? `Edit ${editingPlant.name}` : 'Add New Plant to Nursery'}
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-4 flex-grow">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Plant Name *
                  </label>
                  <input 
                    required 
                    type="text" 
                    value={formData.name} 
                    onChange={e => setFormData({ ...formData, name: e.target.value })} 
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white" 
                    placeholder="e.g. Fiddle Leaf Fig"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Category *
                  </label>
                  <select 
                    required 
                    value={formData.category_id} 
                    onChange={e => setFormData({ ...formData, category_id: e.target.value })} 
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                  >
                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Price (₹) *
                  </label>
                  <input 
                    required 
                    type="number" 
                    min="1" 
                    value={formData.price} 
                    onChange={e => setFormData({ ...formData, price: Number(e.target.value) })} 
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white" 
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Stock Availability *
                  </label>
                  <select 
                    value={formData.availability} 
                    onChange={e => setFormData({ ...formData, availability: e.target.value as any })} 
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                  >
                    <option value="Available">Available (In Stock)</option>
                    <option value="Out of Stock">Out of Stock</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Image URL (https://... or /plants/...)
                  </label>
                  <input 
                    type="text" 
                    value={formData.image_url} 
                    onChange={e => setFormData({ ...formData, image_url: e.target.value })} 
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white" 
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Sunlight Requirement *
                  </label>
                  <input 
                    required
                    type="text" 
                    value={formData.sunlight} 
                    onChange={e => setFormData({ ...formData, sunlight: e.target.value })} 
                    placeholder="e.g. Low to Medium, Direct High"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white" 
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Watering Schedule *
                  </label>
                  <input 
                    required
                    type="text" 
                    value={formData.watering} 
                    onChange={e => setFormData({ ...formData, watering: e.target.value })} 
                    placeholder="e.g. Weekly, Daily, Rarely"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white" 
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Soil Requirement
                  </label>
                  <input 
                    type="text" 
                    value={formData.soil} 
                    onChange={e => setFormData({ ...formData, soil: e.target.value })} 
                    placeholder="e.g. Rich loamy, Well-drained potting mix"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white" 
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Description
                  </label>
                  <textarea 
                    value={formData.description} 
                    onChange={e => setFormData({ ...formData, description: e.target.value })} 
                    rows={2} 
                    placeholder="Short summary of this plant..."
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white resize-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Care Instructions
                  </label>
                  <textarea 
                    value={formData.care_instructions} 
                    onChange={e => setFormData({ ...formData, care_instructions: e.target.value })} 
                    rows={2} 
                    placeholder="Step by step maintenance tips..."
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white resize-none"
                  />
                </div>
              </div>

              <div className="p-4 border-t border-slate-100 bg-slate-50 -mx-6 -mb-6 mt-6 flex justify-end gap-3">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)} 
                  className="px-5 py-2.5 font-semibold text-slate-600 hover:bg-slate-200 rounded-xl text-sm transition"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={isSubmitting} 
                  className="px-6 py-2.5 font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl text-sm transition shadow-md disabled:opacity-50"
                >
                  {isSubmitting ? 'Saving...' : editingPlant ? 'Update Plant' : 'Save New Plant'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {plantToDelete && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl shadow-2xl p-6 max-w-sm w-full text-center animate-in fade-in zoom-in-95">
            <div className="w-14 h-14 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-7 h-7" />
            </div>
            <h3 className="font-bold text-slate-800 text-lg mb-2">Delete Plant?</h3>
            <p className="text-sm text-slate-500 mb-6">
              Are you sure you want to permanently delete <strong>{plantToDelete.name}</strong> from your catalog?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setPlantToDelete(null)}
                className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-sm transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-sm transition shadow"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
