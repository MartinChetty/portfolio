import type { SkillGroup } from "@/content/types";

export const skillGroups: readonly SkillGroup[] = [
  { id: "programming-languages", label: "Programming Languages", skills: ["Java", "Python"] },
  {
    id: "ai-and-generative-ai",
    label: "AI & Generative AI",
    skills: [
      "LangChain",
      "LangGraph",
      "Agentic AI",
      "Retrieval-Augmented Generation (RAG)",
      "Prompt Engineering",
      "Large Language Models (LLMs)",
      "Vector Databases",
      "FAISS",
    ],
  },
  { id: "cloud-and-platforms", label: "Cloud & Platforms", skills: ["AWS", "Oracle Cloud Infrastructure (OCI)"] },
  {
    id: "networking-and-infrastructure",
    label: "Networking & Infrastructure",
    skills: ["CCNA", "Computer Networks", "Data Center Fundamentals"],
  },
  {
    id: "tools-and-technologies",
    label: "Tools & Technologies",
    skills: [
      "Git",
      "GitHub",
      "Jira",
      "VS Code",
      "Jupyter Notebook",
      "Streamlit",
      "OpenCV",
      "Jenkins",
      "GitHub Actions",
    ],
  },
  { id: "web-and-databases", label: "Web & Databases", skills: ["HTML", "CSS", "MySQL"] },
  {
    id: "core-computer-science",
    label: "Core Computer Science",
    skills: ["Data Structures & Algorithms", "Object-Oriented Programming (OOP)", "DBMS", "Operating Systems"],
  },
];
