"use client";

import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <h1 style={styles.title}>AI Maize Yield Predictor</h1>
      <p style={styles.subtitle}>
        Use artificial intelligence to predict maize yield and get smart
        farming recommendations based on soil and weather data.
      </p>

      {/* How it works */}
      <div style={styles.howItWorks}>
        <div style={styles.step}>
          <h3>1. Enter Data</h3>
          <p>Provide soil nutrients, rainfall, and temperature.</p>
        </div>

        <div style={styles.step}>
          <h3>2. AI Analysis</h3>
          <p>Our AI model analyzes your inputs.</p>
        </div>

        <div style={styles.step}>
          <h3>3. Get Prediction</h3>
          <p>Receive yield estimates and recommendations.</p>
        </div>
      </div>

      {/* Call to Action */}
      <div style={styles.buttons}>
        <button
          style={styles.loginBtn}
          onClick={() => router.push("/login")}
        >
          Login
        </button>

        <button
          style={styles.registerBtn}
          onClick={() => router.push("/register")}
        >
          Register
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: 40,
    textAlign: "center",
    maxWidth: 900,
    margin: "auto",
  },
  title: {
    fontSize: 36,
    marginBottom: 15,
    color: "green",
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 40,
  },
  howItWorks: {
    display: "flex",
    justifyContent: "space-between",
    gap: 20,
    marginBottom: 50,
  },
  step: {
    border: "1px solid #ddd",
    padding: 20,
    borderRadius: 8,
    flex: 1,
  },
  buttons: {
    display: "flex",
    justifyContent: "center",
    gap: 20,
  },
  loginBtn: {
    padding: "12px 25px",
    backgroundColor: "green",
    color: "white",
    border: "none",
    cursor: "pointer",
    fontSize: 16,
  },
  registerBtn: {
    padding: "12px 25px",
    backgroundColor: "white",
    color: "green",
    border: "2px solid green",
    cursor: "pointer",
    fontSize: 16,
  },
};
