import {
  BookOpen,
  Sparkles,
  Library,
  BadgeCheck,
  Rocket,
} from "lucide-react";

export const dashboardCards = [
  {
    id: 1,
    title: "Learn Prompt Engineering",
    description:
      "Master Prompt Engineering with enterprise learning content.",
    icon: BookOpen,
    path: "/learning",
    color: "bg-blue-50 text-blue-600",
  },

  {
    id: 2,
    title: "Prompt Studio",
    description:
      "Create, improve, evaluate and convert prompts.",
    icon: Sparkles,
    path: "/studio",
    color: "bg-violet-50 text-violet-600",
  },

  {
    id: 3,
    title: "Prompt Library",
    description:
      "Browse reusable enterprise prompt templates.",
    icon: Library,
    path: "/library",
    color: "bg-emerald-50 text-emerald-600",
  },

  {
    id: 4,
    title: "Best Practices",
    description:
      "Learn enterprise prompting standards.",
    icon: BadgeCheck,
    path: "/best-practices",
    color: "bg-amber-50 text-amber-600",
  },

  {
    id: 5,
    title: "Getting Started",
    description:
      "Understand the platform and your learning journey.",
    icon: Rocket,
    path: "/learning",
    color: "bg-slate-50 text-slate-700",
  },
];