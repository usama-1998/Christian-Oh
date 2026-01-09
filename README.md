# Christian Oh - Portfolio Website

A premium Next.js portfolio website for Christian Oh, a real estate investor and Director of Investments at JNA.

> **"Real Data. Real Results."**

## Features

- 🎨 Modern, responsive design with dark/light mode toggle
- ⚡ Built with Next.js 15 and TypeScript
- 🎯 Tailwind CSS for styling
- 📱 Fully responsive mobile navigation
- ✨ Smooth scroll animations
- 📊 Interactive portfolio gallery
- 🔥 Premium UI with glassmorphism effects
- 🎥 Watch the Journey: [YouTube Video](https://www.youtube.com/watch?v=I2ykHYy_fhU)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

### Build for Production

```bash
# Create production build
npm run build

# Start production server
npm start
```

## Project Structure

```
christian-oh-portfolio/
├── app/
│   ├── layout.tsx      # Root layout with fonts and metadata
│   ├── page.tsx        # Main landing page with all components
│   └── globals.css     # Global styles and animations
├── public/             # Static assets
├── tailwind.config.ts  # Tailwind configuration
├── next.config.js      # Next.js configuration
└── package.json        # Dependencies and scripts
```

## Technologies Used

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS
- **Lucide React** - Icon library
- **Google Fonts** - Inter, Playfair Display, JetBrains Mono

## Key Sections

1. **Hero** - Dynamic landing section with "Real Data. Real Results"
2. **Video Showcase** - "The Monopoly Code" method and client success stories
3. **Methodology** - Data-driven approach to real estate (1OPM Method)
4. **Portfolio** - Interactive accordion gallery of properties
5. **Contact** - Partner checklist and consultation booking form

## Customization

### Fonts
Fonts are configured in `app/layout.tsx` using Next.js font optimization:
- Inter (sans-serif)
- Playfair Display (serif)
- JetBrains Mono (monospace)

### Colors
The color scheme uses neutral tones with amber accents. Modify in `tailwind.config.ts` for custom colors.

### Content
All content can be edited directly in `app/page.tsx`.
To update the Hero image, replace `public/hero.png` with your desired image (keep the filename the same or update the reference in `app/page.tsx`).

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## License

© 2026 Christian Oh. All rights reserved.
