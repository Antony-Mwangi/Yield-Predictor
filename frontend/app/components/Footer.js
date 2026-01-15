"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <style>{`
        .site-footer {
          background-color: #0f172a; /* Deep Charcoal Blue */
          color: #94a3b8;
          padding: 80px 5% 40px;
          margin-top: 100px;
          font-family: 'Inter', sans-serif;
          border-top: 6px solid #166534;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 50px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .footer-brand h3 {
          color: #ffffff;
          font-size: 1.5rem;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .footer-brand p {
          font-size: 14px;
          line-height: 1.8;
          max-width: 300px;
        }

        .footer-heading {
          color: #f8fafc;
          font-size: 16px;
          font-weight: 700;
          margin-bottom: 25px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .footer-links {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .footer-links li {
          margin-bottom: 12px;
        }

        .footer-link {
          color: #94a3b8;
          text-decoration: none;
          font-size: 14px;
          transition: color 0.2s, padding-left 0.2s;
        }

        .footer-link:hover {
          color: #4ade80;
          padding-left: 5px;
        }

        .contact-info p {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 14px;
          margin-bottom: 15px;
        }

        .newsletter-box {
          background: #1e293b;
          padding: 20px;
          border-radius: 12px;
        }

        .newsletter-box input {
          width: 100%;
          padding: 10px;
          border-radius: 6px;
          border: none;
          margin-bottom: 10px;
          background: #334155;
          color: white;
          font-size: 14px;
        }

        .btn-subscribe {
          width: 100%;
          padding: 10px;
          background: #166534;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
        }

        .footer-bottom {
          max-width: 1200px;
          margin: 60px auto 0;
          padding-top: 30px;
          border-top: 1px solid #334155;
          text-align: center;
        }

        .copyright { font-size: 13px; color: #64748b; }
        .disclaimer { 
          font-size: 11px; 
          color: #475569; 
          margin-top: 10px; 
          max-width: 800px; 
          margin-left: auto; 
          margin-right: auto; 
        }

        @media (max-width: 768px) {
          .site-footer { padding: 60px 20px 30px; }
          .footer-grid { text-align: center; }
          .footer-brand p { margin: 0 auto; }
          .contact-info p { justify-content: center; }
        }
      `}</style>

      <div className="footer-grid">
        {/* Brand Identity */}
        <div className="footer-brand">
          <h3><span>🌽</span> MaizeWise AI</h3>
          <p>
            Revolutionizing agricultural yields through precision data science 
            and climate-intelligent modeling.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="footer-heading">Platform</h4>
          <ul className="footer-links">
            <li><Link href="/" className="footer-link">Home Overview</Link></li>
            <li><Link href="/dashboard" className="footer-link">Farmer Dashboard</Link></li>
            <li><Link href="/predict" className="footer-link">Yield Predictor</Link></li>
            <li><Link href="/resources" className="footer-link">Farming Guides</Link></li>
            <li><Link href="/pro-plans" className="footer-link">Pricing & Plans</Link></li>
          </ul>
        </div>

        {/* Contact & Support */}
        <div className="contact-info">
          <h4 className="footer-heading">Get in Touch</h4>
          <p>📍 Nairobi, Kenya - AgriHub HQ</p>
          <p>📧 support@maizewise.ai</p>
          <p>📞 +254 700 000 000</p>
        </div>

        {/* Community / Newsletter */}
        <div>
          <h4 className="footer-heading">Stay Updated</h4>
          <div className="newsletter-box">
            <input type="email" placeholder="Enter your email" />
            <button className="btn-subscribe">Join Newsletter</button>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="copyright">
          © {new Date().getFullYear()} MaizeWise AI Technologies. Empowering 10k+ Farmers.
        </p>
        <p className="disclaimer">
          <strong>Legal Disclaimer:</strong> The predictions provided by this AI are based on historical data and current soil inputs. 
          Agriculture is subject to unpredictable environmental factors. Always consult with a local agronomist 
          before making significant financial investments in fertilizers or seed varieties.
        </p>
      </div>
    </footer>
  );
}