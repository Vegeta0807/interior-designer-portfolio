import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {

  // Smooth scroll to element
  scrollToElement(elementId: string): void {
    const element = document.getElementById(elementId);
    if (element) {
      const headerHeight = 80; // Account for fixed header
      const elementPosition = element.offsetTop - headerHeight;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  }

  // Scroll to top
  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  // Get current scroll position
  getScrollPosition(): number {
    return window.pageYOffset || document.documentElement.scrollTop;
  }

  // Check if element is in viewport
  isElementInViewport(element: HTMLElement): boolean {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  // Add scroll spy functionality
  initScrollSpy(callback: (activeSection: string) => void): void {
    const sections = ['home', 'about', 'projects', 'contact'];
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            callback(entry.target.id);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '-80px 0px -80px 0px' // Account for header height
      }
    );

    sections.forEach(sectionId => {
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
      }
    });
  }

  // Add scroll animations
  initScrollAnimations(): void {
    // Get all elements with scroll animation classes
    const animationSelectors = [
      '.animate-on-scroll',
      '.animate-fade-in',
      '.animate-slide-in-left',
      '.animate-slide-in-right',
      '.animate-scale-in',
      '.animate-stagger'
    ];

    const animatedElements = document.querySelectorAll(animationSelectors.join(', '));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Handle staggered animations
            if (entry.target.classList.contains('animate-stagger')) {
              const staggerElements = entry.target.querySelectorAll('.animate-stagger');
              staggerElements.forEach((element, index) => {
                setTimeout(() => {
                  element.classList.add('in-view');
                }, index * 100); // 100ms delay between each element
              });
            } else {
              entry.target.classList.add('in-view');
            }

            // Optional: Stop observing after animation triggers (one-time animation)
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15, // Trigger when 15% of element is visible
        rootMargin: '0px 0px -100px 0px' // Trigger 100px before element enters viewport
      }
    );

    animatedElements.forEach(element => {
      observer.observe(element);
    });
  }

  // Initialize staggered animations for grid items
  initStaggeredAnimations(containerSelector: string, itemSelector: string, delay: number = 100): void {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    const items = container.querySelectorAll(itemSelector);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            items.forEach((item, index) => {
              setTimeout(() => {
                item.classList.add('in-view');
              }, index * delay);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    observer.observe(container);
  }
}
