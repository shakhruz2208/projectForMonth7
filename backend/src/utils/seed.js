import bcrypt from 'bcryptjs';
import db from '../database.js';

console.log('🌱 Seeding database...');

// Create demo users
const users = [
  { name: 'Akbar Karimov', email: 'akbar@example.com', password: 'password123' },
  { name: 'Nodira Bayramova', email: 'nodira@example.com', password: 'password123' },
  { name: 'Sardor Mirzoev', email: 'sardor@example.com', password: 'password123' },
];

for (const user of users) {
  const existing = db.findOne('users', u => u.email === user.email);
  if (!existing) {
    const hash = await bcrypt.hash(user.password, 10);
    const created = db.create('users', { name: user.name, email: user.email, password: hash, avatar: '👤', role: 'user' });
    db.create('settings', { user_id: created.id, theme: 'dark', language: 'uz', notifications: 1, compact_mode: 0 });
    console.log(`✅ User: ${user.name} (${user.email})`);
  }
}

// Demo users IDs
const akbar = db.findOne('users', u => u.email === 'akbar@example.com');
const nodira = db.findOne('users', u => u.email === 'nodira@example.com');
const sardor = db.findOne('users', u => u.email === 'sardor@example.com');

// Create reviews
const reviews = [
  { user_id: akbar?.id, destination: 'Paris', rating: 5, title: 'Ajoyib tajriba!', comment: 'Parij — sevgi shahri. Eiffel minoridan manzara ajoyib.', travel_type: 'Couple', helpful: 12 },
  { user_id: nodira?.id, destination: 'Bali', rating: 4, title: 'Tropik jannat', comment: 'Bali juda chiroyli joy. Ubud teraslari hayratlanarli.', travel_type: 'Family', helpful: 8 },
  { user_id: sardor?.id, destination: 'Tokyo', rating: 5, title: 'Kelajak shahri!', comment: 'Tokyo — zamonaviy va an\'anaviy madaniyat uyg\'unligi.', travel_type: 'Solo', helpful: 15 },
  { user_id: akbar?.id, destination: 'Maldives', rating: 5, title: 'Haqiqiy jannat', comment: 'Kristal suv, oq plyajlar va hashamatli resortlar.', travel_type: 'Couple', helpful: 20 },
  { user_id: nodira?.id, destination: 'Cappadocia', rating: 4, title: 'Sarguzashtli sayohat', comment: 'Havo sharidan quyosh chiqishini ko\'rish ajoyib.', travel_type: 'Friends', helpful: 11 },
];

for (const r of reviews) {
  if (r.user_id) db.create('reviews', r);
}
console.log(`✅ ${reviews.length} reviews created`);

// Create blog posts
const posts = [
  { user_id: akbar?.id, title: 'Sayohat uchun 10 ta maslahat', content: 'Sayohat qilish — hayotdagi eng yoqimli tajriba. To\'g\'ri rejalashtirish bilan sayohat yanada yoqimli bo\'ladi.', category: 'Maslahatlar', status: 'published', views: 150 },
  { user_id: nodira?.id, title: 'Arzon sayohat qilishning sirri', content: 'Kam pulga ham chiroyli sayohat qilish mumkin. Asosiysi — to\'g\'ri rejalashtirish.', category: 'Byudjet', status: 'published', views: 230 },
  { user_id: sardor?.id, title: 'Yaponiya: Madaniyatlar uyg\'unligi', content: 'Yaponiya — qadimiy madaniyat va zamonaviy texnologiya uyg\'unligi.', category: 'Madaniyat', status: 'published', views: 180 },
  { user_id: akbar?.id, title: 'Plyaj sayohati qo\'llanmasi', content: 'Eng yaxshi plyajlar, kerakli narsalar va maslahatlar.', category: 'Plyaj', status: 'published', views: 120 },
  { user_id: nodira?.id, title: 'Xavfsiz sayohat: 7 ta qoida', content: 'Sayohat davomida o\'zingizni qanday himoya qilish kerak?', category: 'Xavfsizlik', status: 'published', views: 200 },
];

for (const p of posts) {
  if (p.user_id) db.create('blog_posts', p);
}
console.log(`✅ ${posts.length} blog posts created`);

console.log('\n🎉 Database seeded!');
console.log('\n📋 Demo accounts:');
console.log('   Email: akbar@example.com | Password: password123');
console.log('   Email: nodira@example.com | Password: password123');
console.log('   Email: sardor@example.com | Password: password123');
