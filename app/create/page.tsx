"use client";

import { useAssignmentStore } from "@/store/useStore";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CreateAssignment() {
  const router = useRouter();

  const {
    assignment,
    setAssignment,
    addQuestion,
    removeQuestion,
  } = useAssignmentStore();

  useEffect(() => {
    if (assignment.questions.length === 0) {
      addQuestion({ type: "MCQ", count: 4, marks: 1 });
      addQuestion({ type: "Short", count: 3, marks: 2 });
    }
  }, []);

  const totalQuestions = assignment.questions.reduce(
    (sum: number, q: any) => sum + q.count,
    0
  );

  const totalMarks = assignment.questions.reduce(
    (sum: number, q: any) => sum + q.count * q.marks,
    0
  );

  return (
    <div className="main">
      <h1 className="title">Create Assignment</h1>

      <div className="card">

        {/* Upload */}
        <div className="upload">
          <p>Choose a file or drag & drop it here</p>
          <button className="btn btn-light">Browse Files</button>
        </div>

        {/* Date */}
        <div className="field">
          <label>Due Date</label>
          <input
            type="date"
            className="input"
            value={assignment.dueDate}
            onChange={(e) =>
              setAssignment({ dueDate: e.target.value })
            }
          />
        </div>

        {/* Header */}
        <div className="header">
          <span>Question Type</span>
          <span style={{ textAlign: "center" }}>No. of Questions</span>
          <span style={{ textAlign: "center" }}>Marks</span>
        </div>

        {/* Rows */}
        {assignment.questions.map((q: any, index: number) => (
          <div className="row" key={index}>

            <div className="type">
              <select
                className="select"
                value={q.type}
                onChange={(e) => {
                  const updated = [...assignment.questions];
                  updated[index].type = e.target.value;
                  setAssignment({ questions: updated });
                }}
              >
                <option value="MCQ">Multiple Choice Questions</option>
                <option value="Short">Short Questions</option>
                <option value="Diagram">Diagram Questions</option>
                <option value="Numerical">Numerical Problems</option>
              </select>

              {assignment.questions.length > 1 && (
                <span
                  className="remove"
                  onClick={() => removeQuestion(index)}
                >
                  ✕
                </span>
              )}
            </div>

            {/* COUNT */}
            <div className="counter">
              <button
                onClick={() => {
                  const updated = [...assignment.questions];
                  if (updated[index].count > 1)
                    updated[index].count--;
                  setAssignment({ questions: updated });
                }}
              >
                −
              </button>

              <span>{q.count}</span>

              <button
                onClick={() => {
                  const updated = [...assignment.questions];
                  updated[index].count++;
                  setAssignment({ questions: updated });
                }}
              >
                +
              </button>
            </div>

            {/* MARKS */}
            <div className="counter">
              <button
                onClick={() => {
                  const updated = [...assignment.questions];
                  if (updated[index].marks > 1)
                    updated[index].marks--;
                  setAssignment({ questions: updated });
                }}
              >
                −
              </button>

              <span>{q.marks}</span>

              <button
                onClick={() => {
                  const updated = [...assignment.questions];
                  updated[index].marks++;
                  setAssignment({ questions: updated });
                }}
              >
                +
              </button>
            </div>
          </div>
        ))}

        {/* Add */}
        <div
          className="add-btn"
          onClick={() =>
            addQuestion({ type: "MCQ", count: 1, marks: 1 })
          }
        >
          <div className="add-circle">+</div>
          Add Question Type
        </div>

        {/* Totals */}
        <div className="totals">
          <p>Total Questions: {totalQuestions}</p>
          <p>Total Marks: {totalMarks}</p>
        </div>

        {/* Instructions */}
        <textarea
          className="textarea"
          placeholder="Eg. Answer any 5 questions..."
          value={assignment.instructions || ""}
          onChange={(e) =>
            setAssignment({
              ...assignment,
              instructions: e.target.value,
            })
          }
        />

        {/* Buttons */}
        <div className="footer">
          <button className="btn btn-light">← Previous</button>

          <button
            className="btn btn-dark"
            onClick={async () => {
              const res = await fetch("http://localhost:5000/generate", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  questions: assignment.questions,
                  instructions: assignment.instructions,
                }),
              });

              const data = await res.json();

              // save paper
              localStorage.setItem("paper", JSON.stringify(data));

              // 🔥 SAVE ASSIGNMENT FOR DASHBOARD
              const existing =
                JSON.parse(localStorage.getItem("assignments") || "[]");

              existing.push({
                title: "Quiz on Electricity",
                assigned: new Date().toLocaleDateString(),
                due: assignment.dueDate || "Tomorrow",
              });

              localStorage.setItem("assignments", JSON.stringify(existing));

              router.push("/output");
            }}
          >
            Next →
          </button>
        </div>

      </div>
    </div>
  );
}