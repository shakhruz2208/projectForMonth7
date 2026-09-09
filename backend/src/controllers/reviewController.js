import db from '../database.js';

export const getReviews = (req, res) => {
  const { page = 1, limit = 10, destination, rating, sort = 'recent' } = req.query;
  let reviews = db.findAll('reviews');

  if (destination) reviews = reviews.filter(r => r.destination === destination);
  if (rating) reviews = reviews.filter(r => r.rating === parseInt(rating));

  // Add user info
  reviews = reviews.map(r => {
    const user = db.findById('users', r.user_id);
    return { ...r, author_name: user?.name || 'Unknown', author_avatar: user?.avatar || '👤' };
  });

  // Sort
  if (sort === 'helpful') reviews.sort((a, b) => (b.helpful || 0) - (a.helpful || 0));
  else if (sort === 'rating') reviews.sort((a, b) => b.rating - a.rating);
  else reviews.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  const total = reviews.length;
  const start = (page - 1) * limit;
  reviews = reviews.slice(start, start + parseInt(limit));

  res.json({ reviews, total, page: parseInt(page), pages: Math.ceil(total / limit) });
};

export const getReview = (req, res) => {
  const review = db.findById('reviews', parseFloat(req.params.id));
  if (!review) return res.status(404).json({ error: 'Review not found.' });
  const user = db.findById('users', review.user_id);
  res.json({ ...review, author_name: user?.name, author_avatar: user?.avatar });
};

export const createReview = (req, res) => {
  const { destination, rating, title, comment, travel_date, travel_type } = req.body;
  const review = db.create('reviews', {
    user_id: req.user.id, destination, rating, title, comment, travel_date, travel_type, helpful: 0,
  });
  const user = db.findById('users', req.user.id);
  res.status(201).json({ message: 'Created.', review: { ...review, author_name: user?.name, author_avatar: user?.avatar } });
};

export const updateReview = (req, res) => {
  const review = db.findById('reviews', parseFloat(req.params.id));
  if (!review) return res.status(404).json({ error: 'Not found.' });
  if (review.user_id !== req.user.id) return res.status(403).json({ error: 'Not authorized.' });
  const updated = db.update('reviews', review.id, req.body);
  res.json({ message: 'Updated.', review: updated });
};

export const deleteReview = (req, res) => {
  const review = db.findById('reviews', parseFloat(req.params.id));
  if (!review) return res.status(404).json({ error: 'Not found.' });
  if (review.user_id !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Not authorized.' });
  }
  db.delete('reviews', review.id);
  res.json({ message: 'Deleted.' });
};

export const markHelpful = (req, res) => {
  const review = db.findById('reviews', parseFloat(req.params.id));
  if (!review) return res.status(404).json({ error: 'Not found.' });
  db.update('reviews', review.id, { helpful: (review.helpful || 0) + 1 });
  res.json({ helpful: (review.helpful || 0) + 1 });
};
