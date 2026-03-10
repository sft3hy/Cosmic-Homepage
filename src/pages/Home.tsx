import { Camera, Database, Search, ArrowRightLeft } from 'lucide-react';

const links = [
    {
        title: 'CCTV Viewer',
        description: 'YOLO-based computer vision model for identifying vehicles (cars, buses, trucks). Integrates with Chatsurfer for automated tipping.',
        icon: <Camera size={24} />,
        url: 'https://test-cosmichorizon-worker-68a3110f01feebd0.elb.us-gov-west-1.amazonaws.com/cctv-viewer/',
    },
    {
        title: 'Airbud RAG System',
        description: 'Retrieval-Augmented Generation system. Features parent-child chunking, vision language models for document analysis, and knowledge graph generation.',
        icon: <Database size={24} />,
        url: 'https://test-cosmichorizon-worker-68a3110f01feebd0.elb.us-gov-west-1.amazonaws.com/airbud',
    },
    {
        title: 'Webscout',
        description: 'Open source data aggregation tool. Collects and processes information for automated tipping to Chatsurfer rooms.',
        icon: <Search size={24} />,
        url: 'https://test-cosmichorizon-worker-68a3110f01feebd0.elb.us-gov-west-1.amazonaws.com/cs-webscout/',
    },
    {
        title: 'Chatsurfer to Signal Mirror',
        description: 'Bidirectional communication relay. Posts Signal room content to Chatsurfer, and routes Chatsurfer messages through an FOUO screener to prevent sensitive data leakage back to Signal, enriching the warfighter\'s intelligence picture.',
        icon: <ArrowRightLeft size={24} />,
        url: '#',
    }
];

const Home = () => {
    return (
        <div className="page-enter hero-section">
            <h1 className="hero-title">Cosmic Horizon</h1>
            <p className="hero-subtitle">
                Prototyping team developing data systems, intelligence tools, and strategic applications. We focus on functional, mission-oriented software.
            </p>

            <div style={{ marginTop: '4rem' }} className="links-grid">
                {links.map((link, i) => (
                    <a href={link.url} key={i} className="glass-card link-item" style={{ animationDelay: `${i * 0.1}s` }}>
                        <div className="link-icon-wrapper">
                            {link.icon}
                        </div>
                        <div className="link-content">
                            <h3>{link.title}</h3>
                            <p>{link.description}</p>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default Home;
