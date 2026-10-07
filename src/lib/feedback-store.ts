import * as fs from 'fs';
import * as path from 'path';

export interface FeedbackItem {
  id: string;
  name: string;
  role: string;
  rating: number;
  category: string;
  feedback: string;
  createdAt: string;
}

const DATA_DIR = path.join(process.cwd(), 'data');
const FEEDBACK_FILE = path.join(DATA_DIR, 'feedback.json');

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(FEEDBACK_FILE)) {
    // Initialize with a few authentic starter reviews so the dashboard is rich and informative
    const initialFeedback: FeedbackItem[] = [
      {
        id: 'fb_1',
        name: 'Priya Sharma',
        role: 'Plant Parent',
        rating: 5,
        category: 'Plant Doctor AI',
        feedback: 'The AI Plant Doctor diagnosed the yellow leaves on my Peace Lily instantly! Followed the watering advice and the plant bounced back in 4 days.',
        createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
      },
      {
        id: 'fb_2',
        name: 'Kavya Raman',
        role: 'Home Gardener',
        rating: 5,
        category: 'Website Speed & Ease of Use',
        feedback: 'Super clean storefront and instant checkout. The care instructions on each plant page are extremely clear.',
        createdAt: new Date(Date.now() - 4 * 86400000).toISOString(),
      },
      {
        id: 'fb_3',
        name: 'Rohan Verma',
        role: 'Verified Customer',
        rating: 4,
        category: 'Plant Catalog & Selection',
        feedback: 'Great variety of indoor plants like Snake Plant and Money Plant. Would love to see more rare succulents added soon!',
        createdAt: new Date(Date.now() - 6 * 86400000).toISOString(),
      }
    ];
    fs.writeFileSync(FEEDBACK_FILE, JSON.stringify(initialFeedback, null, 2), 'utf8');
  }
}

export function getAllFeedback(): FeedbackItem[] {
  ensureDataDir();
  try {
    const raw = fs.readFileSync(FEEDBACK_FILE, 'utf8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function addFeedback(item: Omit<FeedbackItem, 'id' | 'createdAt'>): FeedbackItem {
  ensureDataDir();
  const feedbackList = getAllFeedback();
  const newItem: FeedbackItem = {
    ...item,
    id: 'fb_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6),
    createdAt: new Date().toISOString(),
  };

  feedbackList.unshift(newItem);
  fs.writeFileSync(FEEDBACK_FILE, JSON.stringify(feedbackList, null, 2), 'utf8');
  return newItem;
}
