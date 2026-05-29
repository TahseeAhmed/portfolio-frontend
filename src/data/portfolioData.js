// Central data store for the portfolio
// In a real app, this would come from an API/database

export const personalInfo = {
  name: "Tahseen Ahmed",
  title: "Full Stack Developer",
  subtitle: "Building digital experiences with clean code & creative thinking",
  location: "Sukkur, Sindh, Pakistan",
  institute: "Sukkur IBA University",
  email: "tahseen@email.com",
  github: "https://github.com/tahseenahmed",
  linkedin: "https://linkedin.com/in/tahseenahmed",
  bio: "I'm a passionate Full Stack Developer studying at Sukkur IBA University. I love building scalable web applications that solve real problems. From elegant frontends to robust backends, I craft every layer with care.",
  cvUrl: "/resume.pdf",
};

export const initialSkills = [
  { id: 1, name: "React.js", category: "Frontend", level: "Advanced", icon: "⚛️" },
  { id: 2, name: "Node.js", category: "Backend", level: "Advanced", icon: "🟢" },
  { id: 3, name: "JavaScript", category: "Frontend", level: "Advanced", icon: "🟡" },
  { id: 4, name: "MongoDB", category: "Database", level: "Intermediate", icon: "🍃" },
  { id: 5, name: "Express.js", category: "Backend", level: "Advanced", icon: "🚂" },
  { id: 6, name: "Tailwind CSS", category: "Frontend", level: "Advanced", icon: "🎨" },
  { id: 7, name: "Java", category: "Language", level: "Intermediate", icon: "☕" },
  { id: 8, name: "Python", category: "Language", level: "Intermediate", icon: "🐍" },
  { id: 9, name: "Git & GitHub", category: "Tools", level: "Advanced", icon: "🔧" },
  { id: 10, name: "REST APIs", category: "Backend", level: "Advanced", icon: "🔌" },
  { id: 11, name: "PostgreSQL", category: "Database", level: "Intermediate", icon: "🐘" },
  { id: 12, name: "Docker", category: "Tools", level: "Beginner", icon: "🐳" },
];

export const initialProjects = [
  {
    id: 1,
    title: "ShopNova",
    description: "A full-stack e-commerce platform with cart, payment gateway integration, and real-time inventory management.",
    image: null,
    tech: ["React", "Node.js", "MongoDB", "Stripe"],
    category: "MERN",
    github: "https://github.com/tahseenahmed",
    live: "#",
    featured: true,
  },
  {
    id: 2,
    title: "TaskFlow",
    description: "A Kanban-style project management app with real-time collaboration, drag-and-drop, and team workspaces.",
    image: null,
    tech: ["React", "Socket.io", "Express", "PostgreSQL"],
    category: "MERN",
    github: "https://github.com/tahseenahmed",
    live: "#",
    featured: true,
  },
  {
    id: 3,
    title: "StudyBuddy",
    description: "An AI-powered study assistant for university students, built for Sukkur IBA with smart quiz generation.",
    image: null,
    tech: ["React", "Python", "FastAPI", "OpenAI"],
    category: "AI/ML",
    github: "https://github.com/tahseenahmed",
    live: "#",
    featured: false,
  },
  {
    id: 4,
    title: "CryptoTracker",
    description: "Real-time cryptocurrency dashboard with portfolio tracking, price alerts, and historical charts.",
    image: null,
    tech: ["React", "Node.js", "WebSocket", "Chart.js"],
    category: "Finance",
    github: "https://github.com/tahseenahmed",
    live: "#",
    featured: false,
  },
];

export const timeline = [
  {
    year: "2022",
    title: "Started CS Journey",
    description: "Enrolled at Sukkur IBA University, Computer Science department.",
    type: "education",
  },
  {
    year: "2023",
    title: "First Web Project",
    description: "Built my first full-stack application using MERN stack.",
    type: "project",
  },
  {
    year: "2024",
    title: "Open Source Contributor",
    description: "Started contributing to open source projects on GitHub.",
    type: "achievement",
  },
  {
    year: "2025",
    title: "Freelance Developer",
    description: "Took on freelance projects, delivering 5+ client applications.",
    type: "work",
  },
];
