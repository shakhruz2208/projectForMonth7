import db from '../database.js';

export const getPosts = (req, res) => {
  const { page = 1, limit = 12, search, category, sort = 'recent' } = req.query;
  let posts = db.findAll('blog_posts', p => p.status === 'published');

  if (search) {
    const q = search.toLowerCase();
    posts = posts.filter(p => p.title.toLowerCase().includes(q) || p.content.toLowerCase().includes(q));
  }
  if (category) posts = posts.filter(p => p.category === category);

  // Add author info
  posts = posts.map(p => {
    const user = db.findById('users', p.user_id);
    return { ...p, author_name: user?.name || 'Unknown', author_avatar: user?.avatar || '👤' };
  });

  if (sort === 'popular') posts.sort((a, b) => (b.views || 0) - (a.views || 0));
  else if (sort === 'title') posts.sort((a, b) => a.title.localeCompare(b.title));
  else posts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  const total = posts.length;
  const start = (page - 1) * limit;
  posts = posts.slice(start, start + parseInt(limit));

  res.json({ posts, total, page: parseInt(page), pages: Math.ceil(total / limit) });
};

export const getPost = (req, res) => {
  const post = db.findById('blog_posts', parseFloat(req.params.id));
  if (!post) return res.status(404).json({ error: 'Not found.' });
  db.update('blog_posts', post.id, { views: (post.views || 0) + 1 });
  const user = db.findById('users', post.user_id);
  res.json({ ...post, views: (post.views || 0) + 1, author_name: user?.name, author_avatar: user?.avatar });
};

export const createPost = (req, res) => {
  const { title, content, excerpt, category, image, tags, status = 'published' } = req.body;
  const post = db.create('blog_posts', {
    user_id: req.user.id, title, content, excerpt: excerpt || content?.slice(0, 120),
    category: category || 'General', image: image || `https://picsum.photos/seed/${Date.now()}/800/400`,
    tags: tags || [], status, views: 0,
  });
  res.status(201).json({ message: 'Created.', post });
};

export const updatePost = (req, res) => {
  const post = db.findById('blog_posts', parseFloat(req.params.id));
  if (!post) return res.status(404).json({ error: 'Not found.' });
  if (post.user_id !== req.user.id) return res.status(403).json({ error: 'Not authorized.' });
  const updated = db.update('blog_posts', post.id, req.body);
  res.json({ message: 'Updated.', post: updated });
};

export const deletePost = (req, res) => {
  const post = db.findById('blog_posts', parseFloat(req.params.id));
  if (!post) return res.status(404).json({ error: 'Not found.' });
  if (post.user_id !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Not authorized.' });
  }
  db.delete('blog_posts', post.id);
  res.json({ message: 'Deleted.' });
};
