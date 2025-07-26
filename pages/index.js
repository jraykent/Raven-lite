
import { useState } from 'react';

export default function Home() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const analyze = async () => {
    setLoading(true);
    const res = await fetch('/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input }),
    });
    const data = await res.json();
    setResult(data.result || 'No result returned.');
    setLoading(false);
  };

  return (
    <div style={{ padding: 40, maxWidth: 800, margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <h1>🦅 Raven Lite</h1>
      <textarea
        style={{ width: '100%', height: 200, padding: 10 }}
        placeholder="Paste article or post here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={analyze} disabled={loading} style={{ marginTop: 10, padding: '10px 20px' }}>
        {loading ? 'Analyzing...' : 'Analyze'}
      </button>
      <pre style={{ whiteSpace: 'pre-wrap', marginTop: 20 }}>{result}</pre>
    </div>
  );
}
    