"use client";

import React from "react";

export function AuthPage({ isSignIn }: { isSignIn: boolean }) {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gray-100">
      <div className="p-6 m-4 bg-white rounded-xl shadow-md border border-gray-300 max-w-sm w-full">
        <input
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          type="email"
          placeholder="Email"
        />
        <input
          className="w-full mb-6 px-4 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          type="password"
          placeholder="Password"
        />
        <button
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md font-semibold transition"
          onClick={() => {}}
        >
          {isSignIn ? "Sign In" : "Sign Up"}
        </button>
      </div>
    </div>
  );
}
    