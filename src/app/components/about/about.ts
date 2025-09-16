import { Component, inject, OnInit, ElementRef, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ImageAssetsService } from '../../services/image-assets.service';

interface Service {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-about',
  imports: [CommonModule, MatIconModule],
  templateUrl: './about.html',
  styleUrl: './about.scss'
})
export class About implements OnInit, AfterViewInit {
  private imageAssets = inject(ImageAssetsService);
  private elementRef = inject(ElementRef);
  private cdr = inject(ChangeDetectorRef);

  projectsCount = 0;
  yearsCount = 0;
  readonly targetProjects = 150;
  readonly targetYears = 12;
  readonly animationDuration = 3000; // 3 seconds
  private animationStarted = false;

  // About section images - try actual images first, fallback to placeholders
  aboutImages = {
    collage1: this.imageAssets.about.collage1,
    collage2: this.imageAssets.about.collage2,
    collage3: this.imageAssets.about.collage3,
    team: this.imageAssets.about.team
  };

  // Services data
  services: Service[] = [
    {
      icon: 'home',
      title: 'Residential Design',
      description: 'Complete home interior design from concept to installation, creating personalized living spaces.'
    },
    {
      icon: 'business',
      title: 'Commercial Spaces',
      description: 'Professional office and retail environments that enhance productivity and brand identity.'
    },
    {
      icon: 'palette',
      title: 'Space Planning',
      description: 'Optimal layout design maximizing functionality while maintaining aesthetic appeal.'
    },
    {
      icon: 'lightbulb',
      title: 'Consultation',
      description: 'Expert design advice and project guidance to bring your vision to life effectively.'
    }
  ];

  ngOnInit() {
    // Initialize with zero
    this.projectsCount = 0;
    this.yearsCount = 0;
  }

  ngAfterViewInit() {
    this.setupIntersectionObserver();
  }

  private setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.animationStarted) {
          this.animationStarted = true;
          this.animateCounter();
        }
      });
    }, { threshold: 0.1 });

    // Observe the stats section
    const statsElement = this.elementRef.nativeElement.querySelector('#counter-section');
    if (statsElement) {
      observer.observe(statsElement);
    }
    
    // Start animation immediately if element is already in view
    if (statsElement && statsElement.getBoundingClientRect().top < window.innerHeight) {
      this.animateCounter();
    }
  }

  private animateCounter() {
    const startTime = Date.now();

    const updateCounter = () => {
      const currentTime = Date.now();
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / this.animationDuration, 1);

      // Easing function for smoother animation
      const easedProgress = this.easeOutQuad(progress);

      this.projectsCount = Math.round(easedProgress * this.targetProjects);
      this.yearsCount = Math.round(easedProgress * this.targetYears);
      
      // Force Angular to update the view
      this.cdr.detectChanges();

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        // Ensure final values are set exactly
        this.projectsCount = this.targetProjects;
        this.yearsCount = this.targetYears;
        this.cdr.detectChanges();
      }
    };

    requestAnimationFrame(updateCounter);
  }

  private easeOutQuad(t: number): number {
    return t * (2 - t);
  }
  }
