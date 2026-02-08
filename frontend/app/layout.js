import Header from "./components/Header";
import Footer from "./components/Footer";


export const metadata = {
  title: "AI Maize Yield Predictor",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={styles.body}>
        <Header />
        <main style={styles.main}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

const styles = {
  body: {
    margin: 0,
    fontFamily: "Arial, sans-serif",
  },
  main: {
    minHeight: "80vh",
  },
};
