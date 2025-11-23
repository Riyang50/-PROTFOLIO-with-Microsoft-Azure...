import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const skillCategories = [
  {
    title: "Programming",
    skills: ["Python", "Java", "C Basics"],
  },
  {
    title: "Data Analytics",
    skills: [
      "Pandas",
      "NumPy",
      "Matplotlib",
      "Seaborn",
      "Scikit-learn",
      "EDA",
      "Data Cleaning",
      "Data Visualization",
    ],
  },
  {
    title: "Web Development",
    skills: ["HTML", "CSS", "JavaScript (Basics)", "React (Beginner)"],
  },
  {
    title: "Tools & Platforms",
    skills: ["Git", "GitHub", "Postman", "VS Code", "Jupyter Notebook", "Google Colab"],
  },
  {
    title: "Soft Skills",
    skills: ["Problem Solving", "Debugging", "Teamwork", "Documentation"],
  },
  {
    title: "Other",
    skills: ["API Testing", "Version Control", "Basic SQL", "Learning Mindset"],
  },
]

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-4 bg-muted/30">
      <div className="container max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-balance">Skills & Technologies</h2>
          <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
            Technologies and tools I work with to analyze data and build useful projects
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category) => (
            <Card key={category.title} className="p-6 hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-bold mb-4">{category.title}</h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="px-3 py-1.5 text-sm font-medium hover:bg-primary/20 transition-colors"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
