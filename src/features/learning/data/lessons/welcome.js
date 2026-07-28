const lesson = {
  id: "welcome",

  title: "Welcome to Enterprise Prompt Engineering",

  description:
    "Understand the vision of Prompt Engineering inside the enterprise.",

  duration: 5,

  difficulty: "Beginner",

  objectives: [
    "Understand the purpose of Prompt Engineering",

    "Understand why organizations invest in Prompt Engineering",

    "Understand how this Learning Hub works"
  ],

  sections: [
    {
      type: "hero",

      title: "Welcome",

      content:
        "Welcome to the Enterprise Prompt Engineering Learning Hub. This learning experience is designed to help every employee become confident in designing high-quality prompts that work across AI platforms."
    },

    {
      type: "info",

      title: "Why this course exists",

      content:
        "Prompt Engineering is becoming a core business skill. Instead of teaching isolated tricks, this course teaches repeatable enterprise practices."
    },

    {
      type: "tip",

      title: "Learning Tip",

      content:
        "Complete lessons sequentially. Each lesson builds upon previous concepts."
    }
  ],

  quiz: [
    {
      question:
        "What is the primary goal of this Learning Hub?",

      answers: [
        "Teach enterprise prompt engineering",

        "Teach programming",

        "Teach networking",

        "Teach cloud computing"
      ],

      correct: 0
    }
  ],

  next: "ai-fundamentals",

  previous: null
};

export default lesson;