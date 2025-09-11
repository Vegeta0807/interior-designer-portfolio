import { Injectable } from '@angular/core';

export interface ProjectImage {
  src: string;
  alt: string;
  isMain?: boolean;
}

export interface PortfolioProject {
  id: string;
  title: string;
  category: 'Residential' | 'Commercial' | 'Hospitality' | 'Office';
  description: string;
  mainImage: string;
  images: ProjectImage[];
  year?: number;
  location?: string;
  area?: string;
  client?: string;
  tags?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class PortfolioImageService {
  private readonly basePath = 'assets/images/portfolio';
  private readonly manifestPath = 'assets/images/portfolio/portfolio-manifest.json';
  private folderImagesMap: Map<string, string[]> = new Map();
  private discoveredFolders: string[] = [];

  private formatTitle(folderName: string): string {
    return folderName
      .split(/[\s-_]+/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }

  private generateTags(folderName: string): string[] {
    const tags = ['Interior Design', 'Custom'];
    const name = folderName.toLowerCase();
    if (name.includes('bed')) tags.push('Bedroom', 'Furniture');
    if (name.includes('dining')) tags.push('Dining Room', 'Furniture');
    if (name.includes('chair')) tags.push('Seating', 'Furniture');
    if (name.includes('sofa')) tags.push('Living Room', 'Seating');
    if (name.includes('kitchen')) tags.push('Kitchen', 'Modern');
    if (name.includes('bathroom')) tags.push('Bathroom', 'Luxury');
    return tags;
  }

  private generateProjectConfig(folderName: string): Omit<PortfolioProject, 'mainImage' | 'images'> {
    const id = folderName.toLowerCase().replace(/\s+/g, '-');
    const title = this.formatTitle(folderName);
    let category: 'Residential' | 'Commercial' | 'Hospitality' | 'Office' = 'Residential';
    if (folderName.toLowerCase().includes('office')) category = 'Office';
    else if (folderName.toLowerCase().includes('cafe') || folderName.toLowerCase().includes('restaurant')) category = 'Hospitality';
    else if (folderName.toLowerCase().includes('commercial') || folderName.toLowerCase().includes('shop')) category = 'Commercial';
    return {
      id,
      title,
      category,
      description: `Beautiful ${title.toLowerCase()} design showcasing our expertise in interior styling and space optimization.`,
      tags: this.generateTags(folderName),
      year: 2024,
      location: 'Client Location',
      area: 'Custom Size',
      client: 'Private Client'
    };
  }

  private async discoverPortfolioFolders(): Promise<string[]> {
    if (this.discoveredFolders.length > 0) {
      return this.discoveredFolders;
    }
    try {
      const response = await fetch(this.manifestPath);
      if (response.ok) {
        const manifest = await response.json();
        if (manifest.folders && Array.isArray(manifest.folders)) {
          this.discoveredFolders = manifest.folders.map((f: any) => f.name);
          this.folderImagesMap = new Map<string, string[]>();
          manifest.folders.forEach((f: any) => {
            this.folderImagesMap.set(f.name, f.images);
          });
          return this.discoveredFolders;
        }
      }
    } catch (error) {}
    return [];
  }

  async getProjects(): Promise<PortfolioProject[]> {
    const projects: PortfolioProject[] = [];
    const discoveredFolders = await this.discoverPortfolioFolders();
    for (const folderName of discoveredFolders) {
      if (!folderName || typeof folderName !== 'string' || folderName.trim() === '') {
        continue;
      }
      const config = this.generateProjectConfig(folderName);
      const images = await this.getProjectImages(config.id, folderName);
      projects.push({
        ...config,
        mainImage: images.length > 0 ? images[0].src : '',
        images: images.length > 0 ? images : []
      });
    }
    return projects;
  }

  private async getProjectImages(projectId: string, folderName: string): Promise<ProjectImage[]> {
    try {
      let imageNames: string[] = [];
      if (this.folderImagesMap.has(folderName)) {
        imageNames = this.folderImagesMap.get(folderName) || [];
      }
      const images: ProjectImage[] = [];
      for (const imageName of imageNames) {
        const imagePath = `${this.basePath}/${folderName}/${imageName}`;
        if (await this.imageExists(imagePath)) {
          images.push({
            src: imagePath,
            alt: `${this.formatTitle(folderName)} - Image ${images.length + 1}`,
            isMain: images.length === 0
          });
        }
      }
      return images;
    } catch (error) {
      return [];
    }
  }

  private async imageExists(src: string): Promise<boolean> {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = src;
      setTimeout(() => resolve(false), 2000);
    });
  }

  // Removed addProjectFolder and refreshFolderDiscovery (not needed)

  async getProjectById(id: string): Promise<PortfolioProject | null> {
    const projects = await this.getProjects();
    return projects.find(p => p.id === id) || null;
  }
}