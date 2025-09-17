import { Component, Input, Output, EventEmitter, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface SlideImage {
  src: string;
  alt: string;
  isMain?: boolean;
  thumbnail?: string;
  placeholder?: string;
}

@Component({
  selector: 'app-image-slideshow',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './image-slideshow.html'
})
export class ImageSlideshow {
  @Input() set images(value: SlideImage[]) {
    this._images = value;
    // Remove preloadImages() from here for lazy-loading
  }
  get images(): SlideImage[] {
    return this._images;
  }
  
  @Input() showThumbnails = true;
  @Output() close = new EventEmitter<void>();
  
  currentIndex = signal(0);
  imageLoadStates = signal<Record<string, boolean>>({});
  
  private _images: SlideImage[] = [];
  private preloadedImages: Set<string> = new Set();

  constructor() {}
  
  ngOnInit() {
    // Only preload images when component is initialized (modal opened)
    this.preloadImages();
  }
  
  nextSlide(): void {
    if (!this.images.length) return;
    const nextIndex = (this.currentIndex() + 1) % this.images.length;
    this.currentIndex.set(nextIndex);
    this.preloadNextImage(nextIndex);
  }
  
  previousSlide(): void {
    if (!this.images.length) return;
    const prevIndex = this.currentIndex() === 0 ? this.images.length - 1 : this.currentIndex() - 1;
    this.currentIndex.set(prevIndex);
    this.preloadNextImage(prevIndex);
  }
  
  goToSlide(index: number): void {
    if (index >= 0 && index < this.images.length) {
      this.currentIndex.set(index);
      this.preloadNextImage(index);
    }
  }
  
  onImageLoad(index: number): void {
    const states = this.imageLoadStates();
    this.imageLoadStates.set({ ...states, [index]: true });
  }
  
  onImageError(event: Event, fallbackSrc: string): void {
    const img = event.target as HTMLImageElement;
    if (img.src !== fallbackSrc) {
      img.src = fallbackSrc;
    }
  }
  
  trackByImage(index: number, image: SlideImage): string {
    return `${image.src}-${index}`;
  }
  
  private preloadImages(): void {
    // Reset preloadedImages and imageLoadStates for each modal open
    this.preloadedImages.clear();
    this.imageLoadStates.set({});
    if (!this.images.length) return;
    // Always preload the first image
    this.preloadImage(this.images[0].src);
    // Preload the next 2 images if they exist
    if (this.images.length > 1) {
      this.preloadImage(this.images[1].src);
    }
    if (this.images.length > 2) {
      this.preloadImage(this.images[2].src);
    }
  }
  
  private preloadNextImage(currentIndex: number): void {
    const nextIndex = (currentIndex + 1) % this.images.length;
    if (this.images[nextIndex]) {
      this.preloadImage(this.images[nextIndex].src);
    }
  }
  
  private preloadImage(src: string): void {
    if (this.preloadedImages.has(src)) return;
    
    const img = new Image();
    img.onload = () => {
      this.preloadedImages.add(src);
    };
    img.src = src;
  }
  
  // Only load thumbnails for current and adjacent slides
  shouldLoadThumbnail(index: number): boolean {
    // Always load all thumbnails
    return true;
  }
}