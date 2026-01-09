# Flooring Admin Panel

A modern, production-ready admin panel built with Next.js 16 and shadcn/ui for managing flooring business website content.

## Features

- **Dashboard Overview** - Quick stats and navigation to all modules
- **Materials Management** - CRUD operations for flooring products with images, colors, and features
- **Categories** - Organize products into Natural Stone, Ceramic, Wood, and Vinyl categories
- **Gallery Items** - Manage inspiration gallery with application types and tags
- **Testimonials** - Customer reviews with ratings and author information
- **Application Types** - Residential, Commercial, and Outdoor categories
- **Client Journey** - Manage customer journey steps and workflows
- **FAQ Categories** - Organize frequently asked questions

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **UI Library**: shadcn/ui components
- **Styling**: Tailwind CSS v4
- **TypeScript**: Full type safety
- **Image Upload**: Built-in component (ready for backend integration)

## Project Structure

```
flooring-admin/
├── app/                          # Next.js app directory
│   ├── page.tsx                  # Dashboard
│   ├── materials/                # Materials pages
│   ├── categories/               # Categories pages
│   ├── gallery/                  # Gallery pages
│   ├── testimonials/             # Testimonials pages
│   ├── application-types/        # Application types pages
│   ├── client-journey/           # Client journey pages
│   └── faq-categories/           # FAQ categories pages
├── components/                   # React components
│   ├── materials/                # Materials components
│   ├── categories/               # Categories components
│   ├── gallery/                  # Gallery components
│   ├── testimonials/             # Testimonials components
│   ├── application-types/        # Application types components
│   ├── client-journey/           # Client journey components
│   ├── faq-categories/           # FAQ categories components
│   ├── shared/                   # Shared components (ImageUpload, etc.)
│   └── ui/                       # shadcn/ui components
├── lib/                          # Utilities and services
│   ├── api/                      # Centralized API services
│   │   ├── materials.ts          # Materials API
│   │   ├── categories.ts         # Categories API
│   │   ├── gallery.ts            # Gallery API
│   │   ├── testimonials.ts       # Testimonials API
│   │   └── index.ts              # API barrel export
│   ├── mock-data.ts              # Mock data for demo
│   └── utils.ts                  # Utility functions
└── README.md                     # This file
```

## Installation

1. **Clone or download** this project
2. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```
3. **Run the development server**:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```
4. **Open** [http://localhost:3000](http://localhost:3000) in your browser

## API Integration

The admin panel is designed to work with your existing Node.js backend. All API calls are centralized in the `lib/api/` directory.

### API Service Architecture

Each collection has its own API service file:
- `lib/api/materials.ts` - Materials CRUD operations
- `lib/api/categories.ts` - Categories CRUD operations
- `lib/api/gallery.ts` - Gallery items CRUD operations
- `lib/api/testimonials.ts` - Testimonials CRUD operations

### Usage Example

```typescript
import { materialsApi, categoriesApi } from '@/lib/api'

// Fetch all materials
const materials = await materialsApi.getAll()

// Create new material
const newMaterial = await materialsApi.create({
  name: "Italian Marble",
  description: "Luxurious natural stone",
  categoryId: "cat1",
  image: "/uploads/marble.jpg",
  colors: ["#F5F5DC", "#E8E8E8"],
  features: ["Durable", "Heat resistant"],
  startingPrice: "$15.99/sq ft",
  featured: true
})

// Update material
await materialsApi.update("mat1", { featured: false })

// Delete material
await materialsApi.delete("mat1")
```

### Backend Configuration

Set your API base URL in `.env.local`:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000/api
```

Currently using mock data for demonstration. Replace the mock data imports with actual API calls when ready.

## Image Upload

The `ImageUpload` component (`components/shared/image-upload.tsx`) is ready for backend integration. Update the `handleFileChange` function to upload to your storage service (S3, Cloudinary, etc.).

Example integration:

```typescript
const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0]
  if (file) {
    const formData = new FormData()
    formData.append('file', file)
    
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    })
    
    const { url } = await response.json()
    setPreview(url)
    onChange(url)
  }
}
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Other Platforms

Build the production bundle:

```bash
npm run build
npm start
```

## Environment Variables

Required environment variables:

```env
# API Configuration
NEXT_PUBLIC_API_BASE_URL=your_backend_api_url

# Add other required env vars from your backend
```

## Database Schema

The admin panel works with the following collections:
- ApplicationType
- Categories
- ClientJourney
- FAQCategories
- GalleryItems
- Materials
- Testimonials

Refer to the JSON schemas in your backend documentation for field details.

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## Support

For issues or questions, please contact your development team.

## License

Proprietary - All rights reserved
