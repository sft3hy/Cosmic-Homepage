import React, { useState } from 'react';
import * as LucideIcons from 'lucide-react';

const EditLink = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [iconName, setIconName] = useState('Link');
  const [urlPath, setUrlPath] = useState('');
  const [status, setStatus] = useState('');

  // Normalize icon name to PascalCase for lookup
  const normalizedIconName = iconName 
    ? iconName.charAt(0).toUpperCase() + iconName.slice(1) 
    : 'Link';

  // Dynamically load the icon component from lucide-react
  // Fallback to 'Link' icon if it doesn't exist
  const IconComponent = (LucideIcons as any)[normalizedIconName] || LucideIcons.Link;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Submitting...');
    try {
      const res = await fetch('/api/add-link', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, description, iconName, urlPath })
      });
      if (res.ok) {
        setStatus('Link added successfully! Changes to Home.tsx have been saved. Refresh the page to see changes on Home.');
        setTitle('');
        setDescription('');
        setIconName('Link');
        setUrlPath('');
      } else {
        const err = await res.json();
        setStatus(`Error: ${err.error}`);
      }
    } catch (e: any) {
      setStatus(`Error: ${e.message}`);
    }
  };

  return (
    <div className="page-enter" style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto', marginTop: '4rem' }}>
      <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Add New Link</h2>
      
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
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }} className="glass-card">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ fontWeight: '600' }}>Title</label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
            style={{ 
              padding: '0.75rem', 
              borderRadius: '4px', 
              backgroundColor: 'rgba(255,255,255,0.05)', 
              color: 'white', 
              border: '1px solid rgba(255,255,255,0.2)',
              outline: 'none',
              transition: 'border-color 0.3s'
            }}
            onFocus={(e) => e.target.style.borderColor = 'var(--color-primary)'}
            onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.2)'}
            placeholder="e.g. Webscout"
          />
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ fontWeight: '600' }}>Description</label>
          <textarea 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            required 
            rows={4}
            style={{ 
              padding: '0.75rem', 
              borderRadius: '4px', 
              backgroundColor: 'rgba(255,255,255,0.05)', 
              color: 'white', 
              border: '1px solid rgba(255,255,255,0.2)',
              outline: 'none',
              resize: 'vertical',
              transition: 'border-color 0.3s'
            }}
            onFocus={(e) => e.target.style.borderColor = 'var(--color-primary)'}
            onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.2)'}
            placeholder="Description of the tool..."
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ fontWeight: '600' }}>Icon Name (from lucide-react)</label>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <input 
              type="text" 
              value={iconName} 
              onChange={(e) => setIconName(e.target.value)} 
              required 
              style={{ 
                flex: 1, 
                padding: '0.75rem', 
                borderRadius: '4px', 
                backgroundColor: 'rgba(255,255,255,0.05)', 
                color: 'white', 
                border: '1px solid rgba(255,255,255,0.2)',
                outline: 'none',
                transition: 'border-color 0.3s'
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--color-primary)'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.2)'}
              placeholder="e.g. Activity"
            />
            <div style={{ 
              backgroundColor: 'rgba(255,255,255,0.05)', 
              padding: '0.75rem', 
              borderRadius: '8px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              border: '1px solid rgba(255,255,255,0.1)'
            }}>
              <IconComponent size={24} />
            </div>
          </div>
          <small style={{ opacity: 0.7, marginTop: '0.25rem' }}>
            Check <a href="https://lucide.dev/icons/" target="_blank" rel="noreferrer" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>lucide.dev</a> for icon names. E.g. Activity, Camera, Link.
          </small>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ fontWeight: '600' }}>URL Path</label>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            backgroundColor: 'rgba(255,255,255,0.05)', 
            borderRadius: '4px', 
            border: '1px solid rgba(255,255,255,0.2)', 
            paddingRight: '0.75rem',
            transition: 'border-color 0.3s'
          }}
          onFocus={(e) => e.currentTarget.style.borderColor = 'var(--color-primary)'}
          onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'}
          >
            <span style={{ padding: '0.75rem', opacity: 0.7, fontSize: '0.9rem', borderRight: '1px solid rgba(255,255,255,0.1)', marginRight: '0.75rem' }}>
              https://test-cosmichorizon-worker-68a3110f01feebd0.elb.us-gov-west-1.amazonaws.com/
            </span>
            <input 
              type="text" 
              value={urlPath} 
              onChange={(e) => setUrlPath(e.target.value)} 
              required 
              style={{ 
                flex: 1, 
                padding: '0.75rem 0', 
                backgroundColor: 'transparent', 
                color: 'white', 
                border: 'none', 
                outline: 'none',
                minWidth: '50px'
              }}
              placeholder="cs-webscout"
            />
          </div>
        </div>

        <button 
          type="submit" 
          style={{ 
            padding: '1rem', 
            backgroundColor: 'var(--color-primary)', 
            color: 'var(--color-bg)', 
            border: 'none', 
            borderRadius: '4px', 
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '1rem',
            marginTop: '1.5rem',
            transition: 'transform 0.2s, background-color 0.2s',
            boxShadow: '0 0 15px rgba(0, 242, 254, 0.4)'
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
          Add Link to Home Page
        </button>
      </form>
    </div>
  );
};

export default EditLink;
