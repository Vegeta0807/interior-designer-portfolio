# InteriorDesignStudio

A modern, responsive web application for showcasing interior design projects, portfolios, and services. Built with Angular, Tailwind CSS, and optimized for performance and accessibility.

## Table of Contents
- [Features](#features)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Scripts](#scripts)
- [Customization](#customization)
- [Contributing](#contributing)
- [License](#license)

---

## Features
- **Portfolio Showcase:** Display interior design projects with image slideshows and detailed descriptions.
- **Image Optimization:** Automated scripts for optimizing and manifesting portfolio images.
- **Responsive Design:** Mobile-first layouts using Tailwind CSS.
- **Lazy Loading:** Efficient image and thumbnail loading for fast performance.
- **Accessibility:** Keyboard navigation and ARIA support.
- **Modern UI:** Glassmorphism and elegant visual effects.

---

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm (v8+ recommended)

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/InteriorDesignStudio.git
   cd InteriorDesignStudio
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm start
   ```
   The app will be available at [http://localhost:4200](http://localhost:4200).

---

## Project Structure
```
├── src/
│   ├── app/
│   │   ├── components/      # Angular components (portfolio, slideshow, about, etc.)
│   │   ├── services/        # Data and image services
│   │   ├── interfaces/      # TypeScript interfaces
│   ├── assets/              # Static images and assets
│   ├── styles/              # Global and component styles
├── scripts/                 # Image optimization and manifest scripts
├── public/                  # Public assets and favicon
├── angular.json             # Angular configuration
├── tailwind.config.js       # Tailwind CSS configuration
└── package.json             # Project metadata and scripts
```

---

## Scripts
- `npm start` — Run the development server
- `npm run build` — Build for production
- `npm run test` — Run unit tests
- `node scripts/optimize-portfolio-images.js` — Optimize portfolio images
- `node scripts/generate-portfolio-manifest.js` — Generate image manifest for projects

---

## Customization
- **Add Projects:** Update portfolio data in the relevant service or JSON file.
- **Change Styles:** Modify Tailwind and SCSS files in `src/styles/`.
- **Assets:** Place optimized images in `src/assets/images/` or `public/assets/optimized/`.

---

## Contributing
Contributions are welcome! Please open issues or submit pull requests for improvements, bug fixes, or new features.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a pull request

---

## License
This project is licensed under the MIT License.

---

If you need further customization or want to add specific sections (like deployment or API docs), let me know!
