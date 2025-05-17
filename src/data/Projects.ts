import { url } from "inspector";

interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  github: string;
  demo?: string;
  image: string;
  year: number;
  category: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: "creative-ai",
    title: "CreativeAI Studio",
    description: "An advanced AI-powered content creation platform that generates high-quality blog posts, marketing copy, and social media content with customizable tone and style preferences. Features include content scheduling, SEO optimization, and multi-platform publishing.",
    tech: ["React", "TypeScript", "Node.js", "Express", "OpenAI API", "MongoDB", "Tailwind CSS", "Redux"],
    github: "https://github.com/FAIZKHANMOHAMMED/creative-ai-studio",
    demo: "https://creative-ai-studio.vercel.app",
    image: "https://th.bing.com/th/id/OIP.ILdtEhYvZtngSMQPFHGY-AHaHa?rs=1&pid=ImgDetMain",
    year: 2024,
    category: "Web Application",
    featured: true
  },
  {
    id: "ecommerce-analytics",
    title: "E-Commerce Analytics Dashboard",
    description: "A comprehensive analytics dashboard for e-commerce businesses that provides real-time insights into sales performance, inventory management, customer behavior, and marketing campaign effectiveness. Includes customizable widgets and exportable reports.",
    tech: ["Next.js", "TypeScript", "GraphQL", "MongoDB", "Recharts", "Tailwind CSS", "Auth0", "Stripe API"],
    github: "https://github.com/FAIZKHANMOHAMMED/ecommerce-analytics",
    demo: "https://ecommerce-analytics-dashboard.vercel.app",
    image: "https://cdn.dribbble.com/users/7297837/screenshots/16895797/media/59af5eb704a547bfeaf0ebadd97b5e9a.png?compress=1&resize=1000x750&vertical=top",
    year: 2024,
    category: "Web Application",
    featured: true
  },
  {
    id: "collab-space",
    title: "CollabSpace",
    description: "A feature-rich real-time collaboration platform that combines messaging, file sharing, and project management tools. Includes video conferencing, screen sharing, kanban boards, and integrated calendar. Designed for remote teams and cross-functional collaboration.",
    tech: ["React", "Socket.io", "Express", "PostgreSQL", "Redis", "WebRTC", "Firebase", "Styled Components"],
    github: "https://github.com/FAIZKHANMOHAMMED/collab-space",
    demo: "https://collab-space.netlify.app",
    image: "/images/projects/collab-space.jpg",
    year: 2023,
    category: "Web Application",
    featured: true
  },
  {
    id: "health-hub",
    title: "HealthHub",
    description: "A holistic health and wellness platform that combines fitness tracking, nutrition planning, and mental wellbeing features. Includes workout routines, meal planning, meditation guides, and progress tracking with detailed analytics and personalized recommendations.",
    tech: ["React", "Node.js", "MongoDB", "Express", "TensorFlow.js", "PWA", "Tailwind CSS", "Jest"],
    github: "https://github.com/FAIZKHANMOHAMMED/health-hub",
    demo: "https://health-hub-wellness.vercel.app",
    image: "https://th.bing.com/th/id/OIP.MInRGmXnbZZ6gNFWzqPUoAHaHa?pid=ImgDet&w=184&h=184&c=7&dpr=1.3",
    year: 2023,
    category: "Web Application",
    featured: true
  },
  {
    id: "dev-portal",
    title: "DevPortal",
    description: "A developer-focused knowledge sharing platform with integrated documentation tools, code snippet library, and community forums. Features include syntax highlighting, version control integration, and an interactive playground for testing code examples.",
    tech: ["Vue.js", "TypeScript", "Node.js", "PostgreSQL", "GraphQL", "Docker", "Algolia", "Markdown"],
    github: "https://github.com/FAIZKHANMOHAMMED/dev-portal",
    demo: "https://dev-portal-docs.netlify.app",
    image: "/images/projects/dev-portal.jpg",
    year: 2022,
    category: "Web Application",
    featured: false
  }
];

// Helper functions for filtering and sorting projects
export const getProjectsByYear = (year: number) => {
  return projects.filter(project => project.year === year);
};

export const getProjectsByCategory = (category: string) => {
  return projects.filter(project => project.category === category);
};

export const getFeaturedProjects = () => {
  return projects.filter(project => project.featured);
};

export const getAllYears = () => {
  const years = projects.map(project => project.year);
  return [...new Set(years)].sort((a, b) => b - a); // Sort in descending order
};

export const getAllCategories = () => {
  const categories = projects.map(project => project.category);
  return [...new Set(categories)].sort();
};
