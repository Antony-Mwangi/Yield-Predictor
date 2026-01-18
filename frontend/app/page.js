"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="landing-page">
      <style>{`
        .landing-page {
          font-family: 'Inter', sans-serif;
          color: #333;
          line-height: 1.6;
          scroll-behavior: smooth;
        }

        /* Hero Section */
        .hero {
          background: linear-gradient(rgba(10, 50, 10, 0.7), rgba(10, 50, 10, 0.7)), 
                      url('https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=2000') center/cover;
          color: white;
          padding: 120px 20px;
          text-align: center;
        }

        .hero h1 { font-size: clamp(2.5rem, 6vw, 4.5rem); margin-bottom: 20px; font-weight: 900; letter-spacing: -1px; }
        .hero p { font-size: 1.3rem; max-width: 800px; margin: 0 auto 40px; opacity: 0.95; }

        /* Stats Bar */
        .stats-bar {
          display: flex;
          justify-content: center;
          gap: 40px;
          margin-top: 50px;
          flex-wrap: wrap;
        }
        .stat-item { background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); padding: 20px 40px; border-radius: 15px; border: 1px solid rgba(255,255,255,0.2); }
        .stat-item h2 { margin: 0; font-size: 2rem; }
        .stat-item p { margin: 0; font-size: 0.9rem; font-weight: bold; text-transform: uppercase; color: #4ade80; }

        /* General Section Layout */
        .section { padding: 100px 20px; max-width: 1200px; margin: auto; }
        .section-header { text-align: center; margin-bottom: 60px; }
        .section-header h2 { font-size: 2.5rem; color: #166534; margin-bottom: 10px; }
        .section-header p { color: #666; font-size: 1.1rem; }

        /* Feature Grid */
        .feature-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 30px; }
        .feature-card { padding: 40px; border-radius: 24px; background: #fff; border: 1px solid #e5e7eb; transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1); text-align: center; }
        .feature-card:hover { transform: translateY(-10px); box-shadow: 0 20px 40px rgba(0,0,0,0.05); border-color: #22c55e; }
        
        /* New Image Container for Feature Icons */
        .feature-icon-wrapper {
          width: 80px;
          height: 80px;
          margin: 0 auto 20px;
          background: #f0fdf4;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Knowledge Center */
        .knowledge-bg { background: #f0fdf4; border-radius: 40px; margin: 0 20px; }
        .growth-stages { display: flex; flex-wrap: wrap; gap: 20px; margin-top: 40px; }
        .stage-box { flex: 1; min-width: 200px; background: white; padding: 20px; border-radius: 12px; border-left: 5px solid #166534; }

        /* Call to Action Buttons */
        .btn { padding: 18px 45px; font-size: 1.1rem; font-weight: 700; border-radius: 12px; cursor: pointer; transition: 0.3s; border: none; text-decoration: none; display: inline-block; }
        .btn-green { background: #22c55e; color: white; }
        .btn-green:hover { background: #16a34a; transform: scale(1.05); }
        .btn-outline { background: transparent; color: white; border: 2px solid white; margin-left: 15px; }
        .btn-outline:hover { background: white; color: #166534; }

        @media (max-width: 768px) {
          .btn-outline { margin-left: 0; margin-top: 15px; width: 100%; }
          .btn-green { width: 100%; }
          .hero h1 { font-size: 2.5rem; }
        }
      `}</style>

      
      <section className="hero">
        <h1>Precision Agriculture <br/> for the Modern Farmer</h1>
        <p>
          Don't leave your harvest to chance. Our AI engine analyzes soil chemistry, 
          historical climate patterns, and crop physiology to give you the most accurate 
          maize yield forecasts in the industry.
        </p>
        <div className="cta-container">
          <button className="btn btn-green" onClick={() => router.push("/register")}>Start Free Prediction</button>
          <button className="btn btn-outline" onClick={() => router.push("/login")}>Member Login</button>
        </div>

        <div className="stats-bar">
          <div className="stat-item"><h2>94%</h2><p>Accuracy</p></div>
          <div className="stat-item"><h2>500+</h2><p>Data Points</p></div>
          <div className="stat-item"><h2>10k+</h2><p>Farmers</p></div>
        </div>
      </section>

      
      <section className="section">
        <div className="section-header">
          <h2>Intelligent Farm Management</h2>
          <p>Everything you need to move from traditional farming to data-driven agriculture.</p>
        </div>
        <div className="feature-grid">
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <Image src="/soil-nutrients.PNG" alt="Soil icon" width={50} height={50} />
            </div>
            <h3>Soil Nutrient Analysis</h3>
            <p>Understand the critical balance of Nitrogen, Phosphorus, and Potassium (NPK) required for your specific soil type.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <Image src="/climate.jpg" alt="Climate icon" width={50} height={50} />
            </div>
            <h3>Climate Adaptation</h3>
            <p>Our AI adjusts yield expectations based on localized temperature fluctuations and seasonal rainfall averages.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <Image src="/history.png" alt="Tracking icon" width={50} height={50} />
            </div>
            <h3>Historical Tracking</h3>
            <p>Store every season's data in our secure cloud to visualize growth trends and improvement over the years.</p>
          </div>
        </div>
      </section>

      
      <div className="knowledge-bg">
        <section className="section">
          <div className="section-header">
            <h2>Understanding Maize Development</h2>
            <p>AI predictions are most effective when you understand the crop's critical needs at each stage.</p>
          </div>
          
          <div className="growth-stages">
            
            <div className="stage-box">
              <h4>Vegetative (V1-Vn)</h4>
              <p>Critical for Nitrogen uptake. This stage determines the potential number of kernels per row.</p>
            </div>
            <div className="stage-box">
              <h4>Silking (R1)</h4>
              <p>The most sensitive stage for moisture stress. Drought here can lead to complete pollination failure.</p>
            </div>
            <div className="stage-box">
              <h4>Grain Fill (R2-R6)</h4>
              <p>Potassium is vital here for moving carbohydrates into the grain, ensuring heavy, nutrient-dense kernels.</p>
            </div>
          </div>
        </section>
      </div>

      
      <section className="section">
        <div style={{display: 'flex', flexWrap: 'wrap', gap: '50px', alignItems: 'center'}}>
          <div style={{flex: 1, minWidth: '300px'}}>
            <h2 style={{color: '#166534', fontSize: '2.5rem'}}>Science-Backed Results</h2>
            <p>Our application isn't just a calculator; it's a decision-support system. By identifying nutrient deficiencies early, you can:</p>
            <ul style={{padding: 0, listStyle: 'none'}}>
              <li style={{margin: '15px 0', paddingLeft: '30px', position: 'relative'}}>
                <span style={{position: 'absolute', left: 0, color: '#22c55e'}}>✓</span> 
                <strong>Reduce Fertilizer Waste:</strong> Save up to 20% on input costs by applying only what is needed.
              </li>
              <li style={{margin: '15px 0', paddingLeft: '30px', position: 'relative'}}>
                <span style={{position: 'absolute', left: 0, color: '#22c55e'}}>✓</span> 
                <strong>Early Warning:</strong> Get notified if climate data suggests a risk of moisture stress.
              </li>
              <li style={{margin: '15px 0', paddingLeft: '30px', position: 'relative'}}>
                <span style={{position: 'absolute', left: 0, color: '#22c55e'}}>✓</span> 
                <strong>Market Readiness:</strong> Know your estimated tonnage months before harvest to negotiate better prices.
              </li>
            </ul>
          </div>
          
          <div style={{flex: 1, minWidth: '300px', background: '#111827', color: 'white', padding: '40px', borderRadius: '24px'}}>
              <h3 style={{color: '#4ade80'}}>Expert Tip 💡</h3>
              <p>Did you know? Soil pH levels below 5.5 can lock up Phosphorus, making it unavailable to your maize. Our AI takes pH into account to suggest lime applications when necessary.</p>
              [Image showing how soil pH affects nutrient availability for plants]
          </div>
        </div>
      </section>

      
      <section className="section" style={{textAlign: 'center', background: '#166534', borderRadius: '40px', color: 'white', marginBottom: '50px'}}>
        <h2 style={{color: 'white', fontSize: '2.8rem'}}>Secure Your Next Harvest</h2>
        <p style={{fontSize: '1.2rem', marginBottom: '40px', opacity: 0.9}}>Create your account and run your first AI yield prediction in under 2 minutes.</p>
        <button className="btn btn-green" onClick={() => router.push("/register")}>Register My Farm</button>
      </section>
    </div>
  );
}