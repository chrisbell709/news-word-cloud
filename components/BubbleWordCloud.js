import React, { useState, useEffect } from 'react';

const BubbleWordCloud = () => {
  const [loading, setLoading] = useState(true);
  const [words, setWords] = useState([]);
  const [date] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    // Sample headlines for demonstration
    const sampleHeadlines = [
      "Innovation drives modern business growth",
      "Teamwork essential for organizational success",
      "Research shows collaboration improves outcomes",
      "Diversity strengthens workplace culture",
      "Leadership vision shapes company direction",
      "Communication key to effective teams",
      "Cooperation creates stronger communities",
      "Business strategy requires clear definition",
      "Trust builds lasting professional relationships",
      "Unity helps achieve collective goals"
    ];
    
    // Process headlines into words
    const allWords = sampleHeadlines.join(' ')
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/);
      
    const wordCount = {};
    const stopWords = ['the', 'in', 'on', 'of', 'to', 'and', 'a', 'for', 'by'];
    
    allWords.forEach(word => {
      if (word.length > 2 && !stopWords.includes(word)) {
        wordCount[word] = (wordCount[word] || 0) + 1;
      }
    });
    
    const wordData = Object.entries(wordCount).map(([text, value]) => ({
      text, 
      value: value * 15, // Scale up for more dramatic size differences
      angle: Math.random() * 360, // Random rotation
      x: 50 + (Math.random() - 0.5) * 80, // Position within container
      y: 50 + (Math.random() - 0.5) * 80
    }));
    
    setWords(wordData);
    setLoading(false);
  }, []);

  // Get a color based on word
  const getWordColor = (word, value) => {
    // Create deterministic but varied colors
    const colors = [
      '#E41A1C', // red
      '#377EB8', // blue 
      '#4DAF4A', // green
      '#984EA3', // purple
      '#FF7F00', // orange
      '#FFFF33', // yellow
      '#A65628', // brown
      '#F781BF', // pink
      '#999999'  // grey
    ];
    
    // Use the word's first character code to select a color
    const index = word.charCodeAt(0) % colors.length;
    
    // For important words (high frequency), make them bolder colors
    const isImportant = value > 25;
    
    return isImportant ? colors[index] : colors[index];
  };

  // Calculate font size based on word frequency
  const getFontSize = (value) => {
    return Math.max(14, Math.min(48, 12 + value / 8));
  };

  // Get font weight based on importance
  const getFontWeight = (value) => {
    return value > 35 ? 'bold' : 'normal';
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-2 text-center">Daily News Word Cloud</h2>
      <p className="text-gray-600 text-center mb-6">Based on headlines from {new Date(date).toLocaleDateString()}</p>
      
      <div className="relative bg-gray-50 rounded-lg overflow-hidden" style={{ height: '500px' }}>
        {words.map((word, index) => (
          <div
            key={index}
            className="absolute transform transition-all duration-300 hover:scale-110 cursor-pointer"
            style={{
              fontSize: `${getFontSize(word.value)}px`,
              color: getWordColor(word.text, word.value),
              fontWeight: getFontWeight(word.value),
              transform: `rotate(${word.angle % 60 - 30}deg)`,
              left: `${word.x}%`,
              top: `${word.y}%`,
              translate: '-50% -50%',
              zIndex: Math.floor(word.value / 10),
              textShadow: word.value > 35 ? '1px 1px 3px rgba(0,0,0,0.2)' : 'none'
            }}
          >
            {word.text}
          </div>
        ))}
      </div>
      
      <div className="mt-4 text-xs text-gray-500 text-center">
        <p>Displaying sample data for demonstration</p>
      </div>
    </div>
  );
};

export default BubbleWordCloud;
