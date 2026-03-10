"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { 
  BarChart3, 
  Sprout, 
  Wind, 
  History, 
  ChevronRight, 
  CheckCircle, 
  Zap, 
  Users,
  Database,
  ShieldCheck,
  Lightbulb
} from "lucide-react";

export default function HomePage() {
  const router = useRouter();

  return (
    <div style={styles.landingPage}>
    
      <section style={styles.hero}>
        <div style={styles.heroOverlay}>
          <div style={styles.heroContent}>
            <div style={styles.heroBadge}>
              <Zap size={14} fill="#4ade80" color="#4ade80" /> 
              <span>Next-Gen Agriculture AI</span>
            </div>
            <h1 style={styles.heroH1}>Precision Agriculture <br/> for the Modern Farmer</h1>
            <p style={styles.heroP}>
              Dont leave your harvest to chance. Our AI engine analyzes soil chemistry, 
              historical climate patterns, and crop physiology to provide the most accurate 
              maize yield forecasts in the industry.
            </p>
            <div style={styles.ctaContainer}>
              <button style={styles.btnGreen} onClick={() => router.push("/register")}>
                Start Free Prediction <ChevronRight size={18} />
              </button>
              <button style={styles.btnOutline} onClick={() => router.push("/login")}>
                Member Login
              </button>
            </div>

            <div style={styles.statsBar}>
              <div style={styles.statItem}>
                <div style={styles.statVal}>94%</div>
                <div style={styles.statLabel}>Prediction Accuracy</div>
              </div>
              <div style={styles.statItem}>
                <div style={styles.statVal}>500+</div>
                <div style={styles.statLabel}>Regional Data Points</div>
              </div>
              <div style={styles.statItem}>
                <div style={styles.statVal}>10k+</div>
                <div style={styles.statLabel}>Active Farmers</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      
      <section style={styles.section}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionH2}>Intelligent Farm Management</h2>
          <p style={styles.sectionSub}>Everything you need to move from traditional farming to data-driven agriculture.</p>
        </div>
        <div style={styles.featureGrid}>
          <div style={styles.featureCard}>
            <div style={styles.featureIconWrapper}><Sprout color="#166534" size={32} /></div>
            <h3 style={styles.featureH3}>Soil Nutrient Analysis</h3>
            <p style={styles.featureP}>Understand the critical balance of Nitrogen, Phosphorus, and Potassium (NPK) required for your specific soil type.</p>
          </div>
          
          <div style={styles.featureCard}>
            <div style={styles.featureIconWrapper}><Wind color="#166534" size={32} /></div>
            <h3 style={styles.featureH3}>Climate Adaptation</h3>
            <p style={styles.featureP}>Our AI adjusts yield expectations based on localized temperature fluctuations and seasonal rainfall averages.</p>
          </div>

          <div style={styles.featureCard}>
            <div style={styles.featureIconWrapper}><History color="#166534" size={32} /></div>
            <h3 style={styles.featureH3}>Historical Tracking</h3>
            <p style={styles.featureP}>Store every season's data in our secure cloud to visualize growth trends and improvement over the years.</p>
          </div>
        </div>
      </section>

      
      <div style={styles.knowledgeBg}>
        <section style={styles.section}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionH2}>Understanding Maize Development</h2>
            <p style={styles.sectionSub}>AI predictions are most effective when you understand the crop's critical needs at each stage.</p>
          </div>
          
          <div style={styles.growthStages}>
            <div style={styles.stageBox}>
              <div style={styles.stageIcon}><Database size={20} /></div>
              <h4 style={styles.stageH4}>Vegetative (V1-Vn)</h4>
              <p style={styles.stageP}>Critical for Nitrogen uptake. This stage determines the potential number of kernels per row.</p>
            </div>
            <div style={styles.stageBox}>
              <div style={styles.stageIcon}><BarChart3 size={20} /></div>
              <h4 style={styles.stageH4}>Silking (R1)</h4>
              <p style={styles.stageP}>The most sensitive stage for moisture stress. Drought here can lead to complete pollination failure.</p>
            </div>
            <div style={styles.stageBox}>
              <div style={styles.stageIcon}><ShieldCheck size={20} /></div>
              <h4 style={styles.stageH4}>Grain Fill (R2-R6)</h4>
              <p style={styles.stageP}>Potassium is vital here for moving carbohydrates into the grain, ensuring heavy, nutrient-dense kernels.</p>
            </div>
          </div>
        </section>
      </div>

      
      <section style={styles.section}>
        <div style={styles.splitGrid}>
          <div style={styles.textCol}>
            <h2 style={styles.scienceH2}>Science-Backed Results</h2>
            <p style={styles.scienceP}>Our application isn't just a calculator; its a decision-support system designed to increase ROI.</p>
            <ul style={styles.scienceList}>
              <li style={styles.scienceListItem}>
                <CheckCircle size={20} color="#22c55e" />
                <span><strong>Reduce Fertilizer Waste:</strong> Save up to 20% on input costs by applying only what is needed.</span>
              </li>
              <li style={styles.scienceListItem}>
                <CheckCircle size={20} color="#22c55e" />
                <span><strong>Early Warning:</strong> Get notified if climate data suggests a risk of moisture stress.</span>
              </li>
              <li style={styles.scienceListItem}>
                <CheckCircle size={20} color="#22c55e" />
                <span><strong>Market Readiness:</strong> Know your estimated tonnage months before harvest to negotiate better prices.</span>
              </li>
            </ul>
          </div>
          
          <div style={styles.expertCard}>
            <div style={styles.expertHeader}>
              <Lightbulb color="#4ade80" size={24} />
              <h3 style={styles.expertTitle}>Expert Insight</h3>
            </div>
            <p style={styles.expertText}>
              Did you know? Soil pH levels below 5.5 can "lock up" Phosphorus, making it unavailable to your maize plants even if present in the soil.
            </p>
            <div style={styles.diagramWrapper}>
               [Image showing how soil pH affects nutrient availability for plants]
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={styles.finalCta}>
        <h2 style={styles.finalCtaH2}>Secure Your Next Harvest</h2>
        <p style={styles.finalCtaP}>Create your account and run your first AI yield prediction in under 2 minutes.</p>
        <button style={styles.btnWhite} onClick={() => router.push("/register")}>
          Register My Farm Now
        </button>
      </section>
    </div>
  );
}

