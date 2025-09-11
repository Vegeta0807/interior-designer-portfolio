# Interior Design Portfolio

This project is an Angular application that showcases various interior design projects through a portfolio of images. The application dynamically discovers image folders and generates a manifest for easy access to project images.

## Project Structure

```
interior
├── src
│   ├── app
│   │   ├── services
│   │   │   └── portfolio-image.service.ts
│   └── assets
│       └── images
│           └── portfolio
├── scripts
│   └── scan-portfolio-folders.js
├── angular.json
├── package.json
└── README.md
```

## Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd interior
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Run the Application**
   ```bash
   ng serve
   ```

4. **Scan Portfolio Folders**
   To scan the `assets/images/portfolio` directory and generate the portfolio manifest, run the following script:
   ```bash
   node scripts/scan-portfolio-folders.js
   ```

## Usage Guidelines

- The `PortfolioImageService` class in `src/app/services/portfolio-image.service.ts` manages the loading and configuration of portfolio images.
- The script `scripts/scan-portfolio-folders.js` can be executed to update the portfolio manifest based on the current contents of the image directory.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License

This project is licensed under the MIT License.