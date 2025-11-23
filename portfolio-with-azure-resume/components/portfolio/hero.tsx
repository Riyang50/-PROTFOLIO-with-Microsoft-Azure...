import { Button } from "@/components/ui/button"
import { Download, ArrowRight } from "lucide-react"
import Image from "next/image"

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 pt-20 pb-12 bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <div className="space-y-8 order-2 md:order-1">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance">Aman Kumar</h1>
              <p className="text-2xl md:text-3xl font-semibold text-primary text-pretty">
                Data Analyst & Python Developer
              </p>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-pretty">
                Transforming raw data into actionable insights using Python, SQL, and advanced analytics
              </p>
            </div>
            <div className="flex gap-4 flex-wrap">
              <Button size="lg" asChild className="gap-2">
                <a href="https://example.com/resume.pdf" target="_blank" rel="noopener noreferrer">
                  <Download className="h-5 w-5" />
                  Download Resume
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild className="gap-2 bg-transparent">
                <a href="#contact">
                  Contact Me
                  <ArrowRight className="h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>

          {/* Right side - Profile image */}
          <div className="flex justify-center order-1 md:order-2">
            <div className="relative w-72 h-72 md:w-96 md:h-96">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full blur-3xl" />
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-primary/10 shadow-2xl">
                <Image src="/professional-headshot.png" alt="John Doe" fill className="object-cover" priority />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
