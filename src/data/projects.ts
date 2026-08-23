import { Project } from '@/types'

// Fallback data shown when Supabase isn't configured yet, or as seed
// content for the "Selected Work" section. Replace image URLs with
// your own project shots, or manage everything from /admin instead.
export const fallbackProjects: Project[] = [
  {
    id: 'local-1',
    created_at: new Date().toISOString(),
    title: 'KARMA INDIAN BISTRO',
    category: 'WEBSITE / BRAND EXPERIENCE',
    year: '2025',
    cover_image:
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1600&auto=format&fit=crop',
    description:
      'A full brand refresh and website for a modern Indian bistro — menu, mood and motion working as one system.',
    link: '',
    featured: true,
    sort_order: 1,
    gallery: [],
  },
  {
    id: 'local-2',
    created_at: new Date().toISOString(),
    title: 'TRUCKSDEAL',
    category: 'WEB PLATFORM / DEVELOPMENT',
    year: '2025',
    cover_image:
      'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=1600&auto=format&fit=crop',
    description:
      'A logistics marketplace platform built for speed, clarity and trust at scale.',
    link: '',
    featured: true,
    sort_order: 2,
    gallery: [],
  },
  {
    id: 'local-3',
    created_at: new Date().toISOString(),
    title: 'RESTAURANT BRANDING',
    category: 'BRANDING / SOCIAL MEDIA',
    year: '2024',
    cover_image:
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1600&auto=format&fit=crop',
    description:
      'An identity system spanning menus, packaging and social — built to travel across every touchpoint.',
    link: '',
    featured: true,
    sort_order: 3,
    gallery: [],
  },
  {
    id: 'local-4',
    created_at: new Date().toISOString(),
    title: 'SOCIAL MEDIA CAMPAIGNS',
    category: 'CONTENT / MARKETING',
    year: '2024',
    cover_image:
      'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1600&auto=format&fit=crop',
    description:
      'A running series of campaign concepts designed to stop the scroll and start conversation.',
    link: '',
    featured: true,
    sort_order: 4,
    gallery: [],
  },
]
