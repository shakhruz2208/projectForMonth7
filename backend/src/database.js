import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.join(__dirname, '..', 'data.json');

const defaultData = {
  users: [],
  reviews: [],
  blog_posts: [],
  saved_trips: [],
  checklists: [],
  settings: [],
  itineraries: [],
};

class Database {
  constructor() {
    this.data = this.load();
  }

  load() {
    try {
      if (fs.existsSync(DB_PATH)) {
        return JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
      }
    } catch {}
    return { ...defaultData };
  }

  save() {
    fs.writeFileSync(DB_PATH, JSON.stringify(this.data, null, 2));
  }

  // Generic CRUD
  findAll(table, filter = null) {
    let items = this.data[table] || [];
    if (filter) items = items.filter(filter);
    return items;
  }

  findById(table, id) {
    return (this.data[table] || []).find(item => item.id === id);
  }

  findOne(table, predicate) {
    return (this.data[table] || []).find(predicate);
  }

  create(table, item) {
    const newItem = {
      id: Date.now() + Math.random(),
      ...item,
      created_at: new Date().toISOString(),
    };
    if (!this.data[table]) this.data[table] = [];
    this.data[table].push(newItem);
    this.save();
    return newItem;
  }

  update(table, id, updates) {
    const items = this.data[table] || [];
    const index = items.findIndex(item => item.id === id);
    if (index === -1) return null;
    items[index] = { ...items[index], ...updates, updated_at: new Date().toISOString() };
    this.save();
    return items[index];
  }

  delete(table, id) {
    const items = this.data[table] || [];
    const index = items.findIndex(item => item.id === id);
    if (index === -1) return false;
    items.splice(index, 1);
    this.save();
    return true;
  }

  deleteWhere(table, predicate) {
    const items = this.data[table] || [];
    const newItems = items.filter(item => !predicate(item));
    this.data[table] = newItems;
    this.save();
    return true;
  }

  count(table, filter = null) {
    let items = this.data[table] || [];
    if (filter) items = items.filter(filter);
    return items.length;
  }
}

const db = new Database();
export default db;
