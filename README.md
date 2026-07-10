# fire_route

## Installation and Setup

1. Clone the repository: `git clone https://github.com/JuicedCooky/fire_route.git`
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`

## Available npm Scripts
* `npm run dev`: Starts the local Vite server.
* `npm run build`: Compiles the site into the `/dist` folder for production.
* `npm run deploy`: Automatically builds and deploys the `/dist` folder to the `gh-pages` branch.


## Project Structure

```
fire_route/
├── public/
│   ├── images/
│   │   ├── 72-Fire-Rte-98-1.json     # Gallery image manifest (filenames  
│   │   │                                                  served from CDN)
│   │   └── _floorplan.json           # Floorplan image manifest
│   ├── videos/
│   │   └── 72_Fire_Rte_98_-3153265.mp4  # Background hero video
│   ├── favicon.svg                   # Browser tab icon
│   ├── icons.svg                     # SVG icon sprite
│   └── CNAME                         # GitHub Pages custom domain
├── src/
│   ├── components/
│   │   ├── Navbar.jsx / .css         # Top navigation bar and hamburger 
│   │   │                                                           sidebar
│   │   ├── Carousel.jsx / .css       # Auto-rotating coverflow image 
│   │   │                                              carousel (Home page)
│   │   └── BookingModal.jsx          # Modal with links to booking 
│   │                                                             platforms
│   ├── pages/
│   │   ├── Home.jsx / .css           # Landing page (hero, feature boxes, 
│   │   │                                                         carousel)
│   │   ├── Gallery.jsx / .css        # Full photo gallery fetched from CDN
│   │   └── IGuide.jsx                # Embedded iGuide 3D tour iframe
│   ├── App.jsx                       # Router setup (HashRouter) and 
│   │                                                        shared layout
│   ├── App.css                       # Global layout, modal, and shared 
│   │                                                   component styles
│   ├── index.css                     # CSS reset, variables, and base 
│   │                                                            typography
│   └── main.jsx                      # React entry point
├── .env                              # Environment variables 
│                                                           (VITE_CDN_BASE)
├── index.html                        # Vite HTML entry point
├── vite.config.js                    # Vite config (base path for GitHub 
│                                                                    Pages)
├── package.json
└── package-lock.json
```


## Image Hosting

Images are stored in an **AWS S3 bucket** and served via a **CloudFront CDN**.

### S3 Bucket Structure

```
<bucket>/
└── images/
    └── 72-Fire-Rte-98-1/
        ├── 001-72_FR_98_FHP-VT.png
        ├── 002-72_FR_98_FHP-001.jpg
        └── ...
```

Each image lives directly inside the property folder (`72-Fire-Rte-98-1/`). The folder name is the same as the JSON manifest filename in `public/images/`.

### How the Gallery Works

1. On page load, `Gallery.jsx` (and `Carousel.jsx`) fetch the local manifest at `public/images/72-Fire-Rte-98-1.json`.
2. The manifest is a JSON array where each entry has a `filename` and one or more `tag` values:
   ```json
   [
     { "filename": "001-72_FR_98_FHP-VT.png", "tag": ["Outdoor", "Front", "House"] },
     { "filename": "002-72_FR_98_FHP-001.jpg", "tag": ["Lakeside", "Outdoor"] }
   ]
   ```
3. Each `filename` is prepended with `VITE_CDN_BASE` to build the full image URL:
   ```
   https://d13umf114s6tcz.cloudfront.net/images/72-Fire-Rte-98-1/001-72_FR_98_FHP-VT.png
   ```

### Changing the CDN URL

Update `VITE_CDN_BASE` in `.env`:
```
VITE_CDN_BASE=https://<your-cloudfront-domain>/images/<property-folder>/
```

Make sure the trailing `/` is included. Then rebuild (`npm run build`) for the change to take effect.

## AI Testing & Validation

### Initial Design

For design choices such as caching, image hosting method, or metadata; brainstorming was done with the assistance of LLMs, detailing specific use cases of different methods and limitations. The LLMs were provided the specific scope and use case of the implementation to cover all basis'.  

### Code Review

### Visual Validation

