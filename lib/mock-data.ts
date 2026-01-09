// Mock data for demonstration purposes

export const mockCategories = [
  { _id: "cat1", name: "Natural Stone", createdAt: "2024-01-15T10:00:00Z" },
  { _id: "cat2", name: "Ceramic & Porcelain", createdAt: "2024-01-16T10:00:00Z" },
  { _id: "cat3", name: "Wood Flooring", createdAt: "2024-01-17T10:00:00Z" },
  { _id: "cat4", name: "Vinyl & Laminate", createdAt: "2024-01-18T10:00:00Z" },
]

export const mockApplicationTypes = [
  { _id: "app1", applicationType: "Residential", createdAt: "2024-01-15T10:00:00Z" },
  { _id: "app2", applicationType: "Commercial", createdAt: "2024-01-15T10:00:00Z" },
  { _id: "app3", applicationType: "Outdoor", createdAt: "2024-01-15T10:00:00Z" },
]

export const mockMaterials = [
  {
    _id: "mat1",
    name: "Italian Marble",
    description: "Luxurious natural stone with elegant veining patterns",
    categoryId: "cat1",
    image: "/italian-marble-flooring.jpg",
    colors: ["#F5F5DC", "#E8E8E8", "#D3D3D3"],
    features: ["Durable and long-lasting", "Heat resistant", "Adds value to property", "Easy to clean"],
    startingPrice: "$15.99/sq ft",
    featured: true,
    createdAt: "2024-01-20T10:00:00Z",
  },
  {
    _id: "mat2",
    name: "Porcelain Tile",
    description: "Modern and versatile ceramic flooring solution",
    categoryId: "cat2",
    image: "/porcelain-tile-flooring.jpg",
    colors: ["#8B7355", "#A0826D", "#B8956A"],
    features: ["Water resistant", "Low maintenance", "Wide variety of styles", "Durable"],
    startingPrice: "$8.99/sq ft",
    featured: false,
    createdAt: "2024-01-21T10:00:00Z",
  },
  {
    _id: "mat3",
    name: "Oak Hardwood",
    description: "Classic hardwood flooring with natural warmth",
    categoryId: "cat3",
    image: "/oak-hardwood-flooring.jpg",
    colors: ["#8B4513", "#A0522D", "#CD853F"],
    features: ["Timeless beauty", "Can be refinished", "Adds warmth", "Natural material"],
    startingPrice: "$12.49/sq ft",
    featured: true,
    createdAt: "2024-01-22T10:00:00Z",
  },
]

export const mockGalleryItems = [
  {
    _id: "gal1",
    title: "Modern Kitchen Design",
    description: "Contemporary kitchen featuring elegant marble flooring",
    image: "/modern-kitchen-marble-flooring.jpg",
    applicationTypeId: "app1",
    tags: ["kitchen", "marble", "modern"],
    isInspirationGalleryVisible: true,
    createdAt: "2024-01-20T10:00:00Z",
  },
  {
    _id: "gal2",
    title: "Office Reception Area",
    description: "Professional commercial space with porcelain tile",
    image: "/office-reception-porcelain-tile.jpg",
    applicationTypeId: "app2",
    tags: ["commercial", "office", "porcelain"],
    isInspirationGalleryVisible: true,
    createdAt: "2024-01-21T10:00:00Z",
  },
  {
    _id: "gal3",
    title: "Outdoor Patio",
    description: "Beautiful outdoor living space with weather-resistant flooring",
    image: "/outdoor-patio-flooring.jpg",
    applicationTypeId: "app3",
    tags: ["outdoor", "patio", "weather-resistant"],
    isInspirationGalleryVisible: false,
    createdAt: "2024-01-22T10:00:00Z",
  },
]

export const mockTestimonials = [
  {
    _id: "test1",
    author: {
      name: "Sarah Johnson",
      role: "Homeowner",
      location: "San Francisco, CA",
      image: "/woman-portrait.png",
    },
    content:
      "The flooring team exceeded our expectations! The Italian marble we chose looks absolutely stunning in our kitchen. Professional service from start to finish.",
    rating: 5,
    featured: true,
    createdAt: "2024-01-20T10:00:00Z",
  },
  {
    _id: "test2",
    author: {
      name: "Michael Chen",
      role: "Interior Designer",
      location: "New York, NY",
      image: "/thoughtful-man-portrait.png",
    },
    content:
      "I've recommended this company to all my clients. Their selection of materials is outstanding and the installation quality is impeccable.",
    rating: 5,
    featured: true,
    createdAt: "2024-01-21T10:00:00Z",
  },
  {
    _id: "test3",
    author: {
      name: "Emily Rodriguez",
      role: "Business Owner",
      location: "Austin, TX",
      image: "/professional-woman.png",
    },
    content:
      "We renovated our entire office with their porcelain tiles. The transformation is incredible and our clients always compliment the space.",
    rating: 4,
    featured: false,
    createdAt: "2024-01-22T10:00:00Z",
  },
]

export const mockClientJourney = [
  {
    _id: "journey1",
    step: 1,
    title: "Initial Consultation",
    description: "Meet with our flooring experts to discuss your vision",
    details: [
      "Free in-home or virtual consultation",
      "Discuss style preferences and budget",
      "Review material samples",
      "Get professional recommendations",
    ],
    duration: "1-2 days",
    icon: "calendar",
    color: "brand.500",
    createdAt: "2024-01-15T10:00:00Z",
  },
  {
    _id: "journey2",
    step: 2,
    title: "Material Selection",
    description: "Choose the perfect flooring for your space",
    details: [
      "Visit our showroom",
      "Compare materials and colors",
      "Review pricing and warranties",
      "Finalize your selection",
    ],
    duration: "3-5 days",
    icon: "grid",
    color: "accent.600",
    createdAt: "2024-01-15T10:00:00Z",
  },
  {
    _id: "journey3",
    step: 3,
    title: "Professional Installation",
    description: "Expert installation by certified professionals",
    details: [
      "Scheduled installation date",
      "Site preparation and protection",
      "Precision installation",
      "Quality inspection and cleanup",
    ],
    duration: "1-3 weeks",
    icon: "wrench",
    color: "secondary.700",
    createdAt: "2024-01-15T10:00:00Z",
  },
]

export const mockFAQCategories = [
  { _id: "faq1", name: "Products & Materials", createdAt: "2024-01-15T10:00:00Z" },
  { _id: "faq2", name: "Design & Consultation", createdAt: "2024-01-15T10:00:00Z" },
  { _id: "faq3", name: "Orders & Shipping", createdAt: "2024-01-15T10:00:00Z" },
  { _id: "faq4", name: "Installation & Maintenance", createdAt: "2024-01-15T10:00:00Z" },
]
