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
      setSummary(data.summary || data.error || 'Something went wrong.');
    } catch (err) {
      setSummary('Failed to connect to the server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ maxWidth: '700px', margin: '40px auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Double Check 📝</h1>
      <p>Paste your legal contract or document below to get a plain-English summary.</p>

      <textarea
        rows={10}
        style={{ width: '100%', padding: '12px', fontSize: '16px', borderRadius: '8px', border: '1px solid #ccc' }}
        placeholder="Paste contract terms here..."
        value={contractText}
        onChange={(e) => setContractText(e.target.value)}
      />

      <button
        onClick={handleSummarize}
        disabled={loading || !contractText}
        style={{
          marginTop: '12px',
          padding: '12px 24px',
          backgroundColor: loading ? '#ccc' : '#0070f3',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          fontSize: '16px',
          cursor: loading ? 'not-allowed' : 'pointer'
        }}
      >
        {loading ? 'Summarizing...' : 'Summarize Contract'}
      </button>

      {summary && (
        <div style={{ marginTop: '24px', padding: '16px', backgroundColor: '#f4f4f5', borderRadius: '8px' }}>
          <h3>Summary:</h3>
          <p style={{ whiteSpace: 'pre-wrap' }}>{summary}</p>
        </div>
      )}
    </main>
  );
}
