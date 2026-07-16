import type { Project } from "@/content/types";

export const projects: readonly Project[] = [
  {
    id: "ai-document-qa-system",
    name: "AI Document Q&A System",
    description:
      "A production-style Retrieval-Augmented Generation (RAG) application for context-aware answers from uploaded documents.",
    technologies: ["Python", "LangChain", "FAISS", "Groq LLMs", "Streamlit"],
    highlights: [
      "Developed a production-style Retrieval-Augmented Generation (RAG) application using Python, LangChain, FAISS, and Groq LLMs.",
      "Implemented multi-format document ingestion, vector-based retrieval, and semantic search to provide context-aware answers from uploaded documents.",
      "Built an interactive Streamlit interface with source attribution, confidence scoring, and document-based question answering.",
    ],
  },
  {
    id: "agentic-chatbot",
    name: "Agentic Chatbot",
    description:
      "An agentic chatbot supporting intelligent conversational workflows, web search, and AI-powered news summarization.",
    technologies: ["LangGraph", "LangChain", "Streamlit", "Tavily", "Groq LLMs"],
    highlights: [
      "Developed an agentic AI chatbot using LangGraph, LangChain, and Streamlit to support intelligent conversational workflows.",
      "Integrated web search capabilities and AI-powered news summarization using Tavily and Groq LLMs.",
      "Designed modular graph-based workflows to enable multi-step reasoning and dynamic task execution.",
    ],
  },
  {
    id: "ai-india-travel-planner",
    name: "AI India Travel Planner",
    description:
      "An AI-powered travel planning assistant for personalized itineraries, hotel recommendations, and conversational trip planning.",
    technologies: ["LangGraph", "Large Language Models", "Travel APIs", "Streamlit"],
    highlights: [
      "Built an AI-powered travel planning assistant using LangGraph, LLMs, and real-world travel APIs.",
      "Implemented personalized itinerary generation, hotel recommendations, and conversational trip planning based on user preferences.",
      "Developed an interactive Streamlit application with memory-enabled conversations and multi-agent workflow orchestration.",
    ],
  },
  {
    id: "ai-email-agent",
    name: "AI Email Agent",
    description:
      "An AI-powered email assistant that generates and refines professional email responses.",
    technologies: ["Large Language Models", "Prompt Engineering"],
    highlights: [
      "Developed an AI-powered email assistant using Large Language Models (LLMs) to generate professional email responses.",
      "Implemented prompt engineering and workflow automation for personalized email drafting and refinement.",
      "Improved productivity by automating repetitive email composition and communication tasks.",
    ],
  },
];
