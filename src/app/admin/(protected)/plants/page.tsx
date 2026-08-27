import { createClient } from '@/lib/supabase-server';
import { Plant } from '@/lib/types';
import PlantsClient from './PlantsClient';
import Link from 'next/link';

export const revalidate = 0;

export default async function AdminPlantsPage() {
  const supabase = await createClient();
  const { data } = await supabase.from('plants').select('*, categories(name)').order('name');
  const plants = (data as Plant[]) || [];

  const { data: categoriesData } = await supabase.from('categories').select('*').order('name');
  
  return (
    <div>
      <PlantsClient initialPlants={plants} categories={(categoriesData as any) || []} />
    </div>
  );
}
