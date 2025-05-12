"use client";
import { useState } from "react";
import { Router, useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error);
    } else {
      router.push("/page1");
    }
  }

  /* const userRole = data.roles?.User;
    console.log(data.roles?.User)
    if (userRole === 2001) {
      router.push("/page1");
    } else if (userRole !== 2001) {
      router.push("/page2");
    }
 */
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Log In</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <label className="block mb-2">
          <span className="text-gray-700">Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full p-2 border rounded text-gray-700"
            required
          />
        </label>
        <label className="block mb-4">
          <span className="text-gray-700">Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full p-2 border rounded text-gray-700"
            required
          />
        </label>
        <button
          type="submit"
          className="w-full py-2 rounded bg-blue-600 hover:bg-blue-700 text-white font-semibold"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}
