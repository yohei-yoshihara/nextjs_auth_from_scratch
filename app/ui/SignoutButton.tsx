"use client";
import React from "react";
import { logout } from "@/app/actions/auth";

export default function SignoutButton() {
  return (
    <div>
      <button
        className="bg-blue-500 hover:bg-blue-400 text-white font-bold rounded-xl px-4 py-2 m-2"
        onClick={logout}>
        Sign Out
      </button>
    </div>
  );
}
