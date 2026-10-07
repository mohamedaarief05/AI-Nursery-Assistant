import { Plant, Category } from './types';

export const LOCAL_PLANT_IMAGES: Record<string, string> = {
  'rose': '/plants/rose.jpg',
  'jasmine': '/plants/jasmine.jpg',
  'money plant': '/plants/money-plant.jpg',
  'snake plant': '/plants/snake-plant.jpg',
  'peace lily': '/plants/peace-lily.jpg',
  'aloe vera': '/plants/aloe-vera.jpg',
  'areca palm': '/plants/areca-palm.jpg',
  'tulsi': '/plants/tulsi-holy-basil.jpg',
  'tulsi (holy basil)': '/plants/tulsi-holy-basil.jpg',
  'bougainvillea': '/plants/bougainvillea.jpg',
  'lemon tree': '/plants/lemon-tree.jpg',
  'mango tree': '/plants/mango-tree-alphonso.jpg',
  'mango tree (alphonso)': '/plants/mango-tree-alphonso.jpg',
  'tomato plant': '/plants/tomato-plant.jpg',
  'mint': '/plants/mint.jpg',
  'mint (pudina)': '/plants/mint.jpg',
  'hibiscus': '/plants/hibiscus.jpg',
  'fiddle leaf fig': '/plants/fiddle-leaf-fig.jpg'
};

export function getPlantImageUrl(name?: string, existingUrl?: string): string {
  if (name) {
    const key = name.trim().toLowerCase();
    if (LOCAL_PLANT_IMAGES[key]) {
      return LOCAL_PLANT_IMAGES[key];
    }
    // Try fuzzy match on normalized key
    const normalized = key.replace(/[^a-z0-9]/g, '');
    for (const [k, url] of Object.entries(LOCAL_PLANT_IMAGES)) {
      if (k.replace(/[^a-z0-9]/g, '') === normalized) {
        return url;
      }
    }
  }
  if (existingUrl && existingUrl.startsWith('/plants/')) {
    return existingUrl;
  }
  return existingUrl || '/plants/rose.jpg';
}

export const FALLBACK_CATEGORIES: Category[] = [
  { id: 'cat-flower', name: 'Flower Plants' },
  { id: 'cat-indoor', name: 'Indoor Plants' },
  { id: 'cat-outdoor', name: 'Outdoor Plants' },
  { id: 'cat-fruit', name: 'Fruit Plants' },
  { id: 'cat-veg', name: 'Vegetable Plants' },
  { id: 'cat-deco', name: 'Decorative Plants' }
];

