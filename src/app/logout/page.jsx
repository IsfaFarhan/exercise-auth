"use client";
import { useRouter } from "next/navigation";
import React from "react";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    // 1. Tell your API to clear the cookie
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    // 2. Redirect client-side to login (or homepage)
    router.push("/login");
  };

  return <button onClick={handleLogout}>Logout</button>;
}
