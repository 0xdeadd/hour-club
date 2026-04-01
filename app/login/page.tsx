"use client";

import { useState } from "react";
import { Clock } from "lucide-react";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        window.location.href = "/";
      } else {
        setError("Incorrect password. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-navy-dark flex items-center justify-center px-4">
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber rounded-full blur-[128px] opacity-10" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-navy-light rounded-full blur-[100px] opacity-20" />
      </div>

      <div className="relative w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 text-white font-semibold text-2xl mb-2">
            <Clock className="w-8 h-8 text-amber" aria-hidden="true" />
            <span>The Hour Club</span>
          </div>
          <p className="text-white/50 text-sm">Members Only</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8"
        >
          <label
            htmlFor="password"
            className="block text-sm font-medium text-white/70 mb-2"
          >
            Enter the club password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full px-4 py-3 bg-white/10 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-amber focus:border-transparent"
          />

          {error && (
            <p className="mt-3 text-sm text-red-400">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-4 w-full bg-amber text-navy-dark font-semibold py-3 rounded-lg hover:bg-amber-light transition-colors disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
