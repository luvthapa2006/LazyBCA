"use client";

import { useState } from 'react';

// The component will now accept a 'shareUrl' prop
export default function ShareButton({ shareUrl }) {
  const [isCopied, setIsCopied] = useState(false);

  const handleShare = async () => {
    // Construct the full URL to be copied
    const fullUrl = `${window.location.origin}${shareUrl}`;

    try {
      await navigator.clipboard.writeText(fullUrl);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (err)
      {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <button
      onClick={handleShare}
      className={`font-bold py-2 px-4 rounded-lg transition-colors w-full md:w-auto text-center ${
        isCopied
          ? 'bg-green-500 text-white'
          : 'bg-gray-600 text-white hover:bg-gray-500'
      }`}
    >
      {isCopied ? 'Copied!' : 'Share'}
    </button>
  );
}