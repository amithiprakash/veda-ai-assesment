"use client";

import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [assignments, setAssignments] = useState<any[]>([]);

  // 🔥 LOAD ASSIGNMENTS FROM LOCAL STORAGE
  useEffect(() => {
    const stored =
      JSON.parse(localStorage.getItem("assignments") || "[]");

    setAssignments(stored);
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      
      {/* TITLE */}
      <h1 style={{ fontSize: "24px", fontWeight: "600" }}>
        Assignments
      </h1>

      <p style={{ color: "#666", marginBottom: "20px" }}>
        Manage and create assignments for your classes.
      </p>

      {/* FILTER + SEARCH */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <p>Filter By</p>

        <input
          placeholder="Search Assignment"
          style={{
            padding: "8px 12px",
            borderRadius: "20px",
            border: "1px solid #ddd",
            width: "250px",
          }}
        />
      </div>

      {/* EMPTY STATE */}
      {assignments.length === 0 ? (
        <div
          style={{
            height: "60vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            textAlign: "center",
          }}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/4076/4076478.png"
            alt="empty"
            style={{ width: "250px", marginBottom: "20px" }}
          />

          <h2>No assignments yet</h2>

          <p style={{ color: "#666" }}>
            Create your first assignment to get started
          </p>
        </div>
      ) : (
        /* GRID */
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "20px",
          }}
        >
          {assignments.map((a, i) => (
            <div
              key={i}
              style={{
                background: "#fff",
                padding: "20px",
                borderRadius: "16px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
              }}
            >
              <h3 style={{ marginBottom: "10px" }}>{a.title}</h3>

              <p style={{ fontSize: "13px", color: "#555" }}>
                Assigned on: {a.assigned}
              </p>

              <p style={{ fontSize: "13px", color: "#555" }}>
                Due: {a.due}
              </p>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}