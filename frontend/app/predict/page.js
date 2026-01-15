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

  const router = useRouter();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async () => {
    const token = localStorage.getItem("token");
    const result = await apiRequest(
      "/predictions/create/",
      "POST",
      form,
      token
    );

    localStorage.setItem("result", JSON.stringify(result));
    router.push("/results");
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>New Prediction</h2>
      {Object.keys(form).map((key) => (
        <input
          key={key}
          name={key}
          placeholder={key}
          onChange={handleChange}
          style={{ display: "block", marginBottom: 10 }}
        />
      ))}
      <button onClick={submit}>Predict Now</button>
    </div>
  );
}
