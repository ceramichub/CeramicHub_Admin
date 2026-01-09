import Link from "next/link"
import { LayoutDashboard, Package, ImageIcon, MessageSquare, HelpCircle, Users, MapPin, Grid } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Header from "@/components/header-bar"

export default function DashboardPage() {
  const stats = [
    { label: "Total Materials", value: "45", icon: Package },
    { label: "Gallery Items", value: "32", icon: ImageIcon },
    { label: "Testimonials", value: "18", icon: MessageSquare },
    { label: "Active Categories", value: "4", icon: Grid },
  ]

  const modules = [
    {
      title: "Materials",
      description: "Manage flooring products, features, and pricing",
      href: "/materials",
      icon: Package,
      color: "text-blue-600",
    },
    {
      title: "Categories",
      description: "Organize flooring product categories",
      href: "/categories",
      icon: Grid,
      color: "text-green-600",
    },
    {
      title: "Gallery Items",
      description: "Manage inspiration gallery and showcase spaces",
      href: "/gallery",
      icon: ImageIcon,
      color: "text-purple-600",
    },
    {
      title: "Testimonials",
      description: "Customer reviews and ratings",
      href: "/testimonials",
      icon: MessageSquare,
      color: "text-orange-600",
    },
    {
      title: "Application Types",
      description: "Residential, Commercial, and Outdoor categories",
      href: "/application-types",
      icon: MapPin,
      color: "text-teal-600",
    },
    {
      title: "Client Journey",
      description: "Manage customer journey steps and workflow",
      href: "/client-journey",
      icon: Users,
      color: "text-pink-600",
    },
    {
      title: "FAQ Categories",
      description: "Organize FAQ sections",
      href: "/faq-categories",
      icon: HelpCircle,
      color: "text-indigo-600",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <Header/>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">Dashboard Overview</h2>
          <p className="text-muted-foreground">Manage your flooring website content efficiently</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardDescription>{stat.label}</CardDescription>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4">Management Modules</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {modules.map((module) => (
              <Link key={module.href} href={module.href}>
                <Card className="transition-all hover:shadow-md hover:border-primary/50 cursor-pointer h-full">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <module.icon className={`h-8 w-8 ${module.color}`} />
                    </div>
                    <CardTitle className="text-lg">{module.title}</CardTitle>
                    <CardDescription>{module.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
