"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";

export default function LoginPage() {
  
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

   
  const onLogin = async () => {
    
    try {
      setLoading(true);
      const res = await axios.post("/api/users/login", user);
      console.log("Login success!", res.data);
      toast.success("Login successful!");
      router.push("/profile");
    } catch (error: any) {
      console.log(
        "Login failed", 
        error.response?.data?.error || error.message
      );
      toast.error(
        error.response?.data?.error || "An unexpected error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else setButtonDisabled(true);
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen  py-8 px-4">
      <div className="w-full max-w-sm bg-white  p-8">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-8">
          {loading ? "Processing" : "LOGIN"}
        </h1>

        <div className="mb-4">
          <Label
            htmlFor="email"
            className="block text-gray-700 font-medium mb-1"
          >
            Email
          </Label>
          <Input
            id="email"
            type="email"
            className="w-full p-2 border border-gray-300 rounded-lg
            focus:outline-none"
            value={user.email}
            onChange={(e) =>
              setUser({
                ...user,
                email: e.target.value,
              })
            }
          />
        </div>

        <div className="mb-6">
          <Label
            htmlFor="password"
            className="block text-gray-700 font-medium mb-1"
          >
            Password
          </Label>
          <Input
            id="password"
            type="password"
            className="w-full p-2 border border-gray-300 rounded-lg 
            focus:outline-none"
            value={user.password}
            onChange={(e) =>
              setUser({
                ...user,
                password: e.target.value,
              })
            }
          />
        </div>

        <Button
          onClick={onLogin}
          className="w-full text-white p-2 rounded-lg  transition-colors"
        >
          {buttonDisabled ? "PLEASE FILL ALL FIELDS " : "LOGIN"}
       
        </Button>

        <p className="text-gray-600 text-center mt-4">
          Dont' have an account ?{" "}
          <Link
            href="/signup"
            className="text-blue-500 hover:underline font-medium text-sm"
          >
            SIGNUP HERE
          </Link>
        </p>

        <div>
          <p className="text-gray-600 text-center mt-6">
          <Link
            href="/forgetpassword"
            className="font-semibold underline text-sm"
          >
            FORGOT PASSWORD CLICK HERE!
          </Link>
        </p>
        </div>
        
      </div>
    </div>
  );
}
