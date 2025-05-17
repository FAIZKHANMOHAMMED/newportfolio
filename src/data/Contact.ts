interface ContactInfo {
  email: string;
  location: string;
  social: {
    id: string;
    name: string;
    url: string;
    icon: string;
  }[];
  resumeUrl: string;
}

export const contactInfo: ContactInfo = {
  email: "john.doe@example.com",
  location: "San Francisco, CA",
  social: [
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
    }
  ],
  resumeUrl: "/resume.pdf"
};
