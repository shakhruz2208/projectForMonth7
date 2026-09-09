import db from '../database.js';

export const getChecklist = (req, res) => {
  const items = db.findAll('checklists', c => c.user_id === req.user.id);
  items.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  res.json(items);
};

export const addChecklistItem = (req, res) => {
  const { text, category = 'other' } = req.body;
  const item = db.create('checklists', { user_id: req.user.id, text, category, packed: 0 });
  res.status(201).json(item);
};

export const toggleChecklistItem = (req, res) => {
  const item = db.findById('checklists', parseFloat(req.params.id));
  if (!item || item.user_id !== req.user.id) return res.status(404).json({ error: 'Not found.' });
  const updated = db.update('checklists', item.id, { packed: item.packed ? 0 : 1 });
  res.json(updated);
};

export const deleteChecklistItem = (req, res) => {
  const item = db.findById('checklists', parseFloat(req.params.id));
  if (!item || item.user_id !== req.user.id) return res.status(404).json({ error: 'Not found.' });
  db.delete('checklists', item.id);
  res.json({ message: 'Deleted.' });
};

export const clearChecklist = (req, res) => {
  db.deleteWhere('checklists', c => c.user_id === req.user.id);
  res.json({ message: 'Cleared.' });
};
