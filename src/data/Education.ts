interface Education {
  id: string;
  degree: string;
  institution: string;
  period: string;
  description: string;
  year: number;
  featured: boolean;
}

export const educations: Education[] = [
  {
    id: "btech",
    degree: "Bachelor of Technology in Computer Science",
    institution: "Jawaharlal Nehru Technological University",
    period: "2017 - 2021",
    description: "Graduated with distinction (8.9 CGPA). Specialized in Web Technologies and Data Structures. Completed thesis on 'Modern Web Application Architecture for Scalable Systems'.",
    year: 2021,
    featured: true
  },
  {
    id: "fullstack",
    degree: "Advanced Full-Stack Web Development",
    institution: "Udacity Nanodegree Program",
    period: "2022",
    description: "Completed intensive program focused on modern JavaScript frameworks, server-side development, and cloud deployment. Developed a full-stack e-commerce platform as capstone project.",
    year: 2022,
    featured: true
  },
  {
    id: "uiux",
    degree: "UI/UX Design Certification",
    institution: "Interaction Design Foundation",
    period: "2021",
    description: "Comprehensive certification in user experience design principles, interaction design, and usability testing. Created multiple design systems and prototypes for web and mobile applications.",
    year: 2021,
    featured: true
  },
  {
    id: "dsa",
    degree: "Data Structures and Algorithms Specialization",
    institution: "Coursera (UC San Diego)",
    period: "2020",
    description: "Completed 6-course specialization covering fundamental data structures, algorithmic techniques, and their applications in software development. Achieved top 5% in peer assessments.",
    year: 2020,
    featured: true
  }
];

// Helper functions for filtering and sorting educations
export const getEducationsByYear = (year: number) => {
  return educations.filter(education => education.year === year);
};

export const getFeaturedEducation = () => {
  return educations.filter(education => education.featured);
};

export const getAllYears = () => {
  const years = educations.map(education => education.year);
  return [...new Set(years)].sort((a, b) => b - a); // Sort in descending order
};

export const getAllInstitutions = () => {
  const institutions = educations.map(education => education.institution);
  return [...new Set(institutions)].sort();
};
