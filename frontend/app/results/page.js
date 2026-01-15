"use client";

import { useEffect, useState } from "react";

export default function ResultsPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("result");
    if (stored) {
      setData(JSON.parse(stored));
    }
  }, []);

  if (!data) {
    return <p style={{ padding: 40 }}>Loading results...</p>;
  }

  return (
    <div style={{ padding: 40 }}>
      <h2>Prediction Results</h2>

      <h3>
        Yield Prediction: <strong>{data.yield_prediction}</strong> tons/hectare
      </h3>

      <h4>Recommendations</h4>
      <ul>
        {data.recommendations.map((rec, index) => (
          <li key={index}>{rec}</li>
        ))}
      </ul>
    </div>
  );
}
