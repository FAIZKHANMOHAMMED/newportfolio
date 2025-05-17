import { LucideIcon } from 'lucide-react';

interface SkillCategory {
  id: string;
  name: string;
  icon: string;
  skills: string[];
  featured: boolean;
}

export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    name: "Frontend Development",
    icon: "Layout",
    skills: ["React", "TypeScript", "Next.js", "Redux", "HTML5", "CSS3/SCSS", "TailwindCSS", "Material UI", "Framer Motion", "Responsive Design", "SPA", "PWA"],
    featured: true
  },
  {
    id: "backend",
    name: "Backend Development",
    icon: "Server",
    skills: ["Node.js", "Express", "NestJS", "Django", "Flask", "RESTful APIs", "GraphQL", "WebSockets", "Microservices", "API Gateway", "Authentication"],
    featured: true
  },
  {
    id: "databases",
    name: "Databases & Storage",
    icon: "Database",
    skills: ["MongoDB", "PostgreSQL", "MySQL", "Redis", "Firebase", "Supabase", "Prisma ORM", "TypeORM", "SQL", "NoSQL", "Data Modeling"],
    featured: true
  },
  {
    id: "devops",
    name: "DevOps & Deployment",
    icon: "Terminal",
    skills: ["Git", "GitHub Actions", "Docker", "Kubernetes", "CI/CD", "AWS", "Azure", "Vercel", "Netlify", "Linux", "Shell Scripting"],
    featured: true
  },
  {
    id: "languages",
    name: "Programming Languages",
    icon: "Code",
    skills: ["JavaScript", "TypeScript", "Python", "Java", "C++", "Bash", "PHP", "Go", "Rust", "C#"],
    featured: true
  },
  {
    id: "uiux",
    name: "UI/UX Design",
    icon: "Palette",
    skills: ["Figma", "Adobe XD", "Sketch", "Wireframing", "Prototyping", "User Research", "Accessibility", "Color Theory", "Typography"],
    featured: true
  },
  {
    id: "testing",
    name: "Testing & Quality",
    icon: "Lightbulb",
    skills: ["Jest", "React Testing Library", "Cypress", "Selenium", "TDD", "BDD", "Unit Testing", "Integration Testing", "E2E Testing"],
    featured: false
  },
  {
    id: "cloud",
    name: "Cloud & Infrastructure",
    icon: "Cloud",
    skills: ["AWS", "Azure", "Google Cloud", "Serverless", "Lambda", "S3", "EC2", "RDS", "DynamoDB", "Firebase", "Heroku"],
    featured: false
  }
];

// Helper functions for filtering and sorting skill categories
export const getFeaturedSkillCategories = () => {
  return skillCategories.filter(category => category.featured);
};

export const getAllSkillCategories = () => {
  return skillCategories;
};

export const getSkillCategoryById = (id: string) => {
  return skillCategories.find(category => category.id === id);
};

export const getAllSkills = () => {
  const allSkills: string[] = [];
  skillCategories.forEach(category => {
    category.skills.forEach(skill => {
      if (!allSkills.includes(skill)) {
        allSkills.push(skill);
      }
    });
  });
  return allSkills.sort();
};
