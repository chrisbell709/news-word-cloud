export default async function handler(req, res) {
  const { date, sources } = req.query;
  
  try {
    const apiKey = process.env.NEWS_API_KEY;
    const url = `https://newsapi.org/v2/top-headlines?sources=${sources}&from=${date}&to=${date}&apiKey=${apiKey}`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.status !== 'ok') {
      throw new Error(data.message || 'Error fetching news');
    }
    
    res.status(200).json(data);
  } catch (error) {
    console.error('News API error:', error);
    res.status(500).json({ error: 'Failed to fetch news data' });
  }
}
