import * as LucideIcons from "lucide-react";
import logoImage from "../assets/cosmic.png";

export const links = [
  {
    title: "CCTV Viewer",
    description:
      "YOLO-based computer vision model for identifying vehicles (cars, buses, trucks). Integrates with Chatsurfer for automated tipping.",
    iconName: "Camera",
    url: "https://test-cosmichorizon-worker-68a3110f01feebd0.elb.us-gov-west-1.amazonaws.com/cctv-viewer/",
  },
  {
    title: "Airbud RAG System",
    description:
      "Retrieval-Augmented Generation system. Features parent-child chunking, vision language models for document analysis, and knowledge graph generation.",
    iconName: "Database",
    url: "#",
  },
  {
    title: "Webscout",
    description:
      "Open source data aggregation tool. Collects and processes information for automated tipping to Chatsurfer rooms.",
    iconName: "Search",
    url: "https://test-cosmichorizon-worker-68a3110f01feebd0.elb.us-gov-west-1.amazonaws.com/cs-webscout/",
  },
  {
    title: "Chatsurfer to Signal Mirror",
    description:
      "Bidirectional communication relay. Posts Signal room content to Chatsurfer, and routes Chatsurfer messages through an FOUO screener to prevent sensitive data leakage back to Signal, enriching the warfighter's intelligence picture.",
    iconName: "ArrowRightLeft",
    url: "#",
  },
  {
    title: "CAC Viewer",
    description:
      "Dashboard to parse information from CAC/PIV smart cards. Locally, displays certificates and public keys (PIV Auth, Digital Signature, Key Management, Card Authentication) as well as associated email address, issuer agency, validity period, commanName, countryName, organizationName, and organizationalUnitName. Deployed, displays the CN information",
    iconName: "IdCard",
    url: "https://test-cosmichorizon-worker-68a3110f01feebd0.elb.us-gov-west-1.amazonaws.com/cac-utils/",
  },
];

const Home = () => {
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
        {links.map((link, i) => {
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
