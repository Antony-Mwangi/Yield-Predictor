
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiRequest } from "@/lib/api";
import { 
  CloudRain, 
  Thermometer, 
  FlaskConical, 
  Globe, 
  ArrowRight, 
  Info, 
  Beaker,
  Droplets,
  Zap,
  ChevronLeft
} from "lucide-react";

export default function PredictPage() {
  const [form, setForm] = useState({
    rainfall: "",
    temperature: "",
    nitrogen: "",
    phosphorus: "",
    potassium: "",
    ph: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem("token");

    const numericForm = {
      rainfall: parseFloat(form.rainfall),
      temperature: parseFloat(form.temperature),
      nitrogen: parseFloat(form.nitrogen),
      phosphorus: parseFloat(form.phosphorus),
      potassium: parseFloat(form.potassium),
      ph: parseFloat(form.ph),
    };

    try {
      const result = await apiRequest("/predictions/create/", "POST", numericForm, token);
      localStorage.setItem("result", JSON.stringify(result));
      router.push("/results");
    } catch (error) {
      console.error("Prediction failed:", error);
      setLoading(false);
    }
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.topActions}>
        <button onClick={() => router.back()} style={styles.backBtn}>
          <ChevronLeft size={18} /> Back to Dashboard
        </button>
      </div>

      <div style={styles.predictCard}>
        <div style={styles.header}>
          <div style={styles.iconHeader}>
            <Zap size={32} color="#166534" fill="#dcfce7" />
          </div>
          <h2 style={styles.title}>New Yield Prediction</h2>
          <p style={styles.subtitle}>Input your environmental and soil metrics to generate an AI-driven harvest forecast.</p>
        </div>

        <form onSubmit={submit} style={styles.formGrid}>
          
          <div style={styles.sectionTitle}>
            <Globe size={18} color="#166534" /> 
            <span>Environmental Factors</span>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>
              <CloudRain size={14} style={{marginRight: 6}} /> Annual Rainfall (mm)
            </label>
            <input 
              style={styles.input}
              type="number" 
              name="rainfall" 
              placeholder="e.g. 650" 
              required
              onChange={handleChange} 
            />
            <span style={styles.helperText}>Optimal range: 500mm - 800mm</span>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>
              <Thermometer size={14} style={{marginRight: 6}} /> Avg. Temperature (°C)
            </label>
            <input 
              style={styles.input}
              type="number" 
              name="temperature" 
              placeholder="e.g. 24" 
              required
              onChange={handleChange} 
            />
            <span style={styles.helperText}>Maize prefers 21°C - 30°C</span>
          </div>

          
          <div style={styles.sectionTitle}>
            <FlaskConical size={18} color="#166534" /> 
            <span>Soil Composition (NPK)</span>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Nitrogen (N)</label>
            <input 
              style={styles.input}
              type="number" 
              name="nitrogen" 
              placeholder="mg/kg" 
              required
              onChange={handleChange} 
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Phosphorus (P)</label>
            <input 
              style={styles.input}
              type="number" 
              name="phosphorus" 
              placeholder="mg/kg" 
              required
              onChange={handleChange} 
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Potassium (K)</label>
            <input 
              style={styles.input}
              type="number" 
              name="potassium" 
              placeholder="mg/kg" 
              required
              onChange={handleChange} 
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>
              <Droplets size={14} style={{marginRight: 6}} /> Soil pH
            </label>
            <input 
              style={styles.input}
              type="number" 
              step="0.1"
              name="ph" 
              placeholder="e.g. 6.5" 
              required
              onChange={handleChange} 
            />
            <span style={styles.helperText}>Ideal range: 5.8 - 7.0</span>
          </div>

          <button type="submit" style={styles.btnPredict} disabled={loading}>
            {loading ? (
              "Processing Field Data..."
            ) : (
              <>Analyze & Predict Yield <ArrowRight size={18} style={{marginLeft: 8}} /></>
            )}
          </button>
        </form>

        <div style={styles.footerNote}>
          <Info size={16} color="#6b7280" />
          <p>For high-precision results, use data from a lab soil test taken within the last 30 days.</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  pageWrapper: {
    maxWidth: "850px",
    margin: "0 auto",
    padding: "40px 20px",
    fontFamily: "'Inter', system-ui, sans-serif",
    minHeight: "100vh",
    backgroundColor: "#f9fafb",
  },
  topActions: {
    marginBottom: "20px",
  },
  backBtn: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    background: "none",
    border: "none",
    color: "#6b7280",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
  },
  predictCard: {
    background: "#ffffff",
    padding: "48px",
    borderRadius: "24px",
    boxShadow: "0 10px 40px -10px rgba(0,0,0,0.05), 0 1px 3px rgba(0,0,0,0.05)",
    border: "1px solid #f3f4f6",
  },
  header: {
    textAlign: "center",
    marginBottom: "48px",
  },
  iconHeader: {
    width: "64px",
    height: "64px",
    background: "#f0fdf4",
    borderRadius: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 20px",
  },
  title: {
    color: "#111827",
    fontSize: "28px",
    fontWeight: "800",
    marginBottom: "12px",
    letterSpacing: "-0.5px",
  },
  subtitle: {
    color: "#6b7280",
    fontSize: "16px",
    maxWidth: "500px",
    margin: "0 auto",
    lineHeight: "1.5",
  },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "32px",
  },
  sectionTitle: {
    gridColumn: "1 / -1",
    fontSize: "15px",
    fontWeight: "700",
    color: "#166534",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginTop: "10px",
    paddingBottom: "12px",
    borderBottom: "1px solid #f3f4f6",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  label: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#374151",
    display: "flex",
    alignItems: "center",
  },
  input: {
    padding: "14px 16px",
    border: "1px solid #e5e7eb",
    borderRadius: "12px",
    fontSize: "15px",
    backgroundColor: "#f9fafb",
    transition: "all 0.2s ease",
  },
  helperText: {
    fontSize: "12px",
    color: "#9ca3af",
    fontWeight: "400",
  },
  btnPredict: {
    gridColumn: "1 / -1",
    marginTop: "20px",
    background: "#166534",
    color: "white",
    padding: "18px",
    border: "none",
    borderRadius: "14px",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "all 0.3s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  footerNote: {
    marginTop: "40px",
    padding: "16px",
    backgroundColor: "#f8fafc",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    color: "#64748b",
    fontSize: "13px",
    lineHeight: "1.5",
  }
};