"use client";
import axios from "axios";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useEffect, useState, useCallback } from "react";

export default function VerifyEmailPage() {

  const [error, setError] = useState(false);
  const [verified, setVerified] = useState(false);
  const [token, setToken] = useState("");

  const verifyUserEmail = useCallback(async () => {

    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
    } catch (error: unknown) {
      setError(true);
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data);
      } else {
        console.error("Unknown error");
      }
    }
  },[token]);

  useEffect(() => {
    const urlToken = 
    window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token, verifyUserEmail]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-6 px-4">
      <div className="bg-white p-8 max-w-md w-full text-center">
        {token ? (
          <div className="bg-gray-100 p-4 rounded-md mb-4">
            <h2 className="text-sm font-medium text-gray-600 mb-2">
              Verification Token:
            </h2>
            <p
              className="text-xs font-mono bg-gray-200 p-2 rounded-md text-gray-700 overflow-hidden overflow-ellipsis break-words max-w-full"
              style={{
                overflowY: "auto",
                wordBreak: "break-word",
                maxHeight: "150px",
              }}
            >
              {token}
            </p>
          </div>
        ) : (
          <p className="text-sm text-gray-500 mb-6">
            No token provided. Please check the verification link sent to your
            email.
          </p>
        )}

        {verified && (
          <div className="bg-green-100 p-4 rounded-md mb-6">
            <h2 className="text-lg font-semibold text-green-700">
              Email Verified!
            </h2>
            <p className="text-sm text-gray-600">
              Your email has been successfully verified. You can now log in.
            </p>
          </div>
        )}

        {error && (
          <div className="bg-red-100 p-4 rounded-md mb-6">
            <h2 className="text-lg font-semibold text-red-700">Error!</h2>
            <p className="text-sm text-gray-600">
              There was an issue verifying your email. Please try again later.
            </p>
          </div>
        )}

        {!verified && !error && (
          <p className="text-gray-500 mb-6">
            Please wait while we verify your email. If this takes too long,
            refresh the page or try again later.
          </p>
        )}

        <div className="flex justify-center">
          {verified && (
            <Button>
              <Link
                href="/login"
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition duration-200"
              >
                GO TO LOGIN
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
