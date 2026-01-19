"use client";

import { useRouter } from "next/navigation";

export default function ResourcesPage() {
  const router = useRouter();

  return (
    <div className="resources-container">
      <style>{`
        .resources-container {
          max-width: 1000px;
          margin: 0 auto;
          padding: 40px 20px;
          font-family: 'Inter', sans-serif;
          color: #333333ff;
          line-height: 1.6;
        }

        .hero-banner {
          background: #166534;
          color: white;
          padding: 60px 40px;
          border-radius: 24px;
          margin-bottom: 50px;
          text-align: center;
        }

        .hero-banner h1 { font-size: 2.5rem; margin-bottom: 15px; }
        .hero-banner p { font-size: 1.1rem; opacity: 0.9; max-width: 600px; margin: 0 auto; }

        .resource-section { margin-bottom: 60px; }
        .section-title {
          font-size: 1.8rem;
          color: #166534;
          border-left: 5px solid #22c55e;
          padding-left: 15px;
          margin-bottom: 30px;
        }

        /* Guide Cards */
        .guide-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 25px;
        }

        .step-card {
          background: #f9fafb;
          padding: 30px;
          border-radius: 16px;
          border: 1px solid #e5e7eb;
          transition: 0.3s;
        }

        .step-card:hover { border-color: #22c55e; background: white; box-shadow: 0 10px 20px rgba(0,0,0,0.05); }

        .step-num {
          background: #22c55e;
          color: white;
          width: 35px;
          height: 35px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          font-weight: bold;
          margin-bottom: 15px;
        }

        /* NPK Reference Table */
        .reference-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        .reference-table th { background: #f3f4f6; padding: 15px; text-align: left; font-size: 14px; }
        .reference-table td { padding: 15px; border-bottom: 1px solid #f3f4f6; font-size: 14px; }

        .tag {
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: bold;
        }
        .tag-n { background: #dbeafe; color: #1e40af; }
        .tag-p { background: #fef3c7; color: #92400e; }
        .tag-k { background: #ede9fe; color: #5b21b6; }

        .cta-box {
          background: #ecfdf5;
          padding: 40px;
          border-radius: 20px;
          text-align: center;
          border: 2px dashed #10b981;
        }

        @media (max-width: 600px) {
          .hero-banner { padding: 40px 20px; }
          .section-title { font-size: 1.4rem; }
        }
      `}</style>

      <section className="hero-banner">
        <h1>Farmer's Knowledge Hub</h1>
        <p>Master the science of soil testing and climate tracking to get the most out of your AI predictions.</p>
      </section>

    
      <section className="resource-section">
        <h2 className="section-title">How to Take a Soil Sample</h2>
        <p>Proper sampling is the foundation of accurate yield prediction. Follow this "Zig-Zag" method for the best results.</p>
        
        

        <div className="guide-grid">
          <div className="step-card">
            <div className="step-num">1</div>
            <h3>Clear the Surface</h3>
            <p>Remove weeds, rocks, and organic debris from the surface of the 10-15 spots across your field.</p>
          </div>
          <div className="step-card">
            <div className="step-num">2</div>
            <h3>Dig V-Shaped Holes</h3>
            <p>Dig 15-20cm deep (the "plough layer"). Take a thin slice from the side of the hole.</p>
          </div>
          <div className="step-card">
            <div className="step-num">3</div>
            <h3>Mix and Dry</h3>
            <p>Mix all collected slices in a clean plastic bucket. Air-dry the composite sample before sending it to the lab.</p>
          </div>
        </div>
      </section>

      
      <section className="resource-section">
        <h2 className="section-title">Understanding NPK Values</h2>
        <p>Maize requires different nutrients at different stages. Use this table to understand your AI input values.</p>
        
        

        <table className="reference-table">
          <thead>
            <tr>
              <th>Nutrient</th>
              <th>Role in Maize Growth</th>
              <th>Deficiency Sign</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><span className="tag tag-n">Nitrogen (N)</span></td>
              <td>Rapid leaf growth and stalk strength.</td>
              <td>Yellowing starting at the leaf tip and moving down the midrib.</td>
            </tr>
            <tr>
              <td><span className="tag tag-p">Phosphorus (P)</span></td>
              <td>Root development and early seedling vigor.</td>
              <td>Leaves turning purple or dark blue-green.</td>
            </tr>
            <tr>
              <td><span className="tag tag-k">Potassium (K)</span></td>
              <td>Water regulation and disease resistance.</td>
              <td>Browning/firing of the outer leaf edges.</td>
            </tr>
          </tbody>
        </table>
      </section>

      
      <section className="resource-section">
        <h2 className="section-title">Rainfall & Temperature</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px', alignItems: 'center' }}>
          <div style={{ flex: 1, minWidth: '300px' }}>
            <p>Our AI uses <strong>Annual Rainfall</strong> as a key predictor for grain weight. For maize, the timing of rain is just as important as the amount.</p>
            <ul>
              <li><strong>Critical Period:</strong> Two weeks before and after silking.</li>
              <li><strong>Temperature Stress:</strong> Temperatures above 35°C during pollination can significantly reduce yield.</li>
            </ul>
          </div>
          <div style={{ flex: 1, minWidth: '300px', background: '#fffbeb', padding: '25px', borderRadius: '12px', border: '1px solid #fef3c7' }}>
            <h4 style={{ color: '#92400e', margin: '0 0 10px 0' }}>💡 Rain Gauge Tip</h4>
            <p style={{ fontSize: '14px', margin: 0 }}>If you don't have a digital station, place a simple rain gauge 1 meter above the ground away from buildings or trees to get the most accurate local data.</p>
          </div>
        </div>
      </section>

      
      <div className="cta-box">
        <h3>Ready to test your soil data?</h3>
        <p>Now that you know how to collect your metrics, run a prediction to see your estimated harvest.</p>
        <button 
          className="btn" 
          style={{ background: '#166534', color: 'white', padding: '12px 30px', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', marginTop: '15px' }}
          onClick={() => router.push("/predict")}
        >
          Go to Predictor
        </button>
      </div>
    </div>
  );
}