

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageAssetsService {
  private readonly basePath = 'assets/images';

  readonly hero = {
    backgroundMain: `${this.basePath}/hero/hero-bg-main.jpg`,
    backgroundMobile: `${this.basePath}/hero/hero-bg-mobile.jpg`
  };


  readonly about = {
    collage1: `${this.basePath}/about/about-collage-1.jpg`,
    collage2: `${this.basePath}/about/about-collage-2.jpg`,
    collage3: `${this.basePath}/about/about-collage-3.jpg`,
    team: `${this.basePath}/about/about-team.jpg`
  };

  readonly contact = {
    backgroundMain: `${this.basePath}/contact/contact-bg-main.jpg`
  };

  preloadCriticalImages(): void {
    const criticalImages = [
      this.hero.backgroundMain,
      this.hero.backgroundMobile
    ];
    criticalImages.forEach(imagePath => {
      const img = new Image();
      img.src = imagePath;
    });
  }

  getPlaceholderUrls() {
    return {
      contact: {
        backgroundMain: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'
      }
    };
  }
}