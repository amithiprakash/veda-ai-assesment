import express from "express";

const router = express.Router();

const questionBank: any = {
  MCQ: [
    {
      question: "Which law relates voltage, current and resistance?",
      options: ["Newton's Law", "Ohm's Law", "Faraday Law", "Kirchhoff Law"],
      answer: "Ohm's Law",
      difficulty: "Moderate",
    },
    {
      question: "Which device measures voltage?",
      options: ["Ammeter", "Voltmeter", "Ohmmeter", "Wattmeter"],
      answer: "Voltmeter",
      difficulty: "Easy",
    },
  ],

  Short: [
    {
      question: "Explain Ohm’s Law.",
      answer: "V = IR",
      difficulty: "Moderate",
    },
    {
      question: "Define electric current.",
      answer: "Flow of charge",
      difficulty: "Easy",
    },
  ],

  Diagram: [
    {
      question: "Draw a simple electric circuit.",
      answer: "Battery, switch, bulb",
      difficulty: "Easy",
    },
  ],

  Numerical: [
    {
      question: "Calculate current if V=10V and R=5Ω.",
      answer: "2A",
      difficulty: "Easy",
    },
  ],
};

const shuffle = (arr: any[]) => arr.sort(() => Math.random() - 0.5);

router.post("/", (req, res) => {
  try {
    const { questions, instructions } = req.body;

    console.log("📥 Instructions received:", instructions); // DEBUG

    const sections = questions.map((q: any, i: number) => {
      const pool = shuffle([...(questionBank[q.type] || [])]);

      const selected = [];

      for (let i = 0; i < q.count; i++) {
        const item = pool[i % pool.length];
        selected.push(item);
      }

      return {
        title: `Section ${String.fromCharCode(65 + i)}`,
        instruction: instructions, // 🔥 IMPORTANT
        questionType: q.type,
        questions: selected.map((item: any) => ({
          question: item.question,
          marks: q.marks,
          difficulty: item.difficulty,
          options: item.options || null,
          answer: item.answer,
        })),
      };
    });

    res.json({ sections });

  } catch {
    res.status(500).json({ error: "Generation failed" });
  }
});

export default router;