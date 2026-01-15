"use client";

import { useEffect, useState } from "react";
import { apiRequest } from "@/lib/api";

export default function HistoryPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    apiRequest("/predictions/history/", "GET", null, token).then(setData);
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h2>Prediction History</h2>
      {data.map((p) => (
        <div key={p.id} style={{ borderBottom: "1px solid #ccc" }}>
          <p>Date: {p.created_at}</p>
          <p>Yield: {p.yield_prediction}</p>
        </div>
      ))}
    </div>
  );
}
