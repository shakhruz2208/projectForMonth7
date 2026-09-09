import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../database.js';

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const existing = db.findOne('users', u => u.email === email);
    if (existing) return res.status(409).json({ error: 'Email already registered.' });

    const hash = await bcrypt.hash(password, 10);
    const user = db.create('users', { name, email, password: hash, avatar: '👤', role: 'user' });
    db.create('settings', { user_id: user.id, theme: 'dark', language: 'uz', notifications: 1, compact_mode: 0 });

    const token = generateToken(user.id);
    const { password: _, ...userWithoutPassword } = user;
    res.status(201).json({ message: 'Registered.', token, user: userWithoutPassword });
  } catch (error) { next(error); }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = db.findOne('users', u => u.email === email);
    if (!user) return res.status(401).json({ error: 'Invalid credentials.' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials.' });

    const token = generateToken(user.id);
    const { password: _, ...userWithoutPassword } = user;
    res.json({ message: 'Login successful.', token, user: userWithoutPassword });
  } catch (error) { next(error); }
};

export const getProfile = (req, res) => {
  const user = db.findById('users', req.user.id);
  const { password: _, ...userWithoutPassword } = user;
  res.json({
    user: userWithoutPassword,
    stats: {
      reviews: db.count('reviews', r => r.user_id === req.user.id),
      savedTrips: db.count('saved_trips', t => t.user_id === req.user.id),
      checklistItems: db.count('checklists', c => c.user_id === req.user.id),
    },
  });
};

export const updateProfile = (req, res) => {
  const { name, avatar } = req.body;
  const updates = {};
  if (name) updates.name = name;
  if (avatar) updates.avatar = avatar;
  const user = db.update('users', req.user.id, updates);
  const { password: _, ...userWithoutPassword } = user;
  res.json({ message: 'Updated.', user: userWithoutPassword });
};
