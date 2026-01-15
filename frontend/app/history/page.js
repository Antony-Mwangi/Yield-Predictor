"use client";

import { useEffect, useState } from "react";
import { apiRequest } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function HistoryPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    apiRequest("/predictions/history/", "GET", null, token)
      .then((res) => {
        setData(res || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const viewDetails = (prediction) => {
    localStorage.setItem("result", JSON.stringify(prediction));
    router.push("/results");
  };

  return (
    <div className="history-container">
      <style>{`
        .history-container {
          max-width: 1100px;
          margin: 40px auto;
          padding: 20px;
          font-family: 'Inter', sans-serif;
        }

        .history-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          flex-wrap: wrap;
          gap: 20px;
        }

        .history-header h2 { color: #166534; font-size: 24px; margin: 0; }

        /* Summary Cards */
        .stats-overview {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin-bottom: 40px;
        }
        .stat-card {
          background: white;
          padding: 20px;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
          text-align: center;
        }
        .stat-card span { display: block; color: #6b7280; font-size: 13px; font-weight: 600; text-transform: uppercase; }
        .stat-card strong { font-size: 22px; color: #166534; }

        /* Table Styling */
        .table-wrapper {
          background: white;
          border-radius: 16px;
          border: 1px solid #e5e7eb;
          overflow: hidden;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
        }
        table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }
        thead { background: #f9fafb; border-bottom: 1px solid #e5e7eb; }
        th { padding: 15px 20px; font-size: 13px; font-weight: 600; color: #4b5563; }
        td { padding: 18px 20px; font-size: 14px; border-bottom: 1px solid #f3f4f6; color: #374151; }
        tr:last-child td { border-bottom: none; }
        tr:hover td { background-color: #f0fdf4; cursor: pointer; }

        .yield-badge {
          background: #dcfce7;
          color: #166534;
          padding: 4px 10px;
          border-radius: 6px;
          font-weight: 700;
        }

        .btn-view {
          color: #16a34a;
          font-weight: 600;
          background: none;
          border: none;
          cursor: pointer;
          text-decoration: underline;
        }

        .empty-state {
          text-align: center;
          padding: 60px;
          color: #6b7280;
        }

        @media (max-width: 768px) {
          th:nth-child(3), td:nth-child(3), th:nth-child(4), td:nth-child(4) {
            display: none;
          }
        }
      `}</style>

      <div className="history-header">
        <div>
          <h2>Prediction History</h2>
          <p style={{ color: "#666", fontSize: "14px" }}>Track your soil health and yield trends over time.</p>
        </div>
        <button 
          onClick={() => router.push("/predict")}
          style={{ background: "#16a34a", color: "white", border: "none", padding: "10px 20px", borderRadius: "8px", fontWeight: "600", cursor: "pointer" }}
        >
          + New Prediction
        </button>
      </div>

      {/* Analytics Summary */}
      <div className="stats-overview">
        <div className="stat-card">
          <span>Total Predictions</span>
          <strong>{data.length}</strong>
        </div>
        <div className="stat-card">
          <span>Avg. Yield</span>
          <strong>{data.length > 0 ? (data.reduce((acc, curr) => acc + curr.yield_prediction, 0) / data.length).toFixed(1) : 0} T/ha</strong>
        </div>
        <div className="stat-card">
          <span>Last Soil pH</span>
          <strong>{data.length > 0 ? data[0].ph : "N/A"}</strong>
        </div>
      </div>

      

      <div className="table-wrapper">
        {loading ? (
          <p style={{ padding: "40px", textAlign: "center" }}>Loading your archive...</p>
        ) : data.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Predicted Yield</th>
                <th>Nitrogen (N)</th>
                <th>Rainfall</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((p) => (
                <tr key={p.id} onClick={() => viewDetails(p)}>
                  <td>{new Date(p.created_at).toLocaleDateString()}</td>
                  <td><span className="yield-badge">{p.yield_prediction} T/ha</span></td>
                  <td>{p.nitrogen} mg/kg</td>
                  <td>{p.rainfall} mm</td>
                  <td>
                    <button className="btn-view">View Report</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="empty-state">
            <p>No predictions found. Start by creating your first yield analysis!</p>
          </div>
        )}
      </div>

      

      <div style={{ marginTop: "30px", padding: "20px", background: "#fefce8", borderRadius: "12px", border: "1px solid #fef08a" }}>
        <h4 style={{ margin: "0 0 10px 0", color: "#854d0e" }}>💡 Pro Tip</h4>
        <p style={{ margin: 0, fontSize: "14px", color: "#713f12" }}>
          Comparing history helps identify if your soil is becoming depleted. If your yield predictions are dropping despite consistent rainfall, consider a deep-soil nutrient replenishment.
        </p>
      </div>
    </div>
  );
}