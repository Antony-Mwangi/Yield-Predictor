export default function Footer() {
  return (
    <footer style={styles.footer}>
      <p>
        © {new Date().getFullYear()} AI Maize Yield Predictor. All rights
        reserved.
      </p>
    </footer>
  );
}

const styles = {
  footer: {
    textAlign: "center",
    padding: 20,
    borderTop: "1px solid #ddd",
    marginTop: 50,
    color: "#555",
  },
};
