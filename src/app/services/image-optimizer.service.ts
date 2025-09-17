import { Injectable } from '@angular/core';

export interface OptimizedImage {
  original: string;
  thumbnail: string;
  placeholder: string;
  width?: number;
  height?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ImageOptimizerService {
  private readonly publicBasePath = '/assets/optimized';
  private loadedImages = new Set<string>();
  private preloadQueue: string[] = [];
  private isPreloading = false;

  constructor() {}

  /**
   * Get optimized image paths for a given image
   * @param originalPath Original image path
   * @returns Object with optimized image paths
   */
  getOptimizedImagePaths(originalPath: string): OptimizedImage {
    // Extract filename from path
    const pathParts = originalPath.split('/');
    const filename = pathParts[pathParts.length - 1];
    const folder = pathParts[pathParts.length - 2];
    
    // Create optimized paths
    return {
      original: originalPath,
      thumbnail: `${this.publicBasePath}/${folder}/thumbnails/${filename}`,
      placeholder: `${this.publicBasePath}/${folder}/placeholders/${filename}`
    };
  }

  /**
   * Preload an image
   * @param src Image source
   * @returns Promise that resolves when image is loaded
   */
  preloadImage(src: string): Promise<void> {
    if (this.loadedImages.has(src)) {
      return Promise.resolve();
    }

    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        this.loadedImages.add(src);
        resolve();
      };
      img.onerror = () => {
        resolve(); // Resolve anyway to prevent blocking
      };
      img.src = src;
    });
  }

  /**
   * Queue images for preloading
   * @param images Array of image sources to preload
   */
  queueImagesForPreload(images: string[]): void {
    // Add images to queue if not already loaded
    const newImages = images.filter(src => !this.loadedImages.has(src));
    this.preloadQueue.push(...newImages);
    
    // Start preloading if not already in progress
    if (!this.isPreloading) {
      this.processPreloadQueue();
    }
  }

  /**
   * Process the preload queue
   */
  private async processPreloadQueue(): Promise<void> {
    if (this.preloadQueue.length === 0) {
      this.isPreloading = false;
      return;
    }

    this.isPreloading = true;
    
    // Take up to 3 images from the queue
    const batch = this.preloadQueue.splice(0, 3);
    
    // Preload images in parallel
    await Promise.all(batch.map(src => this.preloadImage(src)));
    
    // Continue with next batch
    setTimeout(() => this.processPreloadQueue(), 100);
  }

  /**
   * Check if an image exists
   * @param src Image source
   * @returns Promise that resolves to boolean indicating if image exists
   */
  imageExists(src: string): Promise<boolean> {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = src;
      setTimeout(() => resolve(false), 2000); // Timeout after 2 seconds
    });
  }
}