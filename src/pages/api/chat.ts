import type { NextApiRequest, NextApiResponse } from 'next';
import products from '@/utils/data/products'; // <-- Fix import if needed

type ChatRequestBody = {
  message: string;
};

type ChatResponseData = {
  reply: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ChatResponseData | { error: string }>
) {
  console.log('🔍 Incoming request to /api/chat');

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!process.env.OPENAI_API_KEY) {
    console.error('❌ Missing OpenAI API key');
    return res.status(500).json({ error: 'Server misconfiguration' });
  }

  const { message }: ChatRequestBody = req.body;

  const productListString = products.map(
    (p) => `- ${p.name} ($${p.price}) [${p.category}]`
  ).join('\n');

  const prompt = `
You are a helpful assistant for an e-commerce store.

Here is the current product list:
${productListString}

Customer: ${message}
Assistant:
`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: 'You help users shop online.' },
          { role: 'user', content: prompt },
        ],
      }),
    });

    const data = await response.json();
    console.log('✅ OpenAI response:', JSON.stringify(data, null, 2));

    if (!data.choices || !data.choices[0]?.message?.content) {
      console.error('❌ Invalid response from OpenAI:', data);
      return res.status(500).json({ error: 'Invalid response from OpenAI 2', });
    }

    const reply = data.choices[0].message.content;
    res.status(200).json({ reply });
  } catch (error: any) {
    console.log('❌ API chat error:', error);
    console.error('❌ Error calling OpenAI:', error);
    // Attempt to capture OpenAI-specific errors
  if (error!.response) {
    const errData = await error!.response.json();
    console.log('❌ OpenAI response error:', errData);
  }
    res.status(500).json({ error: 'Something went wrong' });
  }
}
