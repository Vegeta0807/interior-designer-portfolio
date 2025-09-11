# Asset Management System - Interior Design Studio

## 📁 Complete Directory Structure

```
src/assets/
├── images/
│   ├── hero/                    # Hero section backgrounds
│   │   ├── hero-bg-main.jpg     # 1920x1080px main background
│   │   ├── hero-bg-mobile.jpg   # 768x1024px mobile background
│   │   └── hero-overlay.png     # Optional texture overlay
│   ├── about/                   # About section images
│   │   ├── about-collage-1.jpg  # 600x400px collage image 1
│   │   ├── about-collage-2.jpg  # 600x400px collage image 2
│   │   ├── about-collage-3.jpg  # 600x400px collage image 3
│   │   ├── about-team.jpg       # 800x600px team photo
│   │   └── about-process.jpg    # 800x600px process image
│   ├── portfolio/               # Portfolio project images
│   │   ├── project-smart-studio.jpg    # 800x600px
│   │   ├── project-modern-loft.jpg     # 800x600px
│   │   ├── project-luxury-villa.jpg    # 800x600px
│   │   ├── project-office-space.jpg    # 800x600px
│   │   ├── project-cozy-apartment.jpg  # 800x600px
│   │   ├── project-penthouse.jpg       # 800x600px
│   │   └── project-restaurant.jpg      # 800x600px
│   ├── contact/                 # Contact section images
│   │   ├── contact-bg-main.jpg  # 1200x800px background
│   │   ├── contact-studio.jpg   # 600x800px studio photo
│   │   └── contact-consultation.jpg # 800x600px consultation room
│   ├── icons/                   # Brand assets
│   │   ├── logo.svg             # Main logo (scalable)
│   │   ├── logo-white.svg       # White logo variant
│   │   └── favicon.ico          # Browser favicon
│   └── textures/                # Background textures
│       ├── noise-overlay.png    # Subtle noise texture
│       ├── grain-texture.jpg    # Film grain effect
│       └── marble-pattern.jpg   # Marble background
└── fonts/                       # (Google Fonts loaded via CDN)
```

## 🎯 Naming Convention Rules

### Pattern: `[section]-[purpose]-[variant].extension`

**Examples:**
- `hero-bg-main.jpg` - Hero background, main variant
- `about-collage-1.jpg` - About section, collage image #1
- `project-smart-studio.jpg` - Portfolio project image
- `contact-bg-main.jpg` - Contact background, main variant

### Section Prefixes:
- `hero-` - Hero/landing section
- `about-` - About section
- `project-` - Portfolio projects
- `contact-` - Contact section
- `logo-` - Brand/logo assets

## 🛠 Implementation Files

### 1. ImageAssetsService (`src/app/services/image-assets.service.ts`)
- Centralized image path management
- Placeholder URLs for development
- Preloading functionality
- Helper methods for dynamic image loading

### 2. Image Interfaces (`src/app/interfaces/image-assets.interface.ts`)
- TypeScript interfaces for type safety
- Image optimization specifications
- Portfolio project data structure

### 3. Documentation Files
- `README.md` - Directory structure overview
- `IMAGE_OPTIMIZATION_GUIDE.md` - Optimization best practices
- `ASSET_MANAGEMENT_SYSTEM.md` - This comprehensive guide

## 💡 Usage Examples

### In Components:
```typescript
import { ImageAssetsService } from '../services/image-assets.service';

export class HeaderComponent {
  private imageAssets = inject(ImageAssetsService);
  
  // Use service for image paths
  heroImage = this.imageAssets.hero.backgroundMain;
  
  // Or use placeholder during development
  heroImage = this.imageAssets.getPlaceholderUrls().hero.backgroundMain;
}
```

### In Templates:
```html
<!-- Static image -->
<img src="assets/images/about/about-team.jpg" alt="Our Team">

<!-- Dynamic image -->
<div [style.background-image]="'url(' + heroImage + ')'"></div>

<!-- Responsive image -->
<picture>
  <source media="(max-width: 768px)" [srcset]="mobileImage">
  <img [src]="desktopImage" alt="Interior Design">
</picture>
```

### Portfolio Data:
```typescript
// Get all portfolio projects with metadata
const projects = this.imageAssets.portfolio.getAllProjects();

// Access individual project
const smartStudio = projects.find(p => p.id === 'smart-studio');
```

## 📊 Performance Optimization

### Image Specifications:
- **Hero images**: 1920x1080px (desktop), 768x1024px (mobile)
- **Portfolio images**: 800x600px (4:3 aspect ratio)
- **About collage**: 600x400px (3:2 aspect ratio)
- **Contact backgrounds**: 1200x800px (3:2 aspect ratio)

### File Size Targets:
- Hero main: < 300KB
- Hero mobile: < 200KB
- Portfolio images: < 150KB each
- About images: < 100KB each
- Contact images: < 200KB

### Loading Strategy:
1. **Critical images** (hero) - Preload immediately
2. **Above-the-fold** - Load with page
3. **Below-the-fold** - Lazy load on scroll
4. **Background images** - Load after critical content

## 🔄 Development Workflow

### Phase 1: Development (Current)
- Use placeholder URLs from Unsplash
- Test layout and functionality
- Optimize component structure

### Phase 2: Content Integration
- Replace placeholders with actual images
- Optimize images according to specifications
- Test performance and loading times

### Phase 3: Production
- Final image optimization
- CDN integration (optional)
- Performance monitoring

## 🎨 Content Guidelines

### Hero Images:
- High-impact, aspirational interior spaces
- Good lighting and professional photography
- Space for text overlay
- Consistent with brand aesthetic

### Portfolio Images:
- Completed projects only
- Consistent lighting and color grading
- Variety of room types and styles
- Professional architectural photography

### About Images:
- Showcase design range and expertise
- Include both residential and commercial work
- Professional team photos
- Behind-the-scenes process shots

### Contact Images:
- Professional, welcoming atmosphere
- Clean, organized spaces
- Suitable for background use
- Complement contact form design

## 🚀 Next Steps

1. **Implement remaining components** using this asset system
2. **Source high-quality images** according to specifications
3. **Optimize images** using recommended tools
4. **Test performance** across different devices
5. **Consider WebP format** for modern browsers
6. **Set up lazy loading** for below-the-fold images

This asset management system provides a scalable, maintainable foundation for all image assets in the interior design studio website.
