"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [dashboard, setDashboard] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [error, setError] = useState("");
  const router = useRouter();

  // Get JWT token from localStorage
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    if (!token) {
      router.push("/login");
      return;
    }

    // Fetch dashboard data
    fetch("http://127.0.0.1:8000/api/auth/dashboard/", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        setDashboard(data);
      })
      .catch(err => setError("Failed to load dashboard."))
      .finally(() => setLoading(false));

    // Fetch predictions history
    fetch("http://127.0.0.1:8000/api/predictions/history/", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => setPredictions(data))
      .catch(err => console.log(err));
  }, []);

  if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;

  if (error) return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;

  return (
    <div style={styles.container}>
      <h1 style={styles.welcome}>{dashboard?.welcome_message}</h1>

      <div style={styles.summary}>
        <div style={styles.card}>
          <h2>Total Predictions</h2>
          <p>{dashboard?.total_predictions}</p>
        </div>
        <div style={styles.card}>
          <h2>Latest Yield</h2>
          <p>{dashboard?.latest_yield ?? "No predictions yet"}</p>
        </div>
      </div>

      <h2 style={styles.historyTitle}>Prediction History</h2>
      {predictions.length === 0 ? (
        <p>No predictions yet.</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Seed Variety</th>
              <th>Yield</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {predictions.map(p => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.seed_variety}</td>
                <td>{p.yield_prediction}</td>
                <td>{new Date(p.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

// --------------------
// Internal CSS
// --------------------
const styles = {
  container: {
    maxWidth: "1000px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  welcome: {
    textAlign: "center",
    color: "#2F855A",
  },
  summary: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    marginTop: "20px",
    gap: "20px",
  },
  card: {
    flex: "1 1 200px",
    padding: "20px",
    backgroundColor: "#EDFDFD",
    borderRadius: "10px",
    textAlign: "center",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  },
  historyTitle: {
    marginTop: "40px",
    marginBottom: "10px",
    textAlign: "center",
    color: "#2B6CB0",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "10px",
  },
  "table th, table td": {
    border: "1px solid #CBD5E0",
    padding: "8px",
    textAlign: "center",
  },
};
