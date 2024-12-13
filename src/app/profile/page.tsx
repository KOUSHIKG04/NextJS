"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function ProfilePage() {

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
  }


  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>PROFILE</h1>
      <hr />
      <Button className="mt-4"
      onClick={logout}>LOGOUT</Button>
    </div>
  );
}
