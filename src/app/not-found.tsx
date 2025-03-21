"use client";

import { Button } from "@mui/material";
import { WarningCircle } from "@phosphor-icons/react";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-900">
      {/* Content Container */}
      <div className="bg-white shadow-lg rounded-2xl p-8 text-center max-w-lg">
        {/* Icon */}
        <WarningCircle size={80} weight="bold" className="text-red-500 mb-4 mx-auto" />

        {/* Title */}
        <h1 className="text-3xl font-bold mb-2">Page Not Found</h1>
        <p className="text-gray-600 mb-6">Sorry, the page you are looking for does not exist or has been moved.</p>

        {/* Back to Home Button */}
        <Button
          variant="contained"
          color="primary"
          component={Link}
          href="/"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md"
        >
          Go Back Home
        </Button>
      </div>
    </div>
  );
}
