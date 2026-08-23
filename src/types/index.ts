export interface Inquiry {
  id: string
  created_at: string
  name: string
  email: string
  phone?: string | null
  budget?: string | null
  message: string
  status: 'new' | 'contacted' | 'archived'
}

export interface GalleryItem {
  url: string
  type: 'image' | 'video'
}

export interface Project {
  id: string
  created_at: string
  title: string
  category: string
  year: string
  cover_image: string
  description?: string | null
  link?: string | null
  featured: boolean
  sort_order: number
  gallery?: GalleryItem[]
}