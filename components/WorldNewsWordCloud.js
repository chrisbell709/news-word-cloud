// Replace the direct API call with:
const fetchHeadlines = async () => {
  setLoading(true);
  try {
    const formattedDate = new Date(date).toISOString().split('T')[0];
    const response = await fetch(`/api/news?date=${formattedDate}&sources=${sources}`);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch news');
    }
    
    // Extract headlines from the API response
    const headlines = data.articles.map(article => article.title);
    
    // Process headlines into word frequency data
    processHeadlines(headlines);
  } catch (err) {
    console.error("Error fetching headlines:", err);
    setError("Failed to fetch headlines. Please try again later.");
    setLoading(false);
    
    // Fall back to sample data if API fails
    processSampleHeadlines();
  }
};
