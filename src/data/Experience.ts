interface Job {
  id: string;
  company: string;
  title: string;
  period: string;
  responsibilities: string[];
  year: number;
  featured: boolean;
}

export const jobs: Job[] = [
  {
    id: "tech-innovations",
    company: "Tech Innovations Inc.",
    title: "Senior Frontend Developer",
    period: "January 2022 - Present",
    responsibilities: [
      "Led the development of a new customer portal using React, TypeScript, and GraphQL, resulting in a 35% increase in user engagement.",
      "Mentored a team of 4 junior developers, conducting code reviews and pair programming sessions.",
      "Optimized application performance by implementing lazy loading and code splitting, reducing load time by 45%.",
      "Collaborated with UX designers to implement accessible, responsive interfaces following WCAG guidelines."
    ],
    year: 2022,
    featured: true
  },
  {
    id: "new",
    company: "Tech Innovations Inc.",
    title: "Senior Frontend Developer",
    period: "January 2022 - Present",
    responsibilities: [
      "Led the development of a new customer portal using React, TypeScript, and GraphQL, resulting in a 35% increase in user engagement.",
      "Mentored a team of 4 junior developers, conducting code reviews and pair programming sessions.",
      "Optimized application performance by implementing lazy loading and code splitting, reducing load time by 45%.",
      "Collaborated with UX designers to implement accessible, responsive interfaces following WCAG guidelines."
    ],
    year: 2022,
    featured: true
  },
  {
    id: "digital-solutions",
    company: "Digital Solutions Ltd.",
    title: "Full Stack Developer",
    period: "March 2020 - December 2021",
    responsibilities: [
      "Built and maintained multiple RESTful APIs using Node.js and Express, serving data to various client applications.",
      "Developed a real-time notification system using WebSockets, improving user response time by 60%.",
      "Implemented automated testing using Jest and React Testing Library, achieving 80% test coverage.",
      "Contributed to the migration from a monolithic architecture to a microservices-based approach."
    ],
    year: 2020,
    featured: true
  },
  {
    id:"lorem25",
    company:"lorem25",
    title:"lorem25",
    period:"lorem25 ",
  responsibilities:["lorem25","lorem25","lorem25"],
    year:2020,
    featured:true
  },
  {
    id:"lorem2345",
    company:"lorem2345",
    title:"lorem2345",
    period:"lorem2345 ",
  responsibilities:["lorem2345","lorem2345","lorem2345"],
    year:2020,
    featured:true
  },
  {
    id: "webcraft",
    company: "Webcraft Studio",
    title: "Frontend Developer",
    period: "June 2018 - February 2020",
    responsibilities: [
      "Created responsive web applications for clients across various industries using React and SCSS.",
      "Developed and maintained a component library that reduced development time for new projects by 40%.",
      "Collaborated with backend engineers to define API contracts and integrate client-side applications.",
      "Implemented A/B testing strategies that led to a 25% improvement in conversion rates."
    ],
    year: 2018,
    featured: true
  }
];

// Helper functions for filtering and sorting jobs
export const getJobsByYear = (year: number) => {
  return jobs.filter(job => job.year === year);
};

export const getFeaturedJobs = () => {
  return jobs.filter(job => job.featured);
};

export const getAllYears = () => {
  const years = jobs.map(job => job.year);
  return [...new Set(years)].sort((a, b) => b - a); // Sort in descending order
};

export const getAllCompanies = () => {
  const companies = jobs.map(job => job.company);
  return [...new Set(companies)].sort();
};
