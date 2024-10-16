"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

function Verify() {
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setToken(e.target.value);
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // const searchParams = useSearchParams();
    // const email = searchParams?.get("email");

    try {
      const response = await fetch(`${apiBaseUrl}/auth/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, token }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Verification successful", data);
        router.push("/dashboard");
      } else {
        console.error("Verification failed", data);
      }
    } catch (error) {
      console.error("Error verifying email", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-md w-full mx-auto rounded-lg p-6 shadow-lg bg-white dark:bg-gray-900">
        <h2 className="font-bold text-2xl text-gray-800 dark:text-gray-200 text-center">
          Verify Your Email
        </h2>
        <Suspense fallback={<div>Loading...</div>}>
          <VerifyForm
            token={token}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            setEmail={setEmail}
          />
        </Suspense>
      </div>
    </div>
  );
}

interface VerifyFormProps {
  token: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
}

function VerifyForm({
  token,
  handleChange,
  handleSubmit,
  setEmail,
}: VerifyFormProps) {
  const searchParams = useSearchParams();
  const email = searchParams?.get("email");
  if (email) {
    setEmail(email);
  }

  return (
    <>
      <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-2">
        Enter the verification code we sent to {email}.
      </p>
      <form className="mt-6" onSubmit={handleSubmit}>
        <LabelInputContainer className="mb-6">
          <Label htmlFor="token" className="text-gray-700 dark:text-gray-300">
            Verification Code
          </Label>
          <Input
            id="token"
            name="token"
            placeholder="Enter code"
            type="text"
            value={token}
            onChange={handleChange}
            className="focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-indigo-400 dark:focus:border-indigo-400"
          />
        </LabelInputContainer>
        <button
          className="bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600 text-white font-medium rounded-lg h-12 w-full transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-gray-50 dark:focus:ring-offset-gray-900"
          type="submit"
        >
          Verify &rarr;
          <BottomGradient />
        </button>
      </form>
    </>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2", className)}>{children}</div>
  );
};

export default Verify;
