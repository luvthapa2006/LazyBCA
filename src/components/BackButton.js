"use client"; // This component needs to be interactive

import { useRouter } from 'next/navigation';

export default function BackButton() {
  const router = useRouter();

  return (
    <button 
      onClick={() => router.back()} // This function goes to the previous page in history
      className="text-cyan-400 hover:text-cyan-300 mb-6 inline-block"
    >
      &larr; Go Back
    </button>
  );
}