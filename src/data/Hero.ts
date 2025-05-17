interface Role {
  text: string;
  color: string;
  delay: number;
}

interface SocialLink {
  id: string;
  name: string;
  url: string;
  icon: string;
}

interface HeroInfo {
  name: string;
  title: string;
  greetings: string[];
  roles: Role[];
  description: string;
  ctaText: string;
  resumeUrl: string;
  socialLinks: SocialLink[];
}

export const heroInfo: HeroInfo = {
  name: "Faiz Khan Mohammed",
  title: "I build things for the web",
  greetings: [
    "Hi, my name is",
    "Welcome to my portfolio",
    "Nice to meet you"
  ],
  roles: [
    { text: "Full Stack Developer", color: "text-highlight", delay: 600 },
    { text: "UI/UX Designer", color: "text-accent-purple", delay: 700 },
    { text: "Programmer", color: "text-accent-teal", delay: 600 }
  ],
  description: "I'm a software engineer specializing in building exceptional digital experiences. Currently, I'm focused on building accessible, human-centered products.",
  ctaText: "Check out my work",
  resumeUrl: "/resume.pdf",
  socialLinks: [
    {
      id: "github",
      name: "GitHub",
      url: "https://github.com/yourusername",
      icon: "Github"
    },
    {
      id: "linkedin",
      name: "LinkedIn",
      url: "https://linkedin.com/in/yourusername",
      icon: "Linkedin"
    },
    {
      id: "twitter",
      name: "Twitter",
      url: "https://twitter.com/yourusername",
      icon: "Twitter"
    },
    {
      id: "instagram",
      name: "Instagram",
      url: "https://instagram.com/yourusername",
      icon: "Instagram"
    },
    {
      id: "facebook",
      name: "Facebook",
      url: "https://facebook.com/yourusername",
      icon: "Facebook"
    }
  ]
};
