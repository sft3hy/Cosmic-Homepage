
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Rocket } from 'lucide-react';
import Home from './pages/Home';
import About from './pages/About';
import bgImage from './assets/background.jpg';

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand">
        <Rocket size={24} color="currentColor" />
        Cosmic Horizon
      </Link>
      <div className="nav-links">
        <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>Applications</Link>
        <Link to="/about" className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}>About</Link>
      </div>
    </nav>
  );
};

const App = () => {
  return (
    <Router>
      <div className="app-container">
        {/* Fixed global background image with futuristic overlay style */}
        <div 
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                backgroundImage: `url(${bgImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                zIndex: -1,
                opacity: 0.25,
                filter: 'contrast(1.2) saturate(1.2)',
                pointerEvents: 'none'
            }}
        />
        <div className="stars"></div>
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <footer className="footer">
          <p>© {new Date().getFullYear()} Cosmic Horizon.</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
