"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "Something went wrong");
    } else {
      router.push("/login");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md"
      >
        <h1 className="text-2xl mb-4">Sign Up</h1>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <label className="block mb-2 text-black">
          <span>Email</span>
          <input
            type="email"
            className="mt-1 block w-full p-2 border rounded text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className="block mb-4 text-black">
          <span>Password</span>
          <input
            type="password"
            className="mt-1 block w-full p-2 border rounded text-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button
          type="submit"
          className="w-full py-2 rounded bg-blue-500 hover:bg-blue-600 text-white"
        >
          Create account
        </button>
      </form>
    </div>
  );
}
