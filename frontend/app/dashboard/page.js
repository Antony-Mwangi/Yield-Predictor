"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [stats, setStats] = useState({
    total: 0,
    latestYield: "--",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");

    if (!token) {
      router.push("/login");
      return;
    }

    if (storedUsername) {
      setUsername(storedUsername);
    }

    // Placeholder for API data (connect Django later)
    setStats({
      total: 3,
      latestYield: "6.4",
    });
  }, [router]);

  return (
    <main style={styles.page}>
      {/* Profile Card */}
      <section style={styles.profileCard}>
        <div style={styles.avatar}>
          {username ? username.charAt(0).toUpperCase() : "U"}
        </div>
        <div>
          <h3 style={styles.username}>{username || "Farmer"}</h3>
          <p style={styles.role}>Registered Farmer</p>
        </div>

        <button
          style={styles.logoutBtn}
          onClick={() => {
            localStorage.clear();
            router.push("/login");
          }}
        >
          Logout
        </button>
      </section>

      {/* Content Card */}
      <section style={styles.contentCard}>
        <h2 style={styles.title}>Your Farming Insights</h2>

        <div style={styles.stats}>
          <div style={styles.statBox}>
            <h3 style={styles.statNumber}>{stats.latestYield}</h3>
            <p style={styles.statLabel}>Latest Yield (T/Ha)</p>
          </div>

          <div style={styles.statBox}>
            <h3 style={styles.statNumber}>{stats.total}</h3>
            <p style={styles.statLabel}>Predictions Saved</p>
          </div>
        </div>

        <div style={styles.actions}>
          <button
            style={styles.primaryBtn}
            onClick={() => router.push("/predict")}
          >
            New Prediction
          </button>

          <button
            style={styles.secondaryBtn}
            onClick={() => router.push("/history")}
          >
            View History
          </button>
        </div>
      </section>
    </main>
  );
}

const styles = {
  page: {
    minHeight: "85vh",
    backgroundColor: "#f4f6f5",
    padding: 20,
    display: "flex",
    flexDirection: "column",
    gap: 20,
    maxWidth: 1000,
    margin: "0 auto",
  },

  /* Profile */
  profileCard: {
    display: "flex",
    alignItems: "center",
    gap: 15,
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 12,
    boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: "50%",
    backgroundColor: "#2e7d32",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 22,
    fontWeight: "bold",
  },
  username: {
    margin: 0,
    color: "#1b5e20",
  },
  role: {
    margin: 0,
    fontSize: 13,
    color: "#777",
  },
  logoutBtn: {
    marginLeft: "auto",
    backgroundColor: "#c62828",
    color: "#fff",
    border: "none",
    padding: "8px 14px",
    borderRadius: 6,
    cursor: "pointer",
    fontSize: 13,
  },

  /* Content */
  contentCard: {
    backgroundColor: "#ffffff",
    padding: 30,
    borderRadius: 12,
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
  },
  title: {
    marginBottom: 20,
    color: "#1b5e20",
  },
  stats: {
    display: "flex",
    flexWrap: "wrap",
    gap: 20,
    marginBottom: 30,
  },
  statBox: {
    flex: "1 1 200px",
    backgroundColor: "#f1f8f4",
    padding: 20,
    borderRadius: 10,
    textAlign: "center",
  },
  statNumber: {
    fontSize: 26,
    margin: 0,
    color: "#2e7d32",
  },
  statLabel: {
    fontSize: 14,
    color: "#555",
  },
  actions: {
    display: "flex",
    flexWrap: "wrap",
    gap: 15,
  },
  primaryBtn: {
    padding: "12px 20px",
    backgroundColor: "#2e7d32",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    fontSize: 14,
  },
  secondaryBtn: {
    padding: "12px 20px",
    backgroundColor: "#fff",
    color: "#2e7d32",
    border: "1px solid #2e7d32",
    borderRadius: 6,
    cursor: "pointer",
    fontSize: 14,
  },
};
