"use client";

import Link from "next/link";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function ProfilePage() {
  
  const [data, setData] = useState();
  const router = useRouter();

  const logout = async () => {
    try {
      const res = await axios.get("/api/users/logout", {});
      console.log("Logged out success!", res.data);
      toast.success("Logged out successfully!");
      router.push("/login");
    } catch (error: any) {
      console.log(
        "Logout failed",
        error.response?.data?.error || error.message
      );
      toast.error(
        error.response?.data?.error || "An unexpected error occurred"
      );
    }
  };

  const getUserDetails = async () => {
    const response = await axios.get("/api/users/me");
    setData(response.data.data._id);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>PROFILE</h1>
      <hr />
      <h4 className="mt-3 rounded-xl p-4 text-black">
        {data === undefined ? (
          "CLICK ON GET USER TO GET YOUR ID"
        ) : (
          <Link href={`/profile/${data}`} className="cursor-pointer">
            {data}
          </Link>
        )}
      </h4>
      <div className="flex justify-center items-center gap-4">
        <Button className="mt-4" onClick={logout}>
          LOGOUT
        </Button>
        <Button className="mt-4" onClick={getUserDetails} variant="outline">
          GET USER
        </Button>
      </div>
    </div>
  );
}
