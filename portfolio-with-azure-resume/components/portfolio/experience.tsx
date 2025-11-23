import { Card } from "@/components/ui/card"
import { Briefcase, Calendar } from "lucide-react"

const experiences = [
  {
    title: "Data Analyst (Self-Driven Projects)",
    company: "Personal Projects",
    period: "2023 - Present",
    location: "Bhilai, Chhattisgarh",
    description: [
      "Analyzed real-world datasets using Python, Pandas, NumPy, and Matplotlib",
      "Performed data cleaning, preprocessing, EDA, and visualization",
      "Built regression and machine learning models using Scikit-learn",
      "Documented project workflows and published work on GitHub",
    ],
  },
  {
    title: "Python Developer (Self-Learning & Projects)",
    company: "Independent Learning",
    period: "2022 - Present",
    location: "Remote",
    description: [
      "Developed automation scripts and mini-apps using Python",
      "Worked with APIs, JSON data, and testing tools like Postman",
      "Practiced version control using Git & GitHub for all projects",
      "Improved problem-solving skills through continuous coding practice",
    ],
  },
  {
    title: "Web Development (Beginner Level)",
    company: "Practice & Academic Work",
    period: "2021 - 2022",
    location: "Remote",
    description: [
      "Built static websites using HTML, CSS, and basic JavaScript",
      "Created responsive layouts and practiced UI fundamentals",
      "Learned core Java programming concepts",
      "Strengthened foundational knowledge in CSE and web technologies",
    ],
  },
];


export default function Experience() {
  return (
    <section id="experience" className="py-24 px-4">
      <div className="container max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-balance">Work Experience</h2>
          <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
            My professional journey and key accomplishments
          </p>
        </div>

        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <Card key={index} className="p-8 hover:shadow-lg transition-shadow duration-300">
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="p-4 rounded-lg bg-primary/10">
                    <Briefcase className="h-8 w-8 text-primary" />
                  </div>
                </div>

                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{exp.title}</h3>
                    <p className="text-lg font-semibold text-primary mb-2">{exp.company}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {exp.period}
                      </span>
                      <span>{exp.location}</span>
                    </div>
                  </div>

                  <ul className="space-y-2">
                    {exp.description.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-muted-foreground">
                        <span className="text-primary mt-1.5">•</span>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
