# Wedding Frontend

A React-based frontend application for wedding RSVP management, built with Vite, TypeScript, and Tailwind CSS.

## Features

- Wedding RSVP form with Yes/No/Maybe responses
- Afterparty RSVP form
- Responsive design with pixel art styling
- Floating hearts animation
- Photo grid display

## Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animation**: GSAP
- **Icons**: Lucide React
- **Routing**: React Router

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/wedding-frontend.git
cd wedding-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment variables:
```bash
cp .env.example .env.local
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Environment Variables

Create a `.env.local` file with the following variables:

```env
VITE_API_URL=http://localhost:5000
```

## Deployment

This application is configured for deployment on Vercel.

### Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Build Configuration

The application uses Vite for building. The build output will be in the `dist/` directory.

## API Integration

The frontend communicates with the backend API endpoints:

- `POST /api/wedding-rsvp` - Submit wedding RSVP
- `POST /api/rsvp` - Submit afterparty RSVP
- `GET /api/wedding-rsvp` - Get wedding RSVPs
- `GET /api/rsvp` - Get afterparty RSVPs

## Project Structure

```
src/
├── components/          # React components
│   ├── WeddingRSVP.tsx
│   ├── AfterpartyApp.tsx
│   ├── PartyForm.tsx
│   ├── FloatingHearts.tsx
│   └── GridMotion.tsx
├── App.tsx             # Main app component
├── main.tsx           # Entry point
└── index.css          # Global styles
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is private and for personal use. 