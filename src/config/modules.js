import {
  LayoutDashboard,
  BookOpen,
  Sparkles,
  Library,
  BadgeCheck,
} from "lucide-react";

export const modules = [
  {
    id: "dashboard",
    title: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
  },

  {
    id: "learning",
    title: "Learning Hub",
    path: "/learning",
    icon: BookOpen,
  },

  {
    id: "studio",
    title: "Prompt Studio",
    path: "/studio",
    icon: Sparkles,
  },

  {
    id: "library",
    title: "Prompt Library",
    path: "/library",
    icon: Library,
  },

  {
    id: "best-practices",
    title: "Best Practices",
    path: "/best-practices",
    icon: BadgeCheck,
  },
];