"use client";

import { useState } from 'react';

export default function ShareButton() {
  const [isCopied, setIsCopied] = useState(false);

  const handleShare = async () => {
    // Get the current page's URL
    const currentUrl = window.location.href;

    try {
      // Use the modern Navigator API to copy to the clipboard
      await navigator.clipboard.writeText(currentUrl);
      
      // Provide feedback to the user
      setIsCopied(true);

      // Reset the button text after 2 seconds
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);

    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <button
      onClick={handleShare}
      className={`font-bold py-2 px-4 rounded-lg transition-colors text-sm ${
        isCopied
          ? 'bg-green-500 text-white'
          : 'bg-gray-600 text-white hover:bg-gray-500'
      }`}
    >
      {isCopied ? 'Link Copied!' : 'Share Link'}
    </button>
  );
}