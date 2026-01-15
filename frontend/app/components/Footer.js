import Link from "next/link";

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        {/* About */}
        <div style={styles.section}>
          <h4 style={styles.heading}>AI Maize Yield Predictor</h4>
          <p style={styles.text}>
            An intelligent farming assistant that helps maize farmers estimate
            crop yield and receive soil-based recommendations using AI.
          </p>
        </div>

        {/* Quick Links */}
        <div style={styles.section}>
          <h4 style={styles.heading}>Quick Links</h4>
          <ul style={styles.list}>
            <li>
              <Link href="/" style={styles.link}>Home</Link>
            </li>
            <li>
              <Link href="/dashboard" style={styles.link}>Dashboard</Link>
            </li>
            <li>
              <Link href="/predict" style={styles.link}>Predict Yield</Link>
            </li>
            {/* <li>
              <Link href="/history" style={styles.link}>History</Link>
            </li> */}
            <li>
              <Link href="/about" style={styles.link}>About</Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div style={styles.section}>
          <h4 style={styles.heading}>Contact</h4>
          <p style={styles.text}>
            Email:{" "}
            <a
              href="mailto:support@maizepredictor.ai"
              style={styles.link}
            >
              support@maizepredictor.ai
            </a>
          </p>
          <p style={styles.text}>
            Phone:{" "}
            <a
              href="tel:+254700000000"
              style={styles.link}
            >
              +254 700 000 000
            </a>
          </p>
        </div>
      </div>

      
      <div style={styles.divider}></div>

    
      <p style={styles.copyright}>
        © {new Date().getFullYear()} AI Maize Yield Predictor. All rights reserved.
      </p>
      <p style={styles.disclaimer}>
        Disclaimer: Predictions are estimates and should be used alongside
        professional agricultural advice.
      </p>
    </footer>
  );
}

const styles = {
  footer: {
    padding: "40px 20px",
    borderTop: "1px solid #ddd",
    marginTop: 60,
    backgroundColor: "#fafafa",
    color: "#555",
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 30,
    maxWidth: 1000,
    margin: "0 auto",
  },
  section: {
    flex: "1 1 250px",
  },
  heading: {
    marginBottom: 10,
    color: "#222",
  },
  text: {
    fontSize: 14,
    lineHeight: 1.6,
  },
  list: {
    listStyle: "none",
    padding: 0,
    fontSize: 14,
  },
  link: {
    color: "#2f7d32",
    textDecoration: "none",
  },
  divider: {
    margin: "30px auto 15px",
    maxWidth: 1000,
    borderTop: "1px solid #ddd",
  },
  copyright: {
    textAlign: "center",
    fontSize: 14,
  },
  disclaimer: {
    textAlign: "center",
    fontSize: 12,
    marginTop: 5,
    color: "#777",
  },
};
