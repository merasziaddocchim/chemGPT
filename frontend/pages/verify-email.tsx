// frontend/pages/verify-email.tsx

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function VerifyEmailPage() {
  const router = useRouter();
  const { token } = router.query;
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState<string>("Verifying your email...");

  useEffect(() => {
    if (!token) return;

    // Call backend to verify email
    fetch(`https://chemgpt-pro.onrender.com/verify-email?token=${token}`)
      .then(async (res) => {
        if (res.ok) {
          setStatus("success");
          setMessage("Your email has been verified! You can now log in.");
        } else {
          const errorData = await res.json().catch(() => ({}));
          setStatus("error");
          setMessage(errorData.detail || "Verification failed. The link may be invalid or expired.");
        }
      })
      .catch(() => {
        setStatus("error");
        setMessage("Something went wrong. Please try again later.");
      });
  }, [token]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-slate-100">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-4 text-blue-900">Email Verification</h1>
        <p className={`mb-6 ${status === "error" ? "text-red-600" : "text-blue-800"}`}>{message}</p>
        {status === "success" && (
          <Link href="/login" className="text-blue-600 underline font-semibold">
            Go to Login
          </Link>
        )}
        {status === "error" && (
          <Link href="/register" className="text-blue-600 underline font-semibold">
            Try Registering Again
          </Link>
        )}
      </div>
    </div>
  );
}
