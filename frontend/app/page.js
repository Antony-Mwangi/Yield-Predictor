"use client";

import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="landing-page">
      <style>{`
        .landing-page {
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          color: #333;
          line-height: 1.6;
        }

        /* Hero Section */
        .hero {
          background: linear-gradient(rgba(22, 101, 34, 0.8), rgba(22, 101, 34, 0.9)), 
                      url('https://images.unsplash.com/photo-1551731150-40d4f932906d?q=80&w=2000') center/cover;
          color: white;
          padding: 100px 20px;
          text-align: center;
        }

        .hero h1 {
          font-size: clamp(2.5rem, 5vw, 4rem);
          margin-bottom: 20px;
          font-weight: 800;
        }

        .hero p {
          font-size: 1.25rem;
          max-width: 700px;
          margin: 0 auto 40px;
          opacity: 0.9;
        }

        /* Buttons */
        .cta-container {
          display: flex;
          justify-content: center;
          gap: 20px;
          flex-wrap: wrap;
        }

        .btn {
          padding: 15px 35px;
          font-size: 1.1rem;
          font-weight: 700;
          border-radius: 50px;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
          border: none;
        }

        .btn-primary {
          background: #22c55e;
          color: white;
        }

        .btn-secondary {
          background: white;
          color: #166534;
        }

        .btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.2);
        }

        /* Section Styling */
        .section {
          padding: 80px 20px;
          max-width: 1200px;
          margin: auto;
        }

        .section-title {
          text-align: center;
          font-size: 2.2rem;
          color: #166534;
          margin-bottom: 50px;
        }

        /* Info Grid */
        .info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
        }

        .card {
          padding: 30px;
          border-radius: 20px;
          background: #f0fdf4;
          border: 1px solid #dcfce7;
          transition: 0.3s;
        }

        .card h3 {
          color: #15803d;
          margin-bottom: 15px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        /* Maize Farming Section */
        .maize-content {
          display: flex;
          align-items: center;
          gap: 50px;
          flex-wrap: wrap;
        }

        .maize-text {
          flex: 1;
          min-width: 300px;
        }

        .maize-text ul {
          list-style: none;
          padding: 0;
        }

        .maize-text li {
          margin-bottom: 15px;
          padding-left: 30px;
          position: relative;
        }

        .maize-text li::before {
          content: '✔';
          position: absolute;
          left: 0;
          color: #22c55e;
          font-weight: bold;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .hero { padding: 60px 20px; }
          .section { padding: 40px 20px; }
          .info-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* Hero */}
      <section className="hero">
        <h1>Harvesting the Future with AI</h1>
        <p>
          Empowering maize farmers with precision data. Predict your yields, 
          optimize soil health, and maximize profitability with our 
          smart farming assistant.
        </p>
        <div className="cta-container">
          <button className="btn btn-primary" onClick={() => router.push("/register")}>Get Started Free</button>
          <button className="btn btn-secondary" onClick={() => router.push("/login")}>Access Dashboard</button>
        </div>
      </section>

      {/* How It Works */}
      <section className="section">
        <h2 className="section-title">The Three-Step Prediction Process</h2>
        <div className="info-grid">
          <div className="card">
            <h3><span>📊</span> Data Collection</h3>
            <p>Input your NPK (Nitrogen, Phosphorus, Potassium) soil levels along with localized rainfall and temperature metrics.</p>
          </div>
          <div className="card">
            <h3><span>🤖</span> AI Processing</h3>
            <p>Our sophisticated Scikit-Learn model cross-references your data with historical maize yield datasets to identify patterns.</p>
          </div>
          <div className="card">
            <h3><span>📈</span> Strategic Insight</h3>
            <p>Receive a detailed tonnage estimate and specific recommendations on fertilizer application to fill nutrient gaps.</p>
          </div>
        </div>
      </section>

      {/* Farming Knowledge Section */}
      <div style={{background: '#f9fafb'}}>
        <section className="section maize-content">
          <div className="maize-text">
            <h2 style={{color: '#166534'}}>Why Maize Precision Matters</h2>
            <p>
              Maize is a heavy feeder. Small imbalances in soil pH or Nitrogen 
              can lead to up to 40% loss in potential yield. Our tool focuses on:
            </p>
            <ul>
              <li><strong>Optimizing NPK Balance:</strong> Ensure your soil has the exact nutrients for the silk and grain-filling stages.</li>
              <li><strong>Weather Resilience:</strong> Understand how temperature fluctuations affect your specific hybrid varieties.</li>
              <li><strong>Cost Reduction:</strong> Stop over-fertilizing. Apply only what the AI suggests.</li>
            </ul>
          </div>
          <div className="card" style={{flex: 1, minWidth: '300px', background: 'white'}}>
             <h3><span>💡</span> Did You Know?</h3>
             <p>Maize requires between 500mm to 800mm of water throughout its growth cycle. Our AI tracks these thresholds to warn you of potential drought stress before it visible in the leaves.</p>
          </div>
        </section>
      </div>

      {/* Final CTA */}
      <section className="section" style={{textAlign: 'center'}}>
        <h2 className="section-title">Ready to Boost Your Harvest?</h2>
        <p style={{marginBottom: '30px'}}>Join thousands of farmers using data to secure the next harvest.</p>
        <button className="btn btn-primary" onClick={() => router.push("/register")}>Create Your Account</button>
      </section>
    </div>
  );
}