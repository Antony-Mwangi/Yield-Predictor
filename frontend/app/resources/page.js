"use client";

import { useRouter } from "next/navigation";
import { 
  BookOpen, 
  Shovel, 
  FlaskConical, 
  ThermometerSun, 
  Droplets, 
  CheckCircle2, 
  ArrowRight,
  Info,
  ChevronRight,
  Microscope
} from "lucide-react";

export default function ResourcesPage() {
  const router = useRouter();

  return (
    <div style={styles.container}>
      
      <section style={styles.heroBanner}>
        <div style={styles.heroContent}>
          <div style={styles.heroBadge}>
            <BookOpen size={16} /> Knowledge Base
          </div>
          <h1 style={styles.heroTitle}>Farmer's Knowledge Hub</h1>
          <p style={styles.heroSubtitle}>
            Master the science of soil testing and climate tracking to improve the accuracy of your AI yield predictions.
          </p>
        </div>
      </section>

      
      <section style={styles.resourceSection}>
        <div style={styles.sectionHeader}>
          <div style={styles.iconBox}><Shovel size={24} color="#166534" /></div>
          <h2 style={styles.sectionTitle}>Precision Soil Sampling</h2>
        </div>
        
        <p style={styles.sectionDesc}>
          Proper sampling is the foundation of accurate prediction. We recommend the <strong>"Zig-Zag" method</strong> to ensure your data represents the entire field.
        </p>

        

        <div style={styles.guideGrid}>
          <div style={styles.stepCard}>
            <div style={styles.stepNum}>01</div>
            <h3 style={styles.stepTitle}>Clear the Surface</h3>
            <p style={styles.stepText}>Remove weeds, rocks, and organic debris from 10-15 random spots across your field.</p>
          </div>
          <div style={styles.stepCard}>
            <div style={styles.stepNum}>02</div>
            <h3 style={styles.stepTitle}>Dig V-Shaped Holes</h3>
            <p style={styles.stepText}>Dig 15-20cm deep (the "plough layer"). Take a thin 2cm slice from the side of the hole.</p>
          </div>
          <div style={styles.stepCard}>
            <div style={styles.stepNum}>03</div>
            <h3 style={styles.stepTitle}>Mix and Dry</h3>
            <p style={styles.stepText}>Combine all slices in a clean plastic bucket. Air-dry the sample before sending it to the lab.</p>
          </div>
        </div>
      </section>

      
      <section style={styles.resourceSection}>
        <div style={styles.sectionHeader}>
          <div style={styles.iconBox}><FlaskConical size={24} color="#166534" /></div>
          <h2 style={styles.sectionTitle}>Understanding NPK Values</h2>
        </div>
        <p style={styles.sectionDesc}>Nutrient balance is critical. Use this guide to identify signs of deficiency in your maize crop.</p>

        <div style={styles.tableWrapper}>
          <table style={styles.referenceTable}>
            <thead>
              <tr>
                <th style={styles.th}>Nutrient</th>
                <th style={styles.th}>Role in Maize Growth</th>
                <th style={styles.th}>Deficiency Sign</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={styles.td}><span style={{...styles.tag, ...styles.tagN}}>Nitrogen (N)</span></td>
                <td style={styles.td}>Rapid leaf growth and stalk strength.</td>
                <td style={styles.td}>Yellowing starting at the leaf tip moving down the midrib.</td>
              </tr>
              <tr>
                <td style={styles.td}><span style={{...styles.tag, ...styles.tagP}}>Phosphorus (P)</span></td>
                <td style={styles.td}>Root development and early seedling vigor.</td>
                <td style={styles.td}>Leaves turning purple or dark blue-green.</td>
              </tr>
              <tr>
                <td style={styles.td}><span style={{...styles.tag, ...styles.tagK}}>Potassium (K)</span></td>
                <td style={styles.td}>Water regulation and disease resistance.</td>
                <td style={styles.td}>Browning or "firing" of the outer leaf edges.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      
      <section style={styles.resourceSection}>
        <div style={styles.sectionHeader}>
          <div style={styles.iconBox}><ThermometerSun size={24} color="#166534" /></div>
          <h2 style={styles.sectionTitle}>Climate & Environmental Stress</h2>
        </div>
        <div style={styles.splitGrid}>
          <div style={styles.textCol}>
            <p style={styles.sectionDesc}>
              Our AI analyzes <strong>Annual Rainfall</strong> as a primary driver for grain weight. However, timing is the ultimate variable.
            </p>
            <div style={styles.bulletList}>
              <div style={styles.bulletItem}>
                <Droplets size={18} color="#22c55e" />
                <span><strong>Critical Period:</strong> Water stress 2 weeks before and after silking causes the most yield loss.</span>
              </div>
              <div style={styles.bulletItem}>
                <ThermometerSun size={18} color="#f59e0b" />
                <span><strong>Heat Stress:</strong> Consistent temperatures above 35°C during pollination reduce kernel set.</span>
              </div>
            </div>
          </div>
          <div style={styles.infoNote}>
            <div style={styles.noteHeader}>
              <Info size={18} />
              <h4 style={{margin: 0}}>Field Measurement Tip</h4>
            </div>
            <p style={styles.noteText}>
              Place a manual rain gauge 1 meter above ground level, away from trees or buildings, to capture data that reflects your specific micro-climate.
            </p>
          </div>
        </div>
      </section>

      
      <div style={styles.ctaBox}>
        <div style={styles.ctaContent}>
          <h3 style={styles.ctaTitle}>Ready to analyze your data?</h3>
          <p style={styles.ctaSubtitle}>Apply your soil metrics to our AI model for an instant harvest forecast.</p>
        </div>
        <button style={styles.ctaBtn} onClick={() => router.push("/predict")}>
          Run Prediction <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "1000px",
    margin: "0 auto",
    padding: "40px 20px",
    fontFamily: "'Inter', system-ui, sans-serif",
    color: "#1e293b",
    lineHeight: "1.6",
  },
  heroBanner: {
    background: "linear-gradient(135deg, #166534 0%, #15803d 100%)",
    color: "white",
    padding: "80px 40px",
    borderRadius: "32px",
    marginBottom: "60px",
    textAlign: "center",
    position: "relative",
    overflow: "hidden",
  },
  heroBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    padding: "6px 14px",
    borderRadius: "99px",
    fontSize: "14px",
    fontWeight: "600",
    marginBottom: "20px",
  },
  heroTitle: { fontSize: "3rem", fontWeight: "800", margin: "0 0 16px 0", letterSpacing: "-1px" },
  heroSubtitle: { fontSize: "1.15rem", opacity: 0.9, maxWidth: "600px", margin: "0 auto" },
  
  resourceSection: { marginBottom: "80px" },
  sectionHeader: { display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" },
  iconBox: {
    width: "48px",
    height: "48px",
    backgroundColor: "#f0fdf4",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  sectionTitle: { fontSize: "1.75rem", fontWeight: "800", color: "#0f172a", margin: 0 },
  sectionDesc: { fontSize: "1.1rem", color: "#475569", marginBottom: "32px", maxWidth: "800px" },

  guideGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "24px",
    marginTop: "32px",
  },
  stepCard: {
    backgroundColor: "#ffffff",
    padding: "32px",
    borderRadius: "20px",
    border: "1px solid #e2e8f0",
    transition: "all 0.3s ease",
  },
  stepNum: {
    fontSize: "2rem",
    fontWeight: "900",
    color: "#e2e8f0",
    marginBottom: "12px",
    fontFamily: "serif",
  },
  stepTitle: { 
    fontSize: "1.25rem", 
    fontWeight: "700",
    color: "#166534", 
    marginBottom: "12px" },

    
  stepText: { fontSize: "0.95rem", color: "#64748b", margin: 0 },

  tableWrapper: {
    borderRadius: "16px",
    border: "1px solid #e2e8f0",
    overflow: "hidden",
    boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)",
  },
  referenceTable: { width: "100%", borderCollapse: "collapse", background: "white" },
  th: { backgroundColor: "#f8fafc", padding: "16px", textAlign: "left", fontSize: "13px", fontWeight: "700", textTransform: "uppercase", color: "#64748b", borderBottom: "1px solid #e2e8f0" },
  td: { padding: "20px 16px", fontSize: "14px", borderBottom: "1px solid #f1f5f9" },
  
  tag: { padding: "4px 10px", borderRadius: "6px", fontSize: "12px", fontWeight: "700" },
  tagN: { backgroundColor: "#dbeafe", color: "#1e40af" },
  tagP: { backgroundColor: "#fef3c7", color: "#92400e" },
  tagK: { backgroundColor: "#ede9fe", color: "#5b21b6" },

  splitGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", alignItems: "start" },
  bulletList: { display: "grid", gap: "16px" },
  bulletItem: { display: "flex", gap: "12px", alignItems: "start", fontSize: "15px" },
  
  infoNote: { backgroundColor: "#fffbeb", padding: "24px", borderRadius: "16px", border: "1px solid #fef3c7" },
  noteHeader: { display: "flex", alignItems: "center", gap: "8px", color: "#92400e", marginBottom: "12px" },
  noteText: { fontSize: "14px", color: "#78350f", margin: 0, lineHeight: "1.5" },

  ctaBox: {
    backgroundColor: "#ffffff",
    padding: "48px",
    borderRadius: "24px",
    border: "2px solid #10b981",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "32px",
    flexWrap: "wrap",
  },
  ctaTitle: { fontSize: "1.5rem", fontWeight: "800", margin: "0 0 8px 0" },
  ctaSubtitle: { fontSize: "1rem", color: "#64748b", margin: 0 },
  ctaBtn: {
    backgroundColor: "#166534",
    color: "white",
    padding: "16px 32px",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "700",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    transition: "transform 0.2s",
  }
};