export const FALLBACK_PLANTS: Plant[] = [
  {
    id: 'plant-rose',
    name: 'Rose',
    category_id: 'cat-flower',
    price: 80.00,
    availability: 'Available',
    description: 'A classic romantic flower with beautiful fragrant petals.',
    sunlight: 'High (Direct Sunlight)',
    watering: 'Daily',
    soil: 'Well-drained loamy soil',
    care_instructions: 'Prune regularly to encourage new growth and remove wilted blossoms.',
    image_url: '/plants/rose.jpg',
    categories: { name: 'Flower Plants' }
  },
  {
    id: 'plant-jasmine',
    name: 'Jasmine',
    category_id: 'cat-flower',
    price: 120.00,
    availability: 'Available',
    description: 'Known for its intensely fragrant white flowers, perfect for home gardens and balconies.',
    sunlight: 'High (Direct Sunlight)',
    watering: 'Daily',
    soil: 'Moist, well-drained rich soil',
    care_instructions: 'Needs support to climb. Feed with balanced organic fertilizer monthly.',
    image_url: '/plants/jasmine.jpg',
    categories: { name: 'Flower Plants' }
  },
  {
    id: 'plant-money-plant',
    name: 'Money Plant',
    category_id: 'cat-indoor',
    price: 100.00,
    availability: 'Available',
    description: 'A popular indoor plant believed to bring prosperity, easy to care for.',
    sunlight: 'Low to Medium (Indirect)',
    watering: 'Weekly',
    soil: 'Well-drained potting mix',
    care_instructions: 'Allow top soil to dry between waterings. Can grow in soil or water jars.',
    image_url: '/plants/money-plant.jpg',
    categories: { name: 'Indoor Plants' }
  },
  {
    id: 'plant-snake-plant',
    name: 'Snake Plant',
    category_id: 'cat-indoor',
    price: 200.00,
    availability: 'Available',
    description: 'Hardy air-purifying indoor plant that thrives on minimal care.',
    sunlight: 'Low (Tolerates shade)',
    watering: 'Rarely (every 2-3 weeks)',
    soil: 'Sandy, well-drained mix',
    care_instructions: 'Do not overwater. Allow soil to dry out completely between waterings.',
    image_url: '/plants/snake-plant.jpg',
    categories: { name: 'Indoor Plants' }
  },
  {
    id: 'plant-peace-lily',
    name: 'Peace Lily',
    category_id: 'cat-indoor',
    price: 180.00,
    availability: 'Available',
    description: 'Elegant indoor plant with striking white blooms that filters indoor air toxins.',
    sunlight: 'Low to Medium (Indirect)',
    watering: 'Weekly (when soil feels dry)',
    soil: 'Moist, rich, well-drained potting mix',
    care_instructions: 'Keep soil slightly moist but not waterlogged. Wipe leaves to remove dust.',
    image_url: '/plants/peace-lily.jpg',
    categories: { name: 'Indoor Plants' }
  },
  {
    id: 'plant-aloe-vera',
    name: 'Aloe Vera',
    category_id: 'cat-indoor',
    price: 90.00,
    availability: 'Available',
    description: 'Succulent with soothing gel and natural air purification qualities.',
    sunlight: 'Medium to High (Bright Light)',
    watering: 'Rarely (every 2 weeks)',
    soil: 'Cactus & succulent mix',
    care_instructions: 'Requires well-draining pot with drainage holes. Avoid standing water.',
    image_url: '/plants/aloe-vera.jpg',
    categories: { name: 'Indoor Plants' }
  },
  {
    id: 'plant-areca-palm',
    name: 'Areca Palm',
    category_id: 'cat-deco',
    price: 250.00,
    availability: 'Available',
    description: 'Tropical feathered palm that adds beauty and freshness to living rooms and offices.',
    sunlight: 'Medium (Bright Indirect)',
    watering: '2-3 times a week',
    soil: 'Rich, peat-based potting soil',
    care_instructions: 'Mist leaves occasionally to boost humidity and prevent brown leaf tips.',
    image_url: '/plants/areca-palm.jpg',
    categories: { name: 'Decorative Plants' }
  },
  {
    id: 'plant-tulsi',
    name: 'Tulsi (Holy Basil)',
    category_id: 'cat-outdoor',
    price: 50.00,
    availability: 'Available',
    description: 'Sacred medicinal plant widely revered for wellness teas and immunity.',
    sunlight: 'High (Direct Sunlight)',
    watering: 'Daily',
    soil: 'Fertile, well-drained loamy soil',
    care_instructions: 'Pinch flower tops to promote lush bushy leaf growth.',
    image_url: '/plants/tulsi-holy-basil.jpg',
    categories: { name: 'Outdoor Plants' }
  },
  {
    id: 'plant-bougainvillea',
    name: 'Bougainvillea',
    category_id: 'cat-outdoor',
    price: 300.00,
    availability: 'Available',
    description: 'Vibrant outdoor climbing plant with stunning pink, red, and purple bracts.',
    sunlight: 'High (Full Sun 6+ hours)',
    watering: 'A few times a week',
    soil: 'Well-drained sandy loam',
    care_instructions: 'Thrives in direct sun with moderate watering. Prune post-bloom.',
    image_url: '/plants/bougainvillea.jpg',
    categories: { name: 'Outdoor Plants' }
  },
  {
    id: 'plant-lemon-tree',
    name: 'Lemon Tree',
    category_id: 'cat-fruit',
    price: 350.00,
    availability: 'Available',
    description: 'Produces fresh aromatic lemons. Ideal for sunny terrace gardens and yards.',
    sunlight: 'High (Full Direct Sun)',
    watering: 'A few times a week',
    soil: 'Slightly acidic citrus soil mix',
    care_instructions: 'Feed with citrus fertilizer in spring. Water deeply when topsoil dries.',
    image_url: '/plants/lemon-tree.jpg',
    categories: { name: 'Fruit Plants' }
  },
  {
    id: 'plant-tomato',
    name: 'Tomato Plant',
    category_id: 'cat-veg',
    price: 60.00,
    availability: 'Available',
    description: 'High-yield kitchen garden plant producing sweet, juicy homegrown tomatoes.',
    sunlight: 'High (Direct Sunlight)',
    watering: 'Daily',
    soil: 'Rich, compost-rich soil',
    care_instructions: 'Provide staking or trellis support as fruit branches develop.',
    image_url: '/plants/tomato-plant.jpg',
    categories: { name: 'Vegetable Plants' }
  },
  {
    id: 'plant-mint',
    name: 'Mint (Pudina)',
    category_id: 'cat-veg',
    price: 40.00,
    availability: 'Available',
    description: 'Fast-growing fresh aromatic herb essential for chutneys, drinks, and cooking.',
    sunlight: 'Medium to High',
    watering: 'Daily (keep moist)',
    soil: 'Moist, organic-rich soil',
    care_instructions: 'Grow in pots to control roots and trim stems regularly for fresh growth.',
    image_url: '/plants/mint.jpg',
    categories: { name: 'Vegetable Plants' }
  },
  {
    id: 'plant-hibiscus',
    name: 'Hibiscus',
    category_id: 'cat-flower',
    price: 150.00,
    availability: 'Out of Stock',
    description: 'Tropical perennial with massive vibrant blooms popular in traditional gardens.',
    sunlight: 'High (Direct Sunlight)',
    watering: 'Daily',
    soil: 'Rich, well-draining soil',
    care_instructions: 'Protect from heavy frosts and fertilize with high-potassium plant food.',
    image_url: '/plants/hibiscus.jpg',
    categories: { name: 'Flower Plants' }
  },
  {
    id: 'plant-fiddle-leaf',
    name: 'Fiddle Leaf Fig',
    category_id: 'cat-deco',
    price: 450.00,
    availability: 'Out of Stock',
    description: 'Sculptural indoor tree with broad violin-shaped leaves for statement spaces.',
    sunlight: 'Medium to High (Bright Indirect)',
    watering: 'Weekly',
    soil: 'Well-draining indoor potting mix',
    care_instructions: 'Keep away from AC drafts and wipe large leaves periodically.',
    image_url: '/plants/fiddle-leaf-fig.jpg',
    categories: { name: 'Decorative Plants' }
  }
];
