import { useQuery } from '@tanstack/react-query';
import destinationsData from '../data/destinations.json';

// Destinations API - local JSON dan React Query orqali
const fetchDestinations = async ({ queryKey }) => {
  const [, { search, category, sortBy }] = queryKey;

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));

  let result = [...destinationsData];

  // Search filter
  if (search) {
    const q = search.toLowerCase();
    result = result.filter(d =>
      d.name.toLowerCase().includes(q) ||
      d.country.toLowerCase().includes(q) ||
      d.description.toLowerCase().includes(q)
    );
  }

  // Category filter
  if (category && category !== 'all') {
    result = result.filter(d => d.category.includes(category));
  }

  // Sort
  if (sortBy === 'name') result.sort((a, b) => a.name.localeCompare(b.name));
  else if (sortBy === 'price') result.sort((a, b) => a.price - b.price);
  else result.sort((a, b) => b.rating - a.rating);

  return {
    destinations: result,
    total: result.length,
  };
};

const fetchSingleDestination = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 200));
  const dest = destinationsData.find(d => d.id === parseInt(id));
  if (!dest) throw new Error('Destination not found');
  return dest;
};

const fetchPopularDestinations = async () => {
  await new Promise(resolve => setTimeout(resolve, 200));
  return destinationsData.filter(d => d.category.includes('popular')).slice(0, 6);
};

export const useDestinations = (filters = {}) => {
  return useQuery({
    queryKey: ['destinations', filters],
    queryFn: fetchDestinations,
    staleTime: 5 * 60 * 1000,
    keepPreviousData: true,
  });
};

export const useDestination = (id) => {
  return useQuery({
    queryKey: ['destination', id],
    queryFn: () => fetchSingleDestination(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};

export const usePopularDestinations = () => {
  return useQuery({
    queryKey: ['popularDestinations'],
    queryFn: fetchPopularDestinations,
    staleTime: 10 * 60 * 1000,
  });
};
