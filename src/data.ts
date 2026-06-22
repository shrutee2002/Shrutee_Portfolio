export interface Project {
  title: string;
  year?: string;
  technologies: string[];
  githubUrl: string;
  highlights: string[];
  description: string;
}

export interface Education {
  degree: string;
  period: string;
  institution: string;
  specialization?: string;
}

export interface SkillGroup {
  category: string;
  skills: { name: string; level: number; x: number; y: number; z: number }[];
}

export interface PortfolioData {
  name: string;
  titles: string[];
  tagline: string;
  location: string;
  phone: string;
  email: string;
  linkedin: string;
  githubUrl: string;
  summary: string;
  skills: SkillGroup[];
  projects: Project[];
  educations: Education[];
  certifications: string[];
}

export const portfolioData: PortfolioData = {
  name: "SHRUTEE BHORIYA",
  titles: ["Data Analyst", "AI & ML Enthusiast", "Python Developer", "Data Visualization Expert"],
  tagline: "MCA Candidate | Specializing in Artificial Intelligence & Machine Learning",
  location: "Greater Noida, India",
  phone: "+91 93548 93032",
  email: "bshruti.1973@gmail.com",
  linkedin: "linkedin.com/in/shrutee-bhoriya-1b3200241",
  githubUrl: "github.com/shrutee2002",
  summary: "MCA candidate specializing in Artificial Intelligence and Machine Learning with hands-on experience in Data Analytics, Machine Learning, and AI Automation through academic and self-driven projects. Proficient in Python, SQL, Pandas, NumPy, Scikit-learn, and data visualization tools for analyzing data and developing data-driven solutions. Experienced in data preprocessing, exploratory data analysis, predictive modeling, dashboard development, and workflow automation. Seeking an entry-level opportunity as a Data Analyst, Business Analyst, Junior Data Scientist, AI/ML Intern, AI Automation Intern, or Software Engineer.",
  skills: [
    {
      category: "Programming & DBMS",
      skills: [
        { name: "Python", level: 90, x: -80, y: 30, z: 40 },
        { name: "SQL", level: 85, x: -40, y: -60, z: 70 },
        { name: "JavaScript", level: 75, x: 20, y: 70, z: -50 },
        { name: "MySQL", level: 80, x: 60, y: -40, z: 60 }
      ]
    },
    {
      category: "Data Analytics & ML",
      skills: [
        { name: "Pandas", level: 88, x: -70, y: -20, z: -30 },
        { name: "NumPy", level: 85, x: -30, y: 80, z: 20 },
        { name: "Scikit-Learn", level: 82, x: 50, y: 40, z: 80 },
        { name: "EDA & Cleaning", level: 88, x: 80, y: -30, z: -40 },
        { name: "Predictive Modeling", level: 80, x: -10, y: -80, z: -60 }
      ]
    },
    {
      category: "AI & Automation",
      skills: [
        { name: "n8n Workflows", level: 85, x: 40, y: -70, z: 30 },
        { name: "Gemini API", level: 80, x: -50, y: 50, z: -80 },
        { name: "Workflow Automation", level: 85, x: 70, y: 80, z: -30 },
        { name: "Prompt Engineering", level: 85, x: -20, y: -20, z: 90 },
        { name: "AI Agents", level: 80, x: 30, y: -10, z: -90 }
      ]
    },
    {
      category: "Tools & BI",
      skills: [
        { name: "Tableau", level: 75, x: 10, y: -90, z: 10 },
        { name: "Microsoft Excel", level: 85, x: -90, y: -70, z: 10 },
        { name: "Chart.js", level: 80, x: 90, y: 20, z: 10 },
        { name: "Git & GitHub", level: 85, x: -60, y: -90, z: -20 },
        { name: "Figma", level: 70, x: -10, y: 90, z: -10 }
      ]
    }
  ],
  projects: [
    {
      title: "AI Fresher Job Agent",
      year: "2026",
      technologies: ["n8n", "Gemini API", "HTTP Requests", "JSON", "GitHub"],
      githubUrl: "https://github.com/shrutee2002/AI-Fresher-Job-Agent",
      highlights: [
        "Developed an AI-powered job search automation agent using n8n and Gemini API to automatically discover, filter, and organize entry-level job opportunities.",
        "Automated parsing of organization details, raw JD requirements, and application pathways, reducing scanning overhead.",
        "Implemented reusable JSON workflow specifications and clean GitHub version pipelines."
      ],
      description: "An intelligent autonomous workflow agent designed to search major recruitment portals, ingest posting data via APIs and scraping, filter roles matching dynamic entry-level skills via semantic matching, and store organized postings."
    },
    {
      title: "E-Commerce Analytics Dashboard",
      year: "2026",
      technologies: ["Python", "Pandas", "MySQL", "Chart.js"],
      githubUrl: "https://github.com/shrutee2002/E-commerce-Analytics-Dashboard",
      highlights: [
        "Architected an end-to-end relational data model to monitor e-commerce revenue streams and customer acquisition dynamics.",
        "Created custom reporting indices using Pandas to track product performance, margins, and churn coefficients.",
        "Created an interactive web visualization portal integrating responsive widgets."
      ],
      description: "A business intelligence application displaying diagnostic and predictive insights for electronic commerce. Includes active tracking, interactive SQL query pipelines, and transaction anomaly auditing."
    },
    {
      title: "Heart Disease Prediction System",
      technologies: ["Python", "Scikit-learn", "Pandas", "NumPy"],
      githubUrl: "https://github.com/shrutee2002/Heart_Disease_Prediction_System.git",
      highlights: [
        "Built a heart disease prediction engine utilizing multi-classifier models optimized for high clinical recall rates.",
        "Implemented rigorous preprocessing including outlier pruning, scaling, and correlation matrix diagnostics.",
        "Engineered visual model validation reports to make diagnostic decision-making interpretable."
      ],
      description: "A machine learning diagnosis assist program assessing cardiovascular hazard levels based on patient vital metrics (age, restbps, chol, slope, thalach) with full cross-validated performance diagnostics."
    },
    {
      title: "AlgoViz – Algorithm Visualizer",
      year: "2026",
      technologies: ["HTML5", "CSS3", "JavaScript"],
      githubUrl: "https://github.com/shrutee2002/AlgoViz-Algorithm_Visualizer",
      highlights: [
        "Designed and implemented high-performance step-by-step sorting, searching, and graph traversal animators.",
        "Constructed intuitive event controls to allow users to pause, rewind, accelerate, or resize visual arrays during cycles.",
        "Created an educational tool simplifying algorithm runtime and spatial complexity concepts."
      ],
      description: "A client-side algorithmic engine displaying sorting algorithms (Bubble, Selection, Quick, Insertion) and search operations in synchronized visual space."
    }
  ],
  educations: [
    {
      degree: "Master of Computer Applications (MCA)",
      period: "2024 – 2026",
      institution: "Chandigarh University",
      specialization: "Artificial Intelligence & Machine Learning"
    },
    {
      degree: "Bachelor of Computer Applications (BCA)",
      period: "2021 – 2024",
      institution: "Institute of Technology and Science"
    }
  ],
  certifications: [
    "Python for Data Science (IBM)",
    "Diploma in Data Science (Honeywell)",
    "AWS Cloud Certification (Grade A)",
    "SQL: Beginner to Advanced",
    "UI/UX Prototyping (Figma)"
  ]
};