const styles = {
  landingPage: { fontFamily: "'Inter', sans-serif", color: "#1e293b", backgroundColor: "#fff" },
  hero: {
    height: "90vh",
    minHeight: "700px",
    background: "url('https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=2000') center/cover no-repeat",
    position: "relative",
  },
  heroOverlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(to bottom, rgba(15, 23, 42, 0.85), rgba(22, 101, 52, 0.7))",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0 20px",
  },
  heroContent: { maxWidth: "1000px", textAlign: "center", color: "white" },
  heroBadge: { 
    display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.1)", 
    padding: "8px 16px", borderRadius: "99px", marginBottom: "24px", fontSize: "0.85rem", fontWeight: 600,
    border: "1px solid rgba(255,255,255,0.2)"
  },
  heroH1: { fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 900, marginBottom: "24px", lineHeight: 1.1, letterSpacing: "-0.02em" },
  heroP: { fontSize: "1.25rem", maxWidth: "750px", margin: "0 auto 48px", opacity: 0.9, lineHeight: 1.6 },
  ctaContainer: { display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap", marginBottom: "64px" },
  btnGreen: { background: "#22c55e", color: "white", padding: "16px 32px", borderRadius: "12px", border: "none", fontWeight: 700, fontSize: "1.1rem", cursor: "pointer", display: "flex", alignItems: "center", gap: 8, transition: "0.2s" },
  btnOutline: { background: "transparent", color: "white", padding: "16px 32px", borderRadius: "12px", border: "2px solid rgba(255,255,255,0.5)", fontWeight: 700, fontSize: "1.1rem", cursor: "pointer" },
  
  statsBar: { display: "flex", justifyContent: "center", gap: "32px", flexWrap: "wrap" },
  statItem: { padding: "16px 32px", background: "rgba(255,255,255,0.1)", borderRadius: "16px", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.1)" },
  statVal: { fontSize: "2rem", fontWeight: 800, color: "#4ade80" },
  statLabel: { fontSize: "0.75rem", textTransform: "uppercase", fontWeight: 700, opacity: 0.8, letterSpacing: "0.05em" },

  section: { padding: "100px 20px", maxWidth: "1200px", margin: "0 auto" },
  sectionHeader: { textAlign: "center", marginBottom: "64px" },
  sectionH2: { fontSize: "2.5rem", fontWeight: 800, color: "#0f172a", marginBottom: "16px" },
  sectionSub: { fontSize: "1.1rem", color: "#64748b", maxWidth: "600px", margin: "0 auto" },
  
  featureGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "32px" },
  featureCard: { padding: "48px 32px", borderRadius: "24px", backgroundColor: "white", border: "1px solid #e2e8f0", textAlign: "center", transition: "0.3s" },
  featureIconWrapper: { width: "64px", height: "64px", background: "#f0fdf4", borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" },
  featureH3: { fontSize: "1.25rem", fontWeight: 700, marginBottom: "16px" },
  featureP: { color: "#64748b", lineHeight: 1.6 },

  knowledgeBg: { backgroundColor: "#f8fafc", borderRadius: "60px", margin: "0 20px" },
  growthStages: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" },
  stageBox: { background: "white", padding: "32px", borderRadius: "20px", borderBottom: "4px solid #166534", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)" },
  stageIcon: { color: "#166534", marginBottom: "16px" },
  stageH4: { fontSize: "1.1rem", fontWeight: 700, marginBottom: "12px" },
  stageP: { fontSize: "0.95rem", color: "#475569", margin: 0 },

  splitGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "64px", alignItems: "center" },
  scienceH2: { fontSize: "2.5rem", fontWeight: 800, color: "#166534", marginBottom: "24px" },
  scienceP: { fontSize: "1.1rem", marginBottom: "32px" },
  scienceList: { listStyle: "none", padding: 0 },
  scienceListItem: { display: "flex", gap: "16px", marginBottom: "24px", fontSize: "1rem", lineHeight: 1.5 },
  
  expertCard: { background: "#0f172a", color: "white", padding: "40px", borderRadius: "32px" },
  expertHeader: { display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" },
  expertTitle: { color: "#4ade80", fontSize: "1.25rem", margin: 0 },
  expertText: { opacity: 0.9, lineHeight: 1.6, marginBottom: "24px" },
  diagramWrapper: { background: "rgba(255,255,255,0.05)", padding: "16px", borderRadius: "16px" },

  finalCta: { textAlign: "center", background: "#166534", color: "white", padding: "100px 20px", borderRadius: "48px", margin: "0 20px 80px" },
  finalCtaH2: { fontSize: "3rem", fontWeight: 900, marginBottom: "24px" },
  finalCtaP: { fontSize: "1.2rem", opacity: 0.9, marginBottom: "48px" },
  btnWhite: { background: "white", color: "#166534", padding: "20px 48px", borderRadius: "16px", border: "none", fontWeight: 800, fontSize: "1.2rem", cursor: "pointer" }
};