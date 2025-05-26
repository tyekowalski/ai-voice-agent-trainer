export default async function handler(req, res) {
  const { message } = req.body;

  const gptResponse = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [{ role: 'user', content: `You are a client in a sales roleplay. The agent said: "${message}". Respond with a realistic objection.` }]
    }),
  });

  const result = await gptResponse.json();
  const text = result.choices?.[0]?.message?.content || 'No response generated';

  res.status(200).json({ text });
}
