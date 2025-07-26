const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { input } = req.body;

  if (!input || input.trim() === '') {
    return res.status(400).json({ error: 'Input text is required.' });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'user',
          content: `Analyze the following content using the Raven Lite framework. Return a structured report including bias, narrative summary, persuasion tactics, fact/opinion breakdown, and source credibility.\n\nContent:\n${input}`,
        },
      ],
      temperature: 0.7,
    });

    const result = completion.choices[0].message.content;
    res.status(200).json({ result });
  } catch (error) {
    console.error('🔴 GPT API Error:', error.message || error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
