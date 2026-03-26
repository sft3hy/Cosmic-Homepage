import { useState, useEffect } from 'react';
import * as LucideIcons from "lucide-react";
import logoImage from "../assets/cosmic.png";

interface LinkItem {
  title: string;
  description: string;
  iconName: string;
  url: string;
}

const Home = () => {
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/links.json')
      .then(res => res.json())
      .then(data => {
        setLinks(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading links:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="page-enter">
      <div className="hero-section">
        <img
          src={logoImage}
          alt="Cosmic Horizon Logo"
          style={{
            width: "180px",
            height: "180px",
            objectFit: "cover",
            borderRadius: "50%",
            border: "2px solid var(--color-primary)",
            boxShadow: "0 0 30px rgba(0, 242, 254, 0.4)",
            marginBottom: "2rem",
          }}
        />
        <h1 className="hero-title">Cosmic Horizon</h1>
        <p className="hero-subtitle">
          Prototyping team developing data systems, intelligence tools, and
          strategic applications. We focus on functional, mission-oriented
          software.
        </p>
      </div>

      <div style={{ marginTop: "4rem" }} className="links-grid">
        {loading ? (
          <div style={{ textAlign: 'center', gridColumn: '1 / -1', padding: '2rem' }}>
            <p>Scanning intelligence systems...</p>
          </div>
        ) : links.map((link, i) => {
          const IconComponent = (LucideIcons as any)[link.iconName] || LucideIcons.Link;
          return (
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              key={i}
              className="glass-card link-item"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="link-icon-wrapper"><IconComponent size={24} /></div>
              <div className="link-content">
                <h3>{link.title}</h3>
                <p>{link.description}</p>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default Home;

