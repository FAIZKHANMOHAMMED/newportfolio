interface PersonalInfo {
  name: string;
  title: string;
  location: string;
  education: string;
  experience: string;
  interests: string[];
  bio: string[];
  skills: string[];
  profileImage: string;
}

export const aboutInfo: PersonalInfo = {
  name: "Faiz Khan Mohammed",
  title: "Full Stack Developer & UI/UX Designer",
  location: "Hyderabad, India",
  education: "Bachelor's in Computer Science",
  experience: "5+ years of development experience",
  interests: ["Web Development", "UI/UX Design", "Open Source", "Tech Innovation"],
  bio: [
    "I'm a passionate full-stack developer with expertise in building modern web applications using React, Node.js, and related technologies.",
    "My journey in web development began over 5 years ago, and I've since worked on a variety of projects ranging from e-commerce platforms to complex enterprise applications.",
    "I specialize in creating responsive, accessible, and performant user interfaces that provide exceptional user experiences.",
    "When I'm not coding, you can find me contributing to open-source projects, exploring new technologies, or sharing my knowledge through technical articles and community engagement."
  ],
  skills: [
    'JavaScript (ES6+)', 'TypeScript', 'React', 'Node.js', 
    'Next.js', 'Express', 'GraphQL', 'Tailwind CSS',
    'MongoDB', 'PostgreSQL', 'AWS', 'Docker',
    'UI/UX Design', 'Responsive Design', 'RESTful APIs'
  ],
  profileImage: "../../assets/images/profileimg.png"
};
