"use client";

import { useEffect, useState } from "react";

export default function OutputPage() {
  const [paper, setPaper] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem("paper");
    if (stored) setPaper(JSON.parse(stored));
  }, []);

  const totalMarks =
    paper?.sections?.reduce(
      (sum: number, sec: any) =>
        sum + sec.questions.reduce((s: number, q: any) => s + q.marks, 0),
      0
    ) || 0;

  return (
    <div style={{ background: "#f4f4f4", padding: "30px" }}>
      <div style={{ maxWidth: "900px", margin: "auto" }}>

        {/* TOP BAR */}
        <div
          style={{
            background: "#1f1f1f",
            color: "#fff",
            padding: "12px 20px",
            borderRadius: "12px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p style={{ fontSize: "14px" }}>
            Your customized question paper is ready
          </p>

          {/* 🔥 BUTTON GROUP */}
          <div style={{ display: "flex", gap: "10px" }}>

            {/* ✅ REGENERATE */}
            <button
              onClick={async () => {
                const req = localStorage.getItem("lastRequest");

                if (!req) return;

                const res = await fetch("http://localhost:5000/generate", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: req,
                });

                const data = await res.json();

                localStorage.setItem("paper", JSON.stringify(data));

                window.location.reload();
              }}
              style={{
                background: "#fff",
                color: "#000",
                borderRadius: "20px",
                padding: "6px 14px",
                border: "none",
                cursor: "pointer",
                fontSize: "12px",
              }}
            >
              Regenerate
            </button>

            {/* ✅ DOWNLOAD PDF */}
            <button
              onClick={() => {
                const content = document.getElementById("print-area");
                const win = window.open("", "", "width=900,height=650");

                if (win && content) {
                  win.document.write(`
                    <html>
                      <head>
                        <title>Question Paper</title>
                      </head>
                      <body>
                        ${content.innerHTML}
                      </body>
                    </html>
                  `);
                  win.document.close();
                  win.print();
                }
              }}
              style={{
                background: "#fff",
                color: "#000",
                borderRadius: "20px",
                padding: "6px 14px",
                border: "none",
                cursor: "pointer",
                fontSize: "12px",
              }}
            >
              Download as PDF
            </button>

          </div>
        </div>

        {/* 🔥 PRINT AREA */}
        <div id="print-area">

          {/* PAPER */}
          <div
            style={{
              background: "#fff",
              padding: "40px",
              borderRadius: "16px",
              marginTop: "20px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            }}
          >
            {/* HEADER */}
            <h2 style={{ textAlign: "center", fontWeight: "600" }}>
              Delhi Public School, Sector-4, Bokaro
            </h2>

            <p style={{ textAlign: "center", marginTop: "5px" }}>
              Subject: Physics <br />
              Class: X
            </p>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "20px",
                fontSize: "14px",
              }}
            >
              <p>Time Allowed: 1 hour</p>
              <p>Maximum Marks: {totalMarks}</p>
            </div>

            <p style={{ marginTop: "10px", fontSize: "14px" }}>
              All questions are compulsory unless stated otherwise.
            </p>

            {/* STUDENT INFO */}
            <div style={{ marginTop: "15px", fontSize: "14px" }}>
              <p>Name: __________________________</p>
              <p>Roll Number: ____________________</p>
              <p>Class: __________________________</p>
            </div>

            {/* SECTIONS */}
            {paper?.sections?.map((section: any, i: number) => (
              <div key={i} style={{ marginTop: "30px" }}>

                <h3 style={{ fontWeight: "600" }}>
                  {section.title}
                </h3>

                <p style={{ fontWeight: "500", marginTop: "5px" }}>
                  {section.questionType === "MCQ"
                    ? "Multiple Choice Questions"
                    : section.questionType + " Questions"}
                </p>

                <p style={{ fontSize: "13px", color: "#666", marginTop: "5px" }}>
                  {section.instruction || "Attempt all questions"}
                </p>

                {/* QUESTIONS */}
                {section.questions.map((q: any, index: number) => (
                  <div key={index} style={{ marginTop: "12px" }}>
                    <p style={{ lineHeight: "1.6" }}>
                      {index + 1}.{" "}

                      <span
                        style={{
                          background:
                            q.difficulty === "Easy"
                              ? "#e6f4ea"
                              : q.difficulty === "Moderate"
                              ? "#fff4e5"
                              : "#fdecea",
                          color:
                            q.difficulty === "Easy"
                              ? "#2e7d32"
                              : q.difficulty === "Moderate"
                              ? "#ed6c02"
                              : "#d32f2f",
                          padding: "3px 8px",
                          borderRadius: "6px",
                          fontSize: "11px",
                          marginRight: "6px",
                        }}
                      >
                        {q.difficulty}
                      </span>

                      {q.question} [{q.marks}]
                    </p>

                    {/* OPTIONS */}
                    {q.options && (
                      <div style={{ marginLeft: "20px", marginTop: "5px" }}>
                        {q.options.map((opt: string, i: number) => (
                          <p key={i}>
                            {String.fromCharCode(97 + i)}) {opt}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}

            {/* ANSWER KEY */}
            <div style={{ marginTop: "40px" }}>
              <h3 style={{ fontWeight: "600" }}>Answer Key</h3>

              <div style={{ marginTop: "10px", fontSize: "14px" }}>
                {paper?.sections?.map((section: any) =>
                  section.questions.map((q: any, i: number) => (
                    <p key={i}>
                      {i + 1}. {q.answer}
                    </p>
                  ))
                )}
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}