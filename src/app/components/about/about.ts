import { Component, inject, OnInit } from '@angular/core';
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
export class About implements OnInit {
  private imageAssets = inject(ImageAssetsService);

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
    // Any initialization logic
  }
}
