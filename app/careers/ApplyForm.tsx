"use client";

import { useState } from "react";

export default function ApplyForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [links, setLinks] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `Intern Application (Dev) - ${name || "Unnamed"}`
    );
    const body = encodeURIComponent(
      [
        `Name: ${name}`,
        `Email: ${email}`,
        "",
        "Proof of work:",
        links,
        "",
        "Message:",
        message,
        "",
        "I confirm I am based in Pune and open to a remote internship.",
      ].join("\n")
    );

    // Open default mail client with prefilled subject & body
    window.location.href = `mailto:info@pingmeup.in?subject=${subject}&body=${body}`;
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl mx-auto mt-6 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <textarea
        value={links}
        onChange={(e) => setLinks(e.target.value)}
        placeholder="Links to proof of work (GitHub, projects, portfolio) — paste URLs separated by commas"
        className="mt-4 w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        rows={4}
        required
      />

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Short note (what you want to build / why you)"
        className="mt-4 w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        rows={3}
      />

      <div className="mt-4 flex items-center justify-between gap-4">
        <button
          type="submit"
          className="inline-flex items-center gap-2 px-5 py-3 bg-indigo-600 text-white rounded-full font-medium hover:bg-indigo-700 transition-colors"
        >
          Compose Email & Apply
        </button>
        <p className="text-sm text-gray-500">We’ll reply if we want to chat — no formalities.</p>
      </div>
    </form>
  );
}

