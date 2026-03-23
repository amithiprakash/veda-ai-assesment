"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Home, Users, FileText, Brain, BookOpen } from "lucide-react";

export default function Sidebar() {
  const router = useRouter();

  return (
    <div
      className="sidebar"
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        padding: "20px",
      }}
    >
      <h2 className="logo">VedaAI</h2>

      {/* ✅ FIXED BUTTON (NOW WORKS) */}
      <button
        className="primary-btn full glow"
        onClick={() => router.push("/create")}
      >
        + Create Assignment
      </button>

      <nav className="menu">
        <Link href="/">
          <Home size={18} /> Home
        </Link>

        <Link href="#">
          <Users size={18} /> My Groups
        </Link>

        <Link href="/dashboard">
          <FileText size={18} /> Assignments
        </Link>

        <Link href="#">
          <Brain size={18} /> AI Toolkit
        </Link>

        <Link href="#">
          <BookOpen size={18} /> My Library
        </Link>
      </nav>

      {/* ✅ FIXED BOTTOM POSITION */}
      <div style={{ marginTop: "auto" }}>
        <div className="school-card">
          <p>Delhi Public School</p>
          <span>Bokaro Steel City</span>
        </div>
      </div>
    </div>
  );
}