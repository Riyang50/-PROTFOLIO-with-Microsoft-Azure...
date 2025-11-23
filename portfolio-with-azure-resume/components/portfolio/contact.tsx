import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, Phone, Linkedin, Github, MapPin } from "lucide-react"

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "riyangshumahato540@gmail.com",
    href: "riyangshumahato540@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 6297353939",
    href: "tel:+91 6297353939",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "INDIA",
    href: "#",
  },
]

const socialLinks = [
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/riyangshu-mahato-272b27308?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
  },
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/Riyang50/Full-Stack-Developer-Building-Modern-Web-Solutions",
  },
]

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-4 bg-muted/30">
      <div className="container max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-balance">Get In Touch</h2>
          <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? Feel free to reach out!
          </p>
        </div>

        <div className="grid gap-8">
          {/* Contact Info Cards */}
          <div className="grid sm:grid-cols-3 gap-6">
            {contactInfo.map((item) => (
              <Card key={item.label} className="p-6 text-center hover:shadow-lg transition-shadow duration-300">
                <div className="flex flex-col items-center gap-3">
                  <div className="p-4 rounded-full bg-primary/10">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{item.label}</h3>
                    <a href={item.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      {item.value}
                    </a>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Social Links */}
          <Card className="p-8">
            <h3 className="text-xl font-bold text-center mb-6">Connect With Me</h3>
            <div className="flex justify-center gap-4">
              {socialLinks.map((social) => (
                <Button key={social.label} variant="outline" size="lg" asChild className="gap-2 bg-transparent">
                  <a href={social.href} target="_blank" rel="noopener noreferrer">
                    <social.icon className="h-5 w-5" />
                    {social.label}
                  </a>
                </Button>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
