"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiRequest } from "@/lib/api";

export default function RegisterPage() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const data = await apiRequest("/auth/register/", "POST", form);

    if (data.username) {
      alert("Registration successful! Please login.");
      router.push("/login");
    } else {
      alert("Registration failed. Try again.");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Create Account</h2>

      <form onSubmit={handleRegister} style={styles.form}>
        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
        />

        <input
          name="email"
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          name="password"
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Register</button>
      </form>

      <p style={{ marginTop: 10 }}>
        Already have an account?{" "}
        <span
          style={styles.link}
          onClick={() => router.push("/login")}
        >
          Login
        </span>
      </p>
    </div>
  );
}

const styles = {
  container: {
    padding: 40,
    maxWidth: 400,
    margin: "auto",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  link: {
    color: "green",
    cursor: "pointer",
    textDecoration: "underline",
  },
};
