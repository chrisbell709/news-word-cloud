// components/WorldNewsWordCloud.js
import React, { useState, useEffect } from 'react';

const WorldNewsWordCloud = () => {
  const [loading, setLoading] = useState(true);
  const [words, setWords] = useState([]);
  const [date] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    // Sample headlines for demonstration
    const sampleHeadlines = [
      "Global Climate Summit Reaches Historic Agreement",
      "Economic Growth Slows in Asian Markets Amid Trade Tensions",
      "Tech Giants Face New Regulations in European Union",
      "Breakthrough in Renewable Energy Storage Announced",
      "Diplomatic Relations Strained After Border Dispute",
      "Humanitarian Crisis Worsens in Conflict Zones",
      "Space Agency Launches Mission to Study Deep Space"
    ];
    
    // Process headlines into words
    const allWords = sampleHeadlines.join(' ')
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/);
      
    const wordCount = {};
    const stopWords = ['the', 'in', 'on', 'of', 'to', 'and', 'a', 'after', 'by'];
    
    allWords.forEach(word => {
      if (word.length > 2 && !stopWords.includes(word)) {
        wordCount[word] = (wordCount[word] || 0) + 1;
      }
    });
    
    const wordData = Object.entries(wordCount).map(([text, value]) => ({
      text, 
      value: value * 10
    }));
    
    setWords(wordData);
    setLoading(false);
  }, []);

  // Get a color based on word frequency
  const getWordColor = (value) => {
    const hue = 200 + (value / 50) * 160;
    return `hsl(${hue}, 70%, 50%)`;
  };

  // Calculate font size based on word frequency
  const getFontSize = (value) => {
    return Math.max(14, Math.min(48, 12 + value / 2));
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-2">World News Word Cloud</h2>
      <p className="text-gray-600">Based on headlines from {new Date(date).toLocaleDateString()}</p>
      
      <div className="bg-gray-50 p-4 rounded-lg min-h-64 mt-4">
        <div className="flex flex-wrap justify-center items-center gap-3 py-8">
          {words.map((word, index) => (
            <span 
              key={index}
              style={{
                fontSize: `${getFontSize(word.value)}px`,
                color: getWordColor(word.value),
              }}
              className="inline-block px-1 py-0.5"
            >
              {word.text}
            </span>
          ))}
        </div>
      </div>
      
      <div className="mt-4 text-xs text-gray-500">
        <p>Displaying sample data for demonstration</p>
      </div>
    </div>
  );
};

export default WorldNewsWordCloud;
