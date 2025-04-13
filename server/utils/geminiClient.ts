export const getGeminiResponse = async (prompt: string) => {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      }
    );
  
    const data = await response.json();
    return data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response';
  };
  