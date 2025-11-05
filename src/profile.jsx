import React, { useState } from "react";
import { motion } from "framer-motion";

export default function Profile() {
  const [dark, setDark] = useState(false);

  const skills = [
    "Python",
    "Java",
    "HTML & CSS",
    "JavaScript",
    "React",
    "SQL / DBMS",
    "Machine Learning",
  ];

  const projects = [
    {
      title: "HerVoice — Digital Storytelling",
      desc: "A digital platform enabling multimedia storytelling for women to share their voices online.",
      status: "In Progress",
    },
    {
      title: "Full-Stack Mini Apps",
      desc: "Developed CRUD-based web apps to understand React, Node.js, and DBMS integration.",
      status: "Personal",
    },
  ];

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        dark
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100"
          : "bg-gradient-to-br from-blue-50 via-white to-blue-100 text-gray-900"
      }`}
    >
      <div className="max-w-4xl mx-auto px-6 py-14">
        {/* Theme toggle */}
        <div className="flex justify-end mb-6">
          <button
            onClick={() => setDark(!dark)}
            className="px-3 py-1 text-sm font-semibold rounded-lg border border-gray-400/40 hover:bg-blue-600 hover:text-white transition"
          >
            {dark ? "☀ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>

        {/* Main Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={`rounded-2xl shadow-2xl p-8 backdrop-blur-md border ${
            dark
              ? "bg-gray-800/40 border-gray-700/40"
              : "bg-white/60 border-white/30"
          }`}
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 3 }}
              className="w-28 h-28 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-500 flex items-center justify-center text-white text-3xl font-bold shadow-lg"
            >
              VK
            </motion.div>
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-extrabold tracking-tight">
                Vivek Kumar Rathour
              </h1>
              <p className="text-gray-500 dark:text-gray-400 mt-1">
                2nd Year CSE (AIML) · Full Stack & AI/ML Developer
              </p>
              <div className="flex flex-wrap gap-3 mt-4 justify-center md:justify-start">
                <a
                  href="#"
                  onClick={() => alert("Add your resume link!")}
                  className="px-4 py-2 text-sm rounded-full font-semibold bg-blue-600 text-white hover:bg-blue-700 transition"
                >
                  Download Resume
                </a>
                <a
                  href="mailto:your.email@example.com"
                  className="px-4 py-2 text-sm rounded-full font-semibold border border-gray-400/40 hover:bg-blue-500 hover:text-white transition"
                >
                  Contact Me
                </a>
              </div>
            </div>
          </div>

          {/* About */}
          <div className="mt-10">
            <h2 className="text-xl font-semibold mb-2">About Me</h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              I'm Vivek — a passionate 2nd-year Computer Science (AIML) student
              dedicated to mastering Full Stack Development and Artificial
              Intelligence. I love transforming ideas into impactful projects
              that combine creativity, design, and data-driven intelligence.
            </p>
          </div>

          {/* Skills */}
          <div className="mt-10">
            <h2 className="text-xl font-semibold mb-3">Tech Stack</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <motion.span
                  key={index}
                  whileHover={{ scale: 1.1 }}
                  className={`px-4 py-2 text-sm font-medium rounded-full shadow-sm ${
                    dark
                      ? "bg-gray-700/60 text-gray-100"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div className="mt-10">
            <h2 className="text-xl font-semibold mb-3">Projects</h2>
            <div className="space-y-4">
              {projects.map((p, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  className={`p-4 rounded-xl border shadow-sm transition ${
                    dark
                      ? "border-gray-700 bg-gray-700/40"
                      : "border-gray-200 bg-white/60"
                  }`}
                >
                  <h3 className="font-semibold">{p.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {p.desc}
                  </p>
                  <p className="text-xs text-right mt-1 text-blue-500 font-semibold">
                    {p.status}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="mt-10">
            <h2 className="text-xl font-semibold mb-2">Education</h2>
            <div
              className={`p-4 rounded-xl border ${
                dark
                  ? "bg-gray-700/40 border-gray-700"
                  : "bg-white/60 border-gray-200"
              }`}
            >
              <p className="font-medium">
                B.Tech — Computer Science (Artificial Intelligence & ML)
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                2nd Year • Target CGPA: 9.5+
              </p>
            </div>
          </div>

          {/* Contact */}
          <div className="mt-10">
            <h2 className="text-xl font-semibold mb-3">Connect With Me</h2>
            <div className="flex gap-6 text-blue-500 text-sm font-medium">
              <a href="#" target="_blank" rel="noreferrer">
                GitHub
              </a>
              <a href="#" target="_blank" rel="noreferrer">
                LinkedIn
              </a>
              <a href="#" target="_blank" rel="noreferrer">
                Portfolio
              </a>
            </div>
          </div>

          {/* Footer */}
          <div className="text-xs text-gray-400 mt-8 text-right">
            Last updated: {new Date().toLocaleDateString()}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
