"use client";

import { use, useState } from "react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e: React.SyntheticEvent) => {
        e.preventDefault();

        // Demo creds
        if (
            email === "demo@jalrakshak.trial" &&
            password === "demo123"
        ) {
            localStorage.setItem("auth", "true");
            window.location.href = "/dashboard";
        } else {
            alert("Invalid demo credentials.");
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-[#0B1120] text-white px-6">
          <div className="w-full max-w-md bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 shadow-2xl">

            {/* Title */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-cyan-400">
                JalRakshak
              </h1>

              <p className="text-gray-400 mt-2">
                Water Monitoring System 
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-5">

              {/* Email */}
              <div>
                <label className="block mb-2 text-sm text-gray-300">
                    Email
                </label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 rounded-xl bg=[#111827] border border-gray-700 focus:outline-none focus:border-cyan-400"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label className="blockmb-2 text-sm text-gray-300">
                    Password
                </label>

                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#111827] border border-gray-700 focus:outline-none focus:border-cyan-400"
                  required
                />
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full bg-cyan-500 hover:bg-cyan-600 transition-all duration-200 p-3 rounded-xl font-semibold text-lg"
              >
                Login
              </button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-8 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl p-4">
              <h2 className="text-cyan-400 font-semibold mb-2">
                Demo Credentials
              </h2>

              <p className="text-sm text-gray-300">
                Email: demo@jalrakshak.trial
              </p>

              <p className="text-sm text-gray-300">
                Password: demo123
              </p>
            </div>

            {/* Signup Redirect */}
            <p className="text-center text-gray-400 mt-6 text-sm">
              Don&apos;t have an account?{" "}
              <a
                href="/signup"
                className="text-cyan-400 hover:underline"
              >
                Sign up
              </a>
            </p>
          </div>
        </main>
    );
}