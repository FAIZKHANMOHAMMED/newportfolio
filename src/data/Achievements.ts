interface Achievement {
  id: string;
  title: string;
  issuer?: string;
  date: string;
  description: string;
  type: 'certification' | 'achievement';
  year: number;
  featured: boolean;
}

export const achievements: Achievement[] = [
  {
    id: "aws-cert",
    title: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services",
    date: "December 2022",
    description: "Professional certification validating expertise in designing distributed applications and systems on AWS. Demonstrated proficiency in deploying scalable, highly available, and fault-tolerant systems.",
    type: "certification",
    year: 2022,
    featured: true
  },
  {
    id: "hackathon",
    title: "1st Place - TechInnovate Hackathon 2023",
    issuer: "TechInnovate Foundation",
    date: "May 2023",
    description: "Led a team of 4 developers to create 'AccessVision' - an AI-powered accessibility tool for visually impaired users, winning first place among 120 teams. The solution is now being developed into a full product.",
    type: "achievement",
    year: 2023,
    featured: true
  },
  {
    id: "google-cloud",
    title: "Google Cloud Professional Developer",
    issuer: "Google",
    date: "March 2022",
    description: "Certification for designing, building, and managing applications on Google Cloud Platform. Specialized in serverless architecture and microservices deployment.",
    type: "certification",
    year: 2022,
    featured: true
  },
  {
    id: "opensource",
    title: "Open Source Contributor Award",
    issuer: "GitHub",
    date: "January 2023",
    description: "Recognized for significant contributions to various open-source projects, including React ecosystem tools and accessibility libraries. Contributed over 200 pull requests and maintained 3 popular libraries with 10k+ stars.",
    type: "achievement",
    year: 2023,
    featured: true
  },
  {
    id: "react-graphql",
    title: "Advanced React & GraphQL Certification",
    issuer: "Frontend Masters",
    date: "October 2022",
    description: "Completed intensive course on advanced React patterns, GraphQL, and state management. Created a full-stack e-commerce application as the capstone project.",
    type: "certification",
    year: 2022,
    featured: false
  }
];

// Helper functions for filtering and sorting achievements
export const getAchievementsByYear = (year: number) => {
  return achievements.filter(achievement => achievement.year === year);
};

export const getAchievementsByType = (type: 'certification' | 'achievement') => {
  return achievements.filter(achievement => achievement.type === type);
};

export const getFeaturedAchievements = () => {
  return achievements.filter(achievement => achievement.featured);
};

export const getAllYears = () => {
  const years = achievements.map(achievement => achievement.year);
  return [...new Set(years)].sort((a, b) => b - a); // Sort in descending order
};

export const getAllIssuers = () => {
  const issuers = achievements.map(achievement => achievement.issuer).filter(Boolean) as string[];
  return [...new Set(issuers)].sort();
};
