import { Target, Code, Database, Layout } from 'lucide-react';

const About = () => {
    return (
        <div className="page-enter">
            <div className="about-grid">
                <div className="about-text">
                    <h1>About Cosmic Horizon</h1>
                    <p>
                        Cosmic Horizon is a dedicated team focused on rapid prototyping and operational deployments. We build functional systems tailored to specific mission requirements.
                    </p>
                    <p>
                        Our methodology prioritizes objective outcomes, utilizing robust containerization, structured databases, and scalable orchestration to deliver effective software solutions.
                    </p>

                    <div className="stats-container" style={{ marginTop: '2.5rem' }}>
                        <div className="stat-box">
                            <div className="stat-number">Rapid</div>
                            <div className="stat-label">Prototyping</div>
                        </div>
                        <div className="stat-box" style={{ background: 'rgba(0, 242, 254, 0.05)', borderColor: 'rgba(0, 242, 254, 0.2)' }}>
                            <div className="stat-number">Custom</div>
                            <div className="stat-label">Solutions</div>
                        </div>
                    </div>
                </div>

                <div className="glass-card" style={{ padding: '0', background: 'transparent', border: 'none', boxShadow: 'none' }}>
                    <div style={{ display: 'grid', gap: '1.5rem' }}>
                        {[
                            { icon: <Target className="color-primary" />, title: 'Mission-Oriented', desc: 'Focused on solving specific technical requirements defined by operational objectives.' },
                            { icon: <Layout className="color-primary" />, title: 'Interface Design', desc: 'Developing structured back-end services and robust front-end interfaces.' },
                            { icon: <Database className="color-primary" />, title: 'Data Processing', desc: 'Implementing reliable pipelines for information aggregation and analysis.' },
                            { icon: <Code className="color-primary" />, title: 'Architecture', desc: 'Constructing scalable application systems utilizing cloud native principles.' }
                        ].map((feature, i) => (
                            <div key={i} className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1.5rem' }}>
                                <div className="link-icon-wrapper" style={{ width: '50px', height: '50px' }}>
                                    {feature.icon}
                                </div>
                                <div className="link-content">
                                    <h3 style={{ fontSize: '1.1rem' }}>{feature.title}</h3>
                                    <p style={{ fontSize: '0.85rem' }}>{feature.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
