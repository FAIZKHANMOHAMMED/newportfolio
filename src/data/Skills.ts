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
    skills: ["React Js", "Next Js", "HTML", "CSS", "JavaScript", "Tailwind", "Bootstrap", "Responsive Design"],
    featured: true,
  },
  {
    id: "backend",
    name: "Backend Development",
    icon: "Server",
    skills: ["Node Js", "Express Js", "RESTful APIs", "MySQL", "PostgreSQL", "MongoDB", "Firebase"],
    featured: true,
  },
  {
    id: "databases",
    name: "Databases & Storage",
    icon: "Database",
    skills: ["MongoDB", "PostgreSQL", "MySQL", "Firebase"],
    featured: true,
  },
  {
    id: "devops",
    name: "DevOps & Deployment",
    icon: "Terminal",
    skills: ["Git", "GitHub", "Netlify"],
    featured: true,
  },
  {
    id: "languages",
    name: "Programming Languages",
    icon: "Code",
    skills: ["JavaScript"],
    featured: true,
  },
  {
    id: "uiux",
    name: "UI/UX Design",
    icon: "Palette",
    skills: ["Figma", "Adobe XD"],
    featured: true,
  },
  {
    id: "cloud",
    name: "Cloud & Infrastructure",
    icon: "Cloud",
    skills: ["Firebase", "Netlify"],
    featured: false,
  },
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
