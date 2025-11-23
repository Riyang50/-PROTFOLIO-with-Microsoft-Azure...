import Navbar from "@/components/navigation/navbar"
import Hero from "@/components/portfolio/hero"
import About from "@/components/portfolio/about"
import Skills from "@/components/portfolio/skills"
import Projects from "@/components/portfolio/projects"
import Contact from "@/components/portfolio/contact"

export default function PortfolioPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
    </>
  )
}
