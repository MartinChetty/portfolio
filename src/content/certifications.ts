import type { Certification } from "@/content/types";

export const certifications: readonly Certification[] = [
  { id: "ccna", name: "Cisco Certified Network Associate (CCNA)", issuers: ["Cisco"] },
  { id: "cisco-ai-technical-practitioner", name: "Cisco AI Technical Practitioner", issuers: ["Cisco"] },
  {
    id: "agentic-ai-bootcamp",
    name: "Complete Agentic AI Bootcamp with LangGraph and LangChain",
    issuers: ["Udemy"],
  },
  {
    id: "generative-ai-with-large-language-models",
    name: "Generative AI with Large Language Models",
    issuers: ["Coursera", "AWS", "DeepLearning.AI"],
  },
  {
    id: "software-automation-testing-program",
    name: "Software Automation Testing Program",
    issuers: ["Simplilearn", "Cisco"],
  },
  { id: "full-stack-web-development", name: "Full Stack Web Development", issuers: ["Tap Academy"] },
  {
    id: "oci-ai-foundations-associate",
    name: "Oracle Cloud Infrastructure (OCI) AI Foundations Associate",
    issuers: ["Oracle Cloud Infrastructure"],
  },
];
