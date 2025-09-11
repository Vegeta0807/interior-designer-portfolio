import { Component, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ImageAssetsService } from '../../services/image-assets.service';
import { ScrollService } from '../../services/scroll.service';

@Component({
  selector: 'app-header',
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header implements OnInit {
  private imageAssets = inject(ImageAssetsService);
  private scrollService = inject(ScrollService);

  mobileMenuOpen = false;

  // Use actual images from assets folder
  heroBackgroundImage = this.imageAssets.hero.backgroundMain;
  heroBackgroundMobile = this.imageAssets.hero.backgroundMobile;

  ngOnInit() {
    // Preload critical images
    this.imageAssets.preloadCriticalImages();

    // Initialize scroll animations
    this.scrollService.initScrollAnimations();
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  // Smooth scroll navigation
  scrollToSection(sectionId: string) {
    this.scrollService.scrollToElement(sectionId);

    // Close mobile menu if open
    if (this.mobileMenuOpen) {
      this.toggleMobileMenu();
    }
  }

  // Scroll to portfolio section (for CTA button)
  exploreWork() {
    this.scrollService.scrollToElement('projects');
  }

  // Scroll to next section (about) from hero
  scrollToNextSection() {
    this.scrollService.scrollToElement('about');
  }

  // Method to get responsive background image
  getResponsiveBackgroundImage(): string {
    // In a real app, you might detect screen size here
    return this.heroBackgroundImage;
  }
}
