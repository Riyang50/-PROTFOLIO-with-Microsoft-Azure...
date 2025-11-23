import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const projects = [
  {
    title: "CSV Data Visualizer",
    description:
      "Simple and interactive tool to upload CSV files and visualize data with charts. Includes data filtering, sorting, and export capabilities.",
    image: "/csv-visualizer.jpg",
    tech: ["React", "Chart.js", "Papa Parse", "Tailwind CSS"],
    demo: "/projects/csv-visualizer",
  },
]

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-4">
      <div className="container max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-balance">Featured Project</h2>
          <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
            Interactive data analysis tool showcasing real-world problem solving
          </p>
        </div>

        <div className="grid place-items-center">
          {projects.map((project) => (
            <Card
              key={project.title}
              className="flex flex-col overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02] max-w-md w-full"
            >
              <div className="relative h-48 overflow-hidden bg-muted">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>

              <CardHeader>
                <CardTitle className="text-balance">{project.title}</CardTitle>
                <CardDescription className="text-pretty leading-relaxed">{project.description}</CardDescription>
              </CardHeader>

              <CardContent className="flex-1">
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>

              <CardFooter>
                <Button size="sm" asChild className="w-full">
                  <Link href={project.demo} className="gap-2">
                    <ExternalLink className="h-4 w-4" />
                    Try Live Demo
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
