import { Suspense } from "react";
import type { Metadata } from "next";
import { AdminLoginForm } from "@/components/admin-login-form";

export const metadata: Metadata = {
  title: "Admin Login",
};

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <Suspense>
        <AdminLoginForm />
      </Suspense>
    </div>
  );
}
