'use client';

import { useState } from 'react';

export default function Home() {
  const [contractText, setContractText] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    setLoading(true);
    setSummary('');

    try {
      const response = await fetch('/api/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: contractText }),
      });

      const data = await response.json();
      setSummary(data.summary || 'No summary returned.');
    } catch (error) {
      setSummary('Error generating summary.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ maxWidth: '800px', margin: '40px auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Double Check</h1>
      <p>Paste your contract or legal document below to get an instant AI summary.</p>
      
      <textarea
        rows={10}
        style={{ width: '100%', padding: '10px', fontSize: '16px', marginBottom: '10px' }}
        placeholder="Paste legal text here..."
        value={contractText}
        onChange={(e) => setContractText(e.target.value)}
      />

      <br />

      <button
        onClick={handleSummarize}
        disabled={loading || !contractText}
        style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}
      >
        {loading ? 'Summarizing...' : 'Summarize Contract'}
      </button>

      {summary && (
        <div style={{ marginTop: '20px', padding: '15px', background: '#f4f4f4', borderRadius: '5px' }}>
          <h3>Summary & Key Risks:</h3>
          <p style={{ whiteSpace: 'pre-wrap' }}>{summary}</p>
        </div>
      )}
    </main>
  );
}
