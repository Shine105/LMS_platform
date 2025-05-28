// app/post-signin/page.tsx (or pages/post-signin.tsx if using pages router)
"use client"; // if app router

import { useEffect } from "react";
import { useRouter } from "next/navigation"; // or next/router for pages router
import { useUser } from "@clerk/nextjs";
import { canAccessAdminPages } from "@/permissions/general";

export default function PostSignIn() {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;

    const role = user?.publicMetadata?.role as "admin" | "user" | undefined;
    if (canAccessAdminPages({ role })) {
      router.replace("/admin");
    } else {
      router.replace("/");
    }
  }, [isLoaded, user, router]);

  return <p>Redirecting...</p>;
}
