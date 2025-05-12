"use client";
import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LogoutButton from "../logout/page";

export default function Page1() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function checkAuth() {
      let res = await fetch("/api/auth/verify", {
        method: "GET",
        credentials: "include",
      });
      if (res.ok) {
        const { user } = await res.json();
        setUser(user);
      } else if (res.status === 401) {
        const refreshRes = await fetch("/api/auth/refresh", {
          method: "POST",
          credentials: "include",
        });
        if (refreshRes.ok) {
          res = await fetch("/api/auth/verify", {
            method: "GET",
            credentials: "include",
          });
        }
        if (res.ok) {
          const { user } = await res.json();
          setUser(user);
        } else {
          router.replace("/login");
        }
      } else {
        router.replace("/login");
      }
      setLoading(false);
    }
    checkAuth();
  }, [router]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <p>This is page 1</p>
      <LogoutButton />
    </div>
  );
}
