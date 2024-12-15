"use client";
import axios from "axios";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";

export default function ForgetEmail() {

  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        "/api/users/forgotpassword", 
        { email }
    );
      setMessage(res.data.message);

    } catch (error: any) {
      setError(
        error.res?.data?.error || "Something went wrong"
    );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-6 px-4
     ">
      <div className="bg-white p-8 max-w-md w-full rounded-lg text-center">
        <h1 className="text-xl font-semibold text-gray-800 mb-1">
          FORGET PASSWORD?
        </h1>
        <p className="text-gray-600 mb-4">
          Enter your email to receive a password reset link.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            type="email"
            className="border border-gray-300 rounded-md px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button
            type="submit"
            disabled={loading}
            className="text-white py-2 px-4 rounded-md transition duration-200"
          >
            {loading ? "Sending..." : "SEND RESET LINK"}
          </Button>
        </form>
        {message && (
          <div className="mt-4 bg-green-100 text-green-700 p-3 rounded-md">
            {message}
          </div>
        )}
        {error && (
          <div className="mt-4 bg-red-100 text-red-700 p-3 rounded-md">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
