import { Component, inject, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioImageService, PortfolioProject } from '../../services/portfolio-image.service';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './portfolio.html'
})
export class Portfolio implements OnInit, OnDestroy {
  private portfolioService = inject(PortfolioImageService);
  private cdr = inject(ChangeDetectorRef);

  // Signals for reactive state management
  projects = signal<PortfolioProject[]>([]);
  selectedProject = signal<PortfolioProject | null>(null);
  currentSlideIndex = signal(0);
  isLoading = signal(true);
  imageLoadStates = signal<Record<string, boolean>>({});

  // Performance optimizations
  private intersectionObserver?: IntersectionObserver;
  private keyboardListener?: (event: KeyboardEvent) => void;

  ngOnInit() {
    this.loadProjects();
    this.setupIntersectionObserver();
    this.setupKeyboardNavigation();
  }

  ngOnDestroy() {
    this.intersectionObserver?.disconnect();
    if (this.keyboardListener) {
      document.removeEventListener('keydown', this.keyboardListener);
    }
  }

  private async loadProjects() {
    try {
      const projects = await this.portfolioService.getProjects();
      this.projects.set(projects);
      this.isLoading.set(false);
      this.cdr.markForCheck();
    } catch (error) {
      this.isLoading.set(false);
      this.cdr.markForCheck();
    }
  }

  private setupIntersectionObserver() {
    if (typeof IntersectionObserver === 'undefined') return;

    this.intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            if (img.dataset['src']) {
              img.src = img.dataset['src'];
              img.removeAttribute('data-src');
              this.intersectionObserver?.unobserve(img);
            }
          }
        });
      },
      { rootMargin: '50px' }
    );
  }

  private setupKeyboardNavigation() {
    this.keyboardListener = (event: KeyboardEvent) => {
      const project = this.selectedProject();
      if (!project) return;

      switch (event.key) {
        case 'Escape':
          this.closeProject();
          break;
        case 'ArrowLeft':
          event.preventDefault();
          this.previousSlide();
          break;
        case 'ArrowRight':
          event.preventDefault();
          this.nextSlide();
          break;
      }
    };
    document.addEventListener('keydown', this.keyboardListener);
  }

  openProject(project: PortfolioProject) {
    this.selectedProject.set(project);
    this.currentSlideIndex.set(0);
    document.body.style.overflow = 'hidden';
    this.cdr.markForCheck();
  }

  closeProject() {
    this.selectedProject.set(null);
    this.currentSlideIndex.set(0);
    document.body.style.overflow = 'auto';
    this.cdr.markForCheck();
  }

  nextSlide() {
    const project = this.selectedProject();
    if (!project) return;

    const currentIndex = this.currentSlideIndex();
    const nextIndex = (currentIndex + 1) % project.images.length;
    this.currentSlideIndex.set(nextIndex);
    this.cdr.markForCheck();
  }

  previousSlide() {
    const project = this.selectedProject();
    if (!project) return;

    const currentIndex = this.currentSlideIndex();
    const prevIndex = currentIndex === 0 ? project.images.length - 1 : currentIndex - 1;
    this.currentSlideIndex.set(prevIndex);
    this.cdr.markForCheck();
  }

  goToSlide(index: number) {
    this.currentSlideIndex.set(index);
    this.cdr.markForCheck();
  }

  onImageLoad(projectId: string) {
    const states = this.imageLoadStates();
    this.imageLoadStates.set({ ...states, [projectId]: true });
    this.cdr.markForCheck();
  }

  onImageError(event: Event, fallbackSrc: string) {
    const img = event.target as HTMLImageElement;
    img.src = fallbackSrc;
  }

  trackByProject(index: number, project: PortfolioProject): string {
    return project.id;
  }

  trackByImage(index: number, image: any): string {
    return `${image.src}-${index}`;
  }
}
