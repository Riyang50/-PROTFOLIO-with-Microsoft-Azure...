import { Card } from "@/components/ui/card"
import { GraduationCap, MapPin, Briefcase } from "lucide-react"

export default function About() {
  return (
    <section id="about" className="py-24 px-4 bg-muted/30">
      <div className="container max-w-6xl">
        <div className="grid md:grid-cols-3 gap-8">
          {/* About Me Card */}
          <Card className="md:col-span-2 p-8">
            <h2 className="text-3xl font-bold mb-6">About Me</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                I'm <strong>RIYANGSHU MAHATO</strong>, a passionate and self-taught Full Stack Developer focused on 
                building clean, functional, and user-friendly web applications. I love working with modern 
                technologies like <strong>React, Next.js, Node.js, and Tailwind CSS</strong>.
              </p>

              <p>
                Even though I haven't done an internship yet, I have gained strong practical experience through
                self-driven projects—most notably my <strong>CSV Data Visualizer App</strong>, where I implemented 
                file parsing, chart rendering, filtering, and UI components from scratch.
              </p>

              <p>
                I constantly push myself to learn, improve, and explore new tools and technologies. My goal is to 
                become a skilled and industry-ready developer while contributing to real-world impactful projects.
              </p>
            </div>
          </Card>

          {/* Quick Info Cards */}
          <div className="space-y-4">
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Location</h3>
                  <p className="text-sm text-muted-foreground">India</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Experience</h3>
                  <p className="text-sm text-muted-foreground">Beginner / 1+ Year Self-Driven Learning</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <GraduationCap className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Education</h3>
                  <p className="text-sm text-muted-foreground">B.Tech (Pursuing)</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
