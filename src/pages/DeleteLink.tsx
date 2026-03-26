import { useState } from 'react';
import * as LucideIcons from 'lucide-react';
import { links } from './Home';

const DeleteLink = () => {
  const [status, setStatus] = useState('');
  const [currentLinks, setCurrentLinks] = useState(links);

  const handleDelete = async (title: string) => {
    if (!window.confirm(`Are you sure you want to delete ${title}?`)) return;

    setStatus(`Deleting ${title}...`);
    try {
      const res = await fetch('/api/delete-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title })
      });
      if (res.ok) {
        setStatus(`Successfully deleted ${title}. Changes saved. Refresh to see on Home.`);
        setCurrentLinks(currentLinks.filter(l => l.title !== title));
      } else {
        const err = await res.json();
        setStatus(`Error: ${err.error}`);
      }
    } catch (e: any) {
      setStatus(`Error: ${e.message}`);
    }
  };

  return (
    <div className="page-enter" style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', marginTop: '4rem' }}>
      <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Delete Links</h2>

      {status && (
        <div style={{
          marginBottom: '1rem',
          padding: '1rem',
          backgroundColor: status.startsWith('Error') ? 'rgba(255, 0, 0, 0.2)' : 'rgba(0, 242, 254, 0.2)',
          border: `1px solid ${status.startsWith('Error') ? 'rgba(255, 0, 0, 0.4)' : 'rgba(0, 242, 254, 0.4)'}`,
          borderRadius: '8px',
          color: 'white',
        }}>
          {status}
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {currentLinks.map((link, i) => {
          const IconComponent = (LucideIcons as any)[link.iconName] || LucideIcons.Link;
          return (
            <div key={i} className="glass-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: '0.75rem', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <IconComponent size={24} />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.2rem' }}>{link.title}</h3>
                  <p style={{ margin: 0, opacity: 0.7, fontSize: '0.9rem', wordBreak: 'break-all' }}>{link.url}</p>
                </div>
              </div>
              <button
                onClick={() => handleDelete(link.title)}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: 'rgba(255, 0, 0, 0.2)',
                  color: '#ff4444',
                  border: '1px solid rgba(255, 0, 0, 0.4)',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  transition: 'background-color 0.2s, transform 0.2s',
                  marginLeft: '1rem',
                  minWidth: '100px'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 0, 0, 0.3)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 0, 0, 0.2)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Delete
              </button>
            </div>
          );
        })}
        {currentLinks.length === 0 && (
          <div style={{ textAlign: 'center', opacity: 0.5, padding: '2rem' }}>No links remaining.</div>
        )}
      </div>
    </div>
  );
};

export default DeleteLink;
