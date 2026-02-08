// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { apiRequest } from "@/lib/api";

// export default function PredictPage() {
//   const [form, setForm] = useState({
//     rainfall: "",
//     temperature: "",
//     nitrogen: "",
//     phosphorus: "",
//     potassium: "",
//     ph: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const submit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     const token = localStorage.getItem("token");
//     const result = await apiRequest(
//       "/predictions/create/",
//       "POST",
//       form,
//       token
//     );

//     localStorage.setItem("result", JSON.stringify(result));
//     router.push("/results");
//   };

//   return (
//     <div className="predict-container">
//       <style>{`
//         .predict-container {
//           max-width: 800px;
//           margin: 40px auto;
//           padding: 20px;
//           font-family: 'Inter', sans-serif;
//         }
//         .predict-card {
//           background: white;
//           padding: 40px;
//           border-radius: 24px;
//           box-shadow: 0 10px 30px rgba(0,0,0,0.08);
//           border: 1px solid #e5e7eb;
//         }
//         .header {
//           text-align: center;
//           margin-bottom: 40px;
//         }
//         .header h2 { color: #166534; font-size: 2rem; margin-bottom: 10px; }
//         .header p { color: #6b7280; font-size: 1.1rem; }

//         .form-grid {
//           display: grid;
//           grid-template-columns: 1fr 1fr;
//           gap: 25px;
//         }

//         .section-title {
//           grid-column: 1 / -1;
//           font-size: 1.1rem;
//           font-weight: 700;
//           color: #374151;
//           margin-top: 20px;
//           padding-bottom: 10px;
//           border-bottom: 2px solid #f3f4f6;
//           display: flex;
//           align-items: center;
//           gap: 10px;
//         }

//         .input-group {
//           display: flex;
//           flex-direction: column;
//           gap: 8px;
//         }
//         .input-group label {
//           font-size: 0.9rem;
//           font-weight: 600;
//           color: #4b5563;
//           text-transform: capitalize;
//         }
//         .input-group input {
//           padding: 14px;
//           border: 1px solid #d1d5db;
//           border-radius: 10px;
//           font-size: 1rem;
//           transition: all 0.2s;
//         }
//         .input-group input:focus {
//           outline: none;
//           border-color: #22c55e;
//           box-shadow: 0 0 0 4px rgba(34, 197, 94, 0.1);
//         }
//         .helper-text {
//           font-size: 0.75rem;
//           color: #9ca3af;
//         }

//         .btn-predict {
//           grid-column: 1 / -1;
//           margin-top: 30px;
//           background: #166534;
//           color: white;
//           padding: 16px;
//           border: none;
//           border-radius: 12px;
//           font-size: 1.1rem;
//           font-weight: 700;
//           cursor: pointer;
//           transition: 0.3s;
//         }
//         .btn-predict:hover {
//           background: #15803d;
//           transform: translateY(-2px);
//           box-shadow: 0 5px 15px rgba(22, 101, 52, 0.2);
//         }
//         .btn-predict:disabled {
//           background: #9ca3af;
//           cursor: not-allowed;
//         }

//         @media (max-width: 600px) {
//           .form-grid { grid-template-columns: 1fr; }
//           .predict-card { padding: 25px; }
//         }
//       `}</style>

//       <div className="predict-card">
//         <div className="header">
//           <h2>New Yield Prediction</h2>
//           <p>Fill in the soil and weather metrics from your latest farm audit.</p>
//         </div>

//         <form onSubmit={submit} className="form-grid">
          
//           <div className="section-title"><span>🌍</span> Environmental Factors</div>
          
//           <div className="input-group">
//             <label>Annual Rainfall (mm)</label>
//             <input 
//               type="number" 
//               name="rainfall" 
//               placeholder="e.g. 650" 
//               required
//               onChange={handleChange} 
//             />
//             <span className="helper-text">Optimal range: 500mm - 800mm</span>
//           </div>

//           <div className="input-group">
//             <label>Average Temperature (°C)</label>
//             <input 
//               type="number" 
//               name="temperature" 
//               placeholder="e.g. 24" 
//               required
//               onChange={handleChange} 
//             />
//             <span className="helper-text">Maize prefers 21°C - 30°C</span>
//           </div>

          
//           <div className="section-title"><span>🧪</span> Soil Composition (NPK)</div>

//           <div className="input-group">
//             <label>Nitrogen (N)</label>
//             <input 
//               type="number" 
//               name="nitrogen" 
//               placeholder="mg/kg" 
//               required
//               onChange={handleChange} 
//             />
//           </div>

//           <div className="input-group">
//             <label>Phosphorus (P)</label>
//             <input 
//               type="number" 
//               name="phosphorus" 
//               placeholder="mg/kg" 
//               required
//               onChange={handleChange} 
//             />
//           </div>

//           <div className="input-group">
//             <label>Potassium (K)</label>
//             <input 
//               type="number" 
//               name="potassium" 
//               placeholder="mg/kg" 
//               required
//               onChange={handleChange} 
//             />
//           </div>

//           <div className="input-group">
//             <label>Soil pH</label>
//             <input 
//               type="number" 
//               step="0.1"
//               name="ph" 
//               placeholder="e.g. 6.5" 
//               required
//               onChange={handleChange} 
//             />
//             <span className="helper-text">Balanced pH is 5.8 - 7.0</span>
//           </div>

//           <button type="submit" className="btn-predict" disabled={loading}>
//             {loading ? "Analyzing Data..." : "Generate AI Prediction"}
//           </button>
//         </form>
//       </div>

//       <div style={{ marginTop: '30px', color: '#6b7280', fontSize: '0.85rem', textAlign: 'center' }}>
//         <p><strong>Note:</strong> For the best results, use data from a soil test taken within the last 30 days.</p>
//       </div>
//     </div>
//   );
// }




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
          {/* Section: Environment */}
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

          {/* Section: Soil */}
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