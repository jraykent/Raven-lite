
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { input } = req.body;

  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [
        {
          role: 'user',
          content: `Analyze the following content using the Raven Lite framework. Return a structured report with bias, narrative summary, persuasion tactics, fact/opinion breakdown, and source credibility.\n\nContent:\n${input}`,
        },
      ],
      temperature: 0.7,
    });

    const result = completion.data.choices[0].message.content;
    res.status(200).json({ result });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: 'Analysis failed' });
  }
}
    