import { useState } from 'react';

export default function Home() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  const handleSend = async () => {
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input }),
    });
    const data = await res.json();
    setResponse(data.text);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>AI Voice Agent Trainer</h1>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={4}
        cols={50}
      />
      <br />
      <button onClick={handleSend}>Send</button>
      <p><strong>Client:</strong> {response}</p>
    </div>
  );
}