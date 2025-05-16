// frontend/pages/login.tsx

import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

type LoginResponse = {
  access_token: string;
  token_type: string;
};

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const res = await fetch("https://chemgpt-pro.onrender.com/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const err = await res.json();
        setErrorMsg(err.detail || "Login failed.");
        setLoading(false);
        return;
      }

      const data: LoginResponse = await res.json();
      // Save JWT token in localStorage for now (later you can add a React context)
      localStorage.setItem("chemgpt_token", data.access_token);

      // Redirect to chat or wherever you want after login
      router.push("/chat");
    } catch (err) {
      setErrorMsg("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-slate-100">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-900">
          Log in to ChemGPT
        </h1>
        <form className="space-y-5" onSubmit={handleLogin}>
          <div>
            <label className="block mb-1 text-gray-700 font-medium">Email</label>
            <input
              type="email"
              required
              value={email}
              autoComplete="username"
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-700 font-medium">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                autoComplete="current-password"
                onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(v => !v)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 text-sm"
                tabIndex={-1}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {errorMsg && (
            <div className="text-red-500 text-sm mb-2">{errorMsg}</div>
          )}

          <button
            type="submit"
            className={`w-full py-2 rounded-lg font-semibold bg-blue-600 text-white transition hover:bg-blue-700 ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="mt-4 text-sm text-gray-500 text-center">
          Don't have an account?{" "}
          <Link href="/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
