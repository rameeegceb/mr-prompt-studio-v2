import {
  LayoutDashboard,
  BookOpen,
  Sparkles,
  Library,
  ShieldCheck,
  Settings,
  Bot
} from "lucide-react";

export const modules = [
  {
    id: "dashboard",
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/",
  },

  {
    id: "learning",
    title: "Learning Hub",
    icon: BookOpen,
    path: "/learning",
  },

  {
    id: "studio",
    title: "Prompt Studio",
    icon: Sparkles,
    path: "/studio",
  },

  {
    id: "library",
    title: "Prompt Library",
    icon: Library,
    path: "/library",
  },

  {
    id: "best-practices",
    title: "Best Practices",
    icon: ShieldCheck,
    path: "/best-practices",
  },

  {
    id: "settings",
    title: "Settings",
    icon: Settings,
    path: "/settings",
  },

  // Temporary developer page
  {
    id: "ai-test",
    title: "AI Test",
    icon: Bot,
    path: "/ai-test",
  },
];