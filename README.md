# Christian Oh - Portfolio Website

A premium Next.js portfolio website for Christian Oh, a real estate investor and Director of Investments at JNA.

## Features

- 🎨 Modern, responsive design with dark/light mode toggle
- ⚡ Built with Next.js 15 and TypeScript
- 🎯 Tailwind CSS for styling
- 📱 Fully responsive mobile navigation
- ✨ Smooth scroll animations
- 📊 Interactive portfolio gallery
- 🔥 Premium UI with glassmorphism effects

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

1. **Hero** - Dynamic landing section with call-to-action
2. **Story** - Timeline of Christian's journey from bankruptcy to success
3. **Methodology** - Data-driven approach to real estate
4. **Portfolio** - Interactive accordion gallery of 5 properties
5. **Contact** - Consultation booking form

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

## License

© 2026 Christian Oh. All rights reserved.
