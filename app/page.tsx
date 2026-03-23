"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        textAlign: "center",
      }}
    >
      <img
        src="https://cdn-icons-png.flaticon.com/512/4076/4076478.png"
        style={{ width: "250px", marginBottom: "20px" }}
      />

      <h2>No assignments yet</h2>

      <p style={{ color: "#666" }}>
        Create your first assignment to get started
      </p>

      <button
        onClick={() => router.push("/create")}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          background: "black",
          color: "white",
          borderRadius: "8px",
          border: "none",
          cursor: "pointer",
        }}
      >
        + Create Assignment
      </button>
    </div>
  );
}