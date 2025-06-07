/* eslint-disable */

// API Configuration - Edit these endpoints to match your backend
export const API_CONFIG = {
  URL: "https://berhabzakarya.studxptm.com/",

  BASE_URL: process.env.NEXT_PUBLIC_API_URL || "https://berhabzakarya.studxptm.com/api/v1/",

  AUTH: {
    LOGIN: 'auth/login/',
    REFRESH: 'auth/token/refresh/',
    LOGOUT: 'auth/logout/',
  },
  PORTFOLIO: {
    HERO: 'portfolio/hero/',
    GRID_ITEMS: 'portfolio/grid-items/',
    PROJECTS: 'portfolio/projects/',
    TESTIMONIALS: 'portfolio/testimonials/',
    COMPANIES: 'portfolio/companies/',
    WORK_EXPERIENCE: 'portfolio/work-experience/',
    SOCIAL_MEDIA: 'portfolio/social-media/',
    SETTINGS: 'portfolio/settings/',
  },
  UPLOAD: {
    IMAGE: 'upload/image/',
    FILE:'upload/files/'
  },
} as const

// Storage keys
export const STORAGE_KEYS = {
  ACCESS_TOKEN: "access_token",
  REFRESH_TOKEN: "refresh_token",
  USER: "user",
} as const

// API Response types
export interface ApiResponse<T = any> {
  success: boolean
  data: T
  message?: string
  error?: string
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface AuthResponse {
  user_id: number
  email: string
  name: string
  first_name:string;
  last_name:string;
  refresh: string
  access: string
}
