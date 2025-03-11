// pages/index.js
import React from 'react';
import dynamic from 'next/dynamic';

// Use dynamic import to prevent hydration issues
const BubbleWordCloud = dynamic(
  () => import('../components/BubbleWordCloud'),
  { ssr: false }
);

export default function Home() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Word Cloud Visualization</h1>
      <BubbleWordCloud />
    </div>
  );
}
