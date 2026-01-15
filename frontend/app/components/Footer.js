"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        {/* About Section */}
        <div style={styles.section}>
          <h4 style={styles.heading}>
            <span style={{ marginRight: "8px" }}>🌽</span> 
            Maize<span>Wise</span> AI
          </h4>
          <p style={styles.text}>
            Revolutionizing agricultural productivity through precision data 
            and AI-driven soil intelligence.
          </p>
        </div>

        {/* Navigation Section */}
        <div style={styles.section}>
          <h4 style={styles.heading}>Quick Links</h4>
          <ul style={styles.list}>
            <li style={styles.listItem}>
              <Link href="/" style={styles.link}>Home</Link>
            </li>
            <li style={styles.listItem}>
              <Link href="/dashboard" style={styles.link}>Dashboard</Link>
            </li>
            <li style={styles.listItem}>
              <Link href="/predict" style={styles.link}>Predict Yield</Link>
            </li>
            <li style={styles.listItem}>
              <Link href="/resources" style={styles.link}>Farming Guide</Link>
            </li>
          </ul>
        </div>

        {/* Contact Section */}
        <div style={styles.section}>
          <h4 style={styles.heading}>Connect</h4>
          <p style={styles.text}>
            Email:{" "}
            <a href="mailto:support@maizewise.ai" style={styles.highlightLink}>
              support@maizewise.ai
            </a>
          </p>
          <p style={styles.text}>
            Phone:{" "}
            <a href="tel:+254700000000" style={styles.highlightLink}>
              +254 700 000 000
            </a>
          </p>
        </div>
      </div>

      <div style={styles.divider}></div>

      <div style={styles.bottomSection}>
        <p style={styles.copyright}>
          © {new Date().getFullYear()} MaizeWise AI Technologies. All rights reserved.
        </p>
        <p style={styles.disclaimer}>
          <strong>Disclaimer:</strong> Predictions are AI-generated estimates based on provided inputs. 
          Actual yields may vary due to unforeseen environmental conditions.
        </p>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    padding: "60px 20px 40px",
    marginTop: 80,
    backgroundColor: "#0f172a", // Deep Navy to match Header Top Bar
    color: "#94a3b8", // Muted Slate
    fontFamily: "'Inter', sans-serif",
    borderTop: "4px solid #10b981", // Emerald accent top border
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 40,
    maxWidth: 1100,
    margin: "0 auto",
  },
  section: {
    flex: "1 1 250px",
  },
  heading: {
    marginBottom: 20,
    color: "#ffffff", // Pure white for high contrast
    fontSize: "18px",
    fontWeight: "800",
    letterSpacing: "-0.5px",
  },
  text: {
    fontSize: 14,
    lineHeight: 1.8,
    color: "#94a3b8",
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  listItem: {
    marginBottom: "12px",
  },
  link: {
    color: "#94a3b8",
    textDecoration: "none",
    fontSize: 14,
    transition: "color 0.2s ease",
  },
  highlightLink: {
    color: "#10b981", // Emerald Green
    textDecoration: "none",
    fontWeight: "600",
  },
  divider: {
    margin: "40px auto 30px",
    maxWidth: 1100,
    borderTop: "1px solid #1e293b", // Subtle dark divider
  },
  bottomSection: {
    maxWidth: 1100,
    margin: "0 auto",
    textAlign: "center",
  },
  copyright: {
    fontSize: 13,
    color: "#64748b",
    marginBottom: 10,
  },
  disclaimer: {
    fontSize: 11,
    lineHeight: 1.5,
    color: "#475569",
    maxWidth: "800px",
    margin: "0 auto",
  },
};