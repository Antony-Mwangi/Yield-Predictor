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

    // Convert form values to numbers before sending
    const numericForm = {
      rainfall: parseFloat(form.rainfall),
      temperature: parseFloat(form.temperature),
      nitrogen: parseFloat(form.nitrogen),
      phosphorus: parseFloat(form.phosphorus),
      potassium: parseFloat(form.potassium),
      ph: parseFloat(form.ph),
    };

    const result = await apiRequest("/predictions/create/", "POST", numericForm, token);

    localStorage.setItem("result", JSON.stringify(result));
    router.push("/results");
  };

  return (
    <div className="predict-container">
      <style>{`
        .predict-container {
          max-width: 800px;
          margin: 40px auto;
          padding: 20px;
          font-family: 'Inter', sans-serif;
        }
        .predict-card {
          background: white;
          padding: 40px;
          border-radius: 24px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.08);
          border: 1px solid #e5e7eb;
        }
        .header {
          text-align: center;
          margin-bottom: 40px;
        }
        .header h2 { color: #166534; font-size: 2rem; margin-bottom: 10px; }
        .header p { color: #6b7280; font-size: 1.1rem; }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 25px;
        }

        .section-title {
          grid-column: 1 / -1;
          font-size: 1.1rem;
          font-weight: 700;
          color: #374151;
          margin-top: 20px;
          padding-bottom: 10px;
          border-bottom: 2px solid #f3f4f6;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .input-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .input-group label {
          font-size: 0.9rem;
          font-weight: 600;
          color: #4b5563;
          text-transform: capitalize;
        }
        .input-group input {
          padding: 14px;
          border: 1px solid #d1d5db;
          border-radius: 10px;
          font-size: 1rem;
          transition: all 0.2s;
        }
        .input-group input:focus {
          outline: none;
          border-color: #22c55e;
          box-shadow: 0 0 0 4px rgba(34, 197, 94, 0.1);
        }
        .helper-text {
          font-size: 0.75rem;
          color: #9ca3af;
        }

        .btn-predict {
          grid-column: 1 / -1;
          margin-top: 30px;
          background: #166534;
          color: white;
          padding: 16px;
          border: none;
          border-radius: 12px;
          font-size: 1.1rem;
          font-weight: 700;
          cursor: pointer;
          transition: 0.3s;
        }
        .btn-predict:hover {
          background: #15803d;
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(22, 101, 52, 0.2);
        }
        .btn-predict:disabled {
          background: #9ca3af;
          cursor: not-allowed;
        }

        @media (max-width: 600px) {
          .form-grid { grid-template-columns: 1fr; }
          .predict-card { padding: 25px; }
        }
      `}</style>

      <div className="predict-card">
        <div className="header">
          <h2>New Yield Prediction</h2>
          <p>Fill in the soil and weather metrics from your latest farm audit.</p>
        </div>

        <form onSubmit={submit} className="form-grid">
          <div className="section-title"><span>🌍</span> Environmental Factors</div>
          <div className="input-group">
            <label>Annual Rainfall (mm)</label>
            <input 
              type="number" 
              name="rainfall" 
              placeholder="e.g. 650" 
              required
              onChange={handleChange} 
            />
            <span className="helper-text">Optimal range: 500mm - 800mm</span>
          </div>
          <div className="input-group">
            <label>Average Temperature (°C)</label>
            <input 
              type="number" 
              name="temperature" 
              placeholder="e.g. 24" 
              required
              onChange={handleChange} 
            />
            <span className="helper-text">Maize prefers 21°C - 30°C</span>
          </div>

          <div className="section-title"><span>🧪</span> Soil Composition (NPK)</div>
          <div className="input-group">
            <label>Nitrogen (N)</label>
            <input 
              type="number" 
              name="nitrogen" 
              placeholder="mg/kg" 
              required
              onChange={handleChange} 
            />
          </div>
          <div className="input-group">
            <label>Phosphorus (P)</label>
            <input 
              type="number" 
              name="phosphorus" 
              placeholder="mg/kg" 
              required
              onChange={handleChange} 
            />
          </div>
          <div className="input-group">
            <label>Potassium (K)</label>
            <input 
              type="number" 
              name="potassium" 
              placeholder="mg/kg" 
              required
              onChange={handleChange} 
            />
          </div>
          <div className="input-group">
            <label>Soil pH</label>
            <input 
              type="number" 
              step="0.1"
              name="ph" 
              placeholder="e.g. 6.5" 
              required
              onChange={handleChange} 
            />
            <span className="helper-text">Balanced pH is 5.8 - 7.0</span>
          </div>

          <button type="submit" className="btn-predict" disabled={loading}>
            {loading ? "Analyzing Data..." : "Generate AI Prediction"}
          </button>
        </form>
      </div>

      <div style={{ marginTop: '30px', color: '#6b7280', fontSize: '0.85rem', textAlign: 'center' }}>
        <p><strong>Note:</strong> For the best results, use data from a soil test taken within the last 30 days.</p>
      </div>
    </div>
  );
}
