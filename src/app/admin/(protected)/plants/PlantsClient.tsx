'use client';

import { useState } from 'react';
import { Plant, Category } from '@/lib/types';
import { Edit2, Trash2, Plus, X, Upload } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function PlantsClient({ initialPlants, categories }: { initialPlants: Plant[], categories: Category[] }) {
  const [plants, setPlants] = useState<Plant[]>(initialPlants);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlant, setEditingPlant] = useState<Plant | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    category_id: categories[0]?.id || '',
    price: 0,
    availability: 'Available',
    image_url: '',
    description: '',
    care_instructions: ''
  });

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this plant?')) return;
    
    setPlants(plants.filter(p => p.id !== id)); // Optimistic update
    
    const { error } = await supabase.from('plants').delete().eq('id', id);
    if (error) {
      alert('Failed to delete: ' + error.message);
      setPlants(plants); // Revert
    }
  };

  const openAddModal = () => {
    setEditingPlant(null);
    setFormData({
      name: '',
      category_id: categories[0]?.id || '',
      price: 0,
      availability: 'Available',
      image_url: '',
      description: '',
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
      care_instructions: plant.care_instructions || ''
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (editingPlant) {
      // Update
      const { data, error } = await supabase
        .from('plants')
        .update(formData)
        .eq('id', editingPlant.id)
        .select('*, categories(name)')
        .single();
        
      if (error) alert('Error updating: ' + error.message);
      else if (data) setPlants(plants.map(p => p.id === data.id ? data as Plant : p));
    } else {
      // Insert
      const { data, error } = await supabase
        .from('plants')
        .insert(formData)
        .select('*, categories(name)')
        .single();
        
      if (error) alert('Error adding: ' + error.message);
      else if (data) setPlants([...plants, data as Plant]);
    }

    setIsSubmitting(false);
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Manage Plants</h1>
        <button 
          onClick={openAddModal}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition flex items-center font-medium"
        >
          <Plus className="w-5 h-5 mr-2" /> Add New Plant
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 font-semibold text-slate-600 text-sm uppercase tracking-wider">Plant</th>
                <th className="px-6 py-4 font-semibold text-slate-600 text-sm uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 font-semibold text-slate-600 text-sm uppercase tracking-wider">Price</th>
                <th className="px-6 py-4 font-semibold text-slate-600 text-sm uppercase tracking-wider">Availability</th>
                <th className="px-6 py-4 font-semibold text-slate-600 text-sm uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {plants.map((plant) => (
                <tr key={plant.id} className="hover:bg-slate-50 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-lg bg-slate-200 overflow-hidden mr-3">
                        {plant.image_url ? (
                          <img src={plant.image_url} alt={plant.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs">No img</div>
                        )}
                      </div>
                      <span className="font-semibold text-slate-800">{plant.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{plant.categories?.name}</td>
                  <td className="px-6 py-4 font-medium text-slate-800">₹{plant.price}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      plant.availability === 'Available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {plant.availability}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => openEditModal(plant)} className="text-slate-400 hover:text-blue-600 transition mr-3" title="Edit">
                      <Edit2 className="w-5 h-5 inline" />
                    </button>
                    <button onClick={() => handleDelete(plant.id)} className="text-slate-400 hover:text-red-600 transition" title="Delete">
                      <Trash2 className="w-5 h-5 inline" />
                    </button>
                  </td>
                </tr>
              ))}
              {plants.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                    No plants found. Add some to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Add/Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center p-6 border-b border-slate-100">
              <h3 className="text-xl font-bold text-slate-800">
                {editingPlant ? 'Edit Plant' : 'Add New Plant'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="overflow-y-auto p-6 flex-grow">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Plant Name</label>
                  <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
                  <select required value={formData.category_id} onChange={e => setFormData({...formData, category_id: e.target.value})} className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none">
                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Price (₹)</label>
                  <input required type="number" min="0" value={formData.price} onChange={e => setFormData({...formData, price: Number(e.target.value)})} className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Availability</label>
                  <select value={formData.availability} onChange={e => setFormData({...formData, availability: e.target.value})} className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none">
                    <option value="Available">Available</option>
                    <option value="Out of Stock">Out of Stock</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-2">Image URL (e.g., /plants/rose.jpg)</label>
                  <input type="text" value={formData.image_url} onChange={e => setFormData({...formData, image_url: e.target.value})} className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
                  <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none" rows={3}></textarea>
                </div>
              </div>
            </form>
            
            <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
              <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 font-medium text-slate-600 hover:bg-slate-200 rounded-lg transition">
                Cancel
              </button>
              <button onClick={handleSubmit} disabled={isSubmitting} className="px-4 py-2 font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition disabled:opacity-50">
                {isSubmitting ? 'Saving...' : 'Save Plant'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
