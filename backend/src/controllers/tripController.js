import db from '../database.js';

export const getSavedTrips = (req, res) => {
  const trips = db.findAll('saved_trips', t => t.user_id === req.user.id);
  trips.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  res.json(trips);
};

export const saveTrip = (req, res) => {
  const { destination_id, destination_name, destination_data } = req.body;
  const existing = db.findOne('saved_trips', t => t.user_id === req.user.id && t.destination_id === destination_id);
  if (existing) return res.status(409).json({ error: 'Already saved.' });

  const trip = db.create('saved_trips', { user_id: req.user.id, destination_id, destination_name, destination_data });
  res.status(201).json({ message: 'Saved.', trip });
};

export const removeTrip = (req, res) => {
  const trip = db.findById('saved_trips', parseFloat(req.params.id));
  if (!trip || trip.user_id !== req.user.id) return res.status(404).json({ error: 'Not found.' });
  db.delete('saved_trips', trip.id);
  res.json({ message: 'Removed.' });
};

export const clearTrips = (req, res) => {
  db.deleteWhere('saved_trips', t => t.user_id === req.user.id);
  res.json({ message: 'Cleared.' });
};
