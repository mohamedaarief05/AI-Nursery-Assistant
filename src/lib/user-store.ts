import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';

export interface StoredUser {
  id: string;
  email: string;
  passwordHash: string;
  salt: string;
  fullName?: string;
  createdAt: string;
}

const DATA_DIR = path.join(process.cwd(), 'data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(USERS_FILE)) {
    fs.writeFileSync(USERS_FILE, JSON.stringify([]), 'utf8');
  }
}

function hashPassword(password: string, salt: string): string {
  return crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha256').toString('hex');
}

export function getAllUsers(): StoredUser[] {
  ensureDataDir();
  try {
    const raw = fs.readFileSync(USERS_FILE, 'utf8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function findUserByEmail(email: string): StoredUser | undefined {
  const users = getAllUsers();
  const normalized = email.trim().toLowerCase();
  return users.find(u => u.email.toLowerCase() === normalized);
}

export function saveUser(email: string, password: string, fullName?: string): { success: boolean; user?: StoredUser; error?: string } {
  const normalized = email.trim().toLowerCase();
  const existing = findUserByEmail(normalized);
  if (existing) {
    return { success: false, error: 'An account with this email already exists. Please sign in with your password.' };
  }

  const salt = crypto.randomBytes(16).toString('hex');
  const passwordHash = hashPassword(password, salt);

  const newUser: StoredUser = {
    id: 'user_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7),
    email: normalized,
    passwordHash,
    salt,
    fullName: fullName || normalized.split('@')[0],
    createdAt: new Date().toISOString(),
  };

  const users = getAllUsers();
  users.push(newUser);
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), 'utf8');

  return { success: true, user: newUser };
}

export function verifyUserPassword(email: string, password: string): { success: boolean; error?: string; user?: StoredUser } {
  const normalized = email.trim().toLowerCase();
  const user = findUserByEmail(normalized);
  if (!user) {
    return { success: false, error: 'No account found with this email. Please click Create a new account below.' };
  }

  const computedHash = hashPassword(password, user.salt);
  if (computedHash !== user.passwordHash) {
    return { success: false, error: 'Incorrect password. Please try again or click Forgot password.' };
  }

  return { success: true, user };
}

export function updateUserPassword(email: string, newPassword: string): boolean {
  const normalized = email.trim().toLowerCase();
  const users = getAllUsers();
  const index = users.findIndex(u => u.email.toLowerCase() === normalized);
  if (index === -1) return false;

  const salt = crypto.randomBytes(16).toString('hex');
  users[index].salt = salt;
  users[index].passwordHash = hashPassword(newPassword, salt);
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), 'utf8');
  return true;
}

export function deleteAllCustomerLogins(): void {
  ensureDataDir();
  fs.writeFileSync(USERS_FILE, JSON.stringify([], null, 2), 'utf8');
}
