// Interface definitions for image assets

export interface HeroImages {
  backgroundMain: string;
  backgroundMobile: string;
  overlay?: string;
}

export interface AboutImages {
  collage1: string;
  collage2: string;
  collage3: string;
  team: string;
  process: string;
  getAllCollageImages: () => string[];
}

export interface PortfolioProject {
  id: string;
  title: string;
  category: 'Residential' | 'Commercial' | 'Hospitality' | 'Office';
  image: string;
  description: string;
  tags?: string[];
  year?: number;
  location?: string;
  placeholderImage?: string;
  gallery?: string[];
  client?: string;
  area?: string;
  duration?: string;
}

export interface PortfolioImages {
  smartStudio: string;
  modernLoft: string;
  luxuryVilla: string;
  officeSpace: string;
  cozyApartment: string;
  penthouse: string;
  restaurant: string;
  getAllProjects: () => PortfolioProject[];
}

export interface ContactImages {
  backgroundMain: string;
  studio: string;
  consultation: string;
}

export interface IconAssets {
  logo: string;
  logoWhite: string;
  favicon: string;
}

export interface TextureAssets {
  noiseOverlay: string;
  grainTexture: string;
  marblePattern: string;
}

export interface ImageAssets {
  hero: HeroImages;
  about: AboutImages;
  portfolio: PortfolioImages;
  contact: ContactImages;
  icons: IconAssets;
  textures: TextureAssets;
}

// Image optimization settings
export interface ImageOptimizationSettings {
  quality: number;
  format: 'jpg' | 'png' | 'webp' | 'svg';
  maxWidth: number;
  maxHeight: number;
  targetFileSize: number; // in KB
}

// Image specifications for each section
export const IMAGE_SPECS: Record<string, ImageOptimizationSettings> = {
  'hero-main': {
    quality: 85,
    format: 'jpg',
    maxWidth: 1920,
    maxHeight: 1080,
    targetFileSize: 300
  },
  'hero-mobile': {
    quality: 80,
    format: 'jpg',
    maxWidth: 768,
    maxHeight: 1024,
    targetFileSize: 200
  },
  'about-collage': {
    quality: 80,
    format: 'jpg',
    maxWidth: 600,
    maxHeight: 400,
    targetFileSize: 100
  },
  'about-team': {
    quality: 85,
    format: 'jpg',
    maxWidth: 800,
    maxHeight: 600,
    targetFileSize: 150
  },
  'portfolio-project': {
    quality: 85,
    format: 'jpg',
    maxWidth: 800,
    maxHeight: 600,
    targetFileSize: 150
  },
  'contact-background': {
    quality: 80,
    format: 'jpg',
    maxWidth: 1200,
    maxHeight: 800,
    targetFileSize: 200
  }
};
