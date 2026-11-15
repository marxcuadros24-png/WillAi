import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Flame,
  Shield,
  Compass,
  CheckCircle2,
  Globe,
  WifiOff,
  Languages,
  Mountain,
  Droplets,
  Play,
  X,
  Radio,
  ArrowRight
} from 'lucide-react';
import './LandingPage.css';

// SVG Icons for GitHub and YouTube
const GithubIcon: React.FC<{ size?: number; className?: string }> = ({ size = 18, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const YoutubeIcon: React.FC<{ size?: number; color?: string; className?: string }> = ({ size = 18, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
    <polygon points="10 15 15 12 10 9 10 15" fill={color} />
  </svg>
);

export const LandingPage: React.FC = () => {
  const GITHUB_URL = 'https://github.com/marxcuadros24-png/WillAi-ML';
  const YOUTUBE_URL = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'; // Replace with official demo URL

  const [solutionTab, setSolutionTab] = useState<'command' | 'mobile'>('command');
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [livePulse, setLivePulse] = useState(0);

  // ENSURE SCROLL WORKS SEAMLESSLY ACROSS BROWSERS
  useEffect(() => {
    const rootEl = document.getElementById('root');
    document.documentElement.style.overflowY = 'auto';
    document.body.style.overflowY = 'auto';
    if (rootEl) {
      rootEl.style.overflowY = 'auto';
      rootEl.style.height = 'auto';
    }

    const timer = setInterval(() => {
      setLivePulse((prev) => (prev + 1) % 4);
    }, 3500);

    return () => {
      clearInterval(timer);
      document.documentElement.style.overflowY = '';
      document.body.style.overflowY = '';
      if (rootEl) {
        rootEl.style.overflowY = '';
        rootEl.style.height = '';
      }
    };
  }, []);

  const teamMembers = [
    {
      name: 'Marx Cuadros',
      role: 'Team Lead & Full-Stack Architect',
      photo: '/Marx Cuadros.jpeg',
      desc: 'Architecture lead for Django backend, React frontend, and NASA FIRMS real-time telemetry ingesta.'
    },
    {
      name: 'Denis Bellido',
      role: 'Machine Learning & Data Scientist',
      photo: '/Denis Bellido.jpeg',
      desc: 'Platt-calibrated Random Forest occurrence model, Canadian FWI calibration, and PR-AUC/Brier metrics.'
    },
    {
      name: 'Rodrigo Retamozo',
      role: 'Geospatial Engineer & Remote Sensing',
      photo: '/Rodrigo Retamozo.jpeg',
      desc: 'Satellite footprint reconstruction (scan/track), QGIS/Google Earth 3D export, and DEM Copernicus modeling.'
    },
    {
      name: 'Liliana Quilca',
      role: 'Sociocultural UX & Community Impact',
      photo: '/Liliana Quilca.jpeg',
      desc: 'Quechua Chanka language integration, rural safety protocols, and communal bofedal water preservation.'
    }
  ];

  return (
    <div className="lp-container">
      {/* 1. TOP NAVBAR */}
      <nav className="lp-navbar">
        <Link to="/" className="lp-nav-brand">
          <img src="/logo.jpeg" alt="WillAI Logo" className="lp-logo-img" />
          <div>
            <div className="lp-brand-title">WillAI</div>
            <div className="lp-brand-sub">NASA Space Apps 2026</div>
          </div>
        </Link>

        {/* Clean right actions — no clutter */}
        <div className="lp-nav-actions">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="lp-btn lp-btn-github"
            title="GitHub Repository"
          >
            <GithubIcon size={16} />
            <span>GitHub</span>
          </a>

          <button
            onClick={() => setIsVideoModalOpen(true)}
            className="lp-btn lp-btn-youtube"
            title="Watch Video Demonstration"
          >
            <YoutubeIcon size={16} color="#ef4444" />
            <span>Video Demo</span>
          </button>

          <Link to="/mapa" className="lp-btn lp-btn-primary">
            <Shield size={15} />
            <span>Launch Platform</span>
          </Link>
        </div>
      </nav>

      {/* 2. DYNAMIC HERO SECTION WITH LIVE HUD */}
      <div className="lp-hero-wrapper">
        <div className="lp-hero-grid">
          {/* Left Column: Narrative & Clear Actions */}
          <div>
            <div className="lp-badge-nasa">
              <img src="/Nasa logo.jfif" alt="NASA Logo" className="lp-badge-nasa-img" />
              <span>NASA Space Apps Challenge 2026</span>
            </div>

            <div className="lp-brand-hero-block">
              <h1 className="lp-hero-brand-name">
                WillAI
              </h1>
              <div className="lp-hero-subtitle-block">
                Space Intelligence & Machine Learning to Protect the{' '}
                <span className="lp-hero-highlight">High Andes from Wildfires</span>
              </div>
            </div>

            <p className="lp-hero-desc">
              WillAI bridges <strong>NASA FIRMS</strong> satellite observations (VIIRS 375m & MODIS 1km),
              high-altitude Canadian FWI calibration, and bilingual Quechua alerts to save lives, safeguard
              communal water basins, and prevent wildfire catastrophes in Parinacochas, Ayacucho, Peru.
            </p>

            <div className="lp-hero-actions">
              <Link to="/mapa" className="lp-btn lp-btn-primary" style={{ padding: '12px 22px', fontSize: '0.92rem' }}>
                <Compass size={18} />
                <span>Explore Tactical Map</span>
              </Link>

              <Link to="/publico" className="lp-btn lp-btn-emerald" style={{ padding: '12px 20px', fontSize: '0.92rem' }}>
                <Globe size={18} />
                <span>Citizen Public Portal</span>
              </Link>

              <button
                onClick={() => setIsVideoModalOpen(true)}
                className="lp-btn lp-btn-outline"
                style={{ padding: '12px 18px', fontSize: '0.92rem' }}
              >
                <Play size={16} color="#ef4444" />
                <span>Watch Demo</span>
              </button>
            </div>

            {/* KPI Chips — 0 Emojis, Pure Professional Tech Styling */}
            <div className="lp-kpi-chips">
              <div className="lp-chip">
                <span>RESOLUTION:</span>
                <strong>375m VIIRS</strong>
              </div>
              <div className="lp-chip">
                <span>ML GRID:</span>
                <strong>265 Cells</strong>
              </div>
              <div className="lp-chip">
                <span>ACCURACY (BRIER):</span>
                <strong>0.0056</strong>
              </div>
              <div className="lp-chip">
                <span>ALTITUDE:</span>
                <strong>3,200+ msnm</strong>
              </div>
            </div>
          </div>

          {/* Right Column: Live Andean Satellite Telemetry HUD */}
          <div>
            <div className="lp-hud-card">
              <div className="lp-hud-header">
                <div className="lp-hud-radar-badge">
                  <span className="lp-radar-dot"></span>
                  <span>Live Telemetry Station</span>
                </div>
                <div className="lp-hud-location">
                  Coracora, Ayacucho (-15.0189, -73.7806)
                </div>
              </div>

              <div className="lp-hud-metric-row">
                <div className="lp-hud-metric-box">
                  <div className="lp-hud-metric-label">NASA FIRMS Status</div>
                  <div className="lp-hud-metric-val" style={{ color: '#ef4444' }}>
                    {livePulse === 0 ? 'Active Scan' : '2 Thermal Foci'}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--lp-text-muted)', marginTop: '2px' }}>
                    VIIRS 375m / FRP: 18.4 MW
                  </div>
                </div>

                <div className="lp-hud-metric-box">
                  <div className="lp-hud-metric-label">Wind Vector (Meteo)</div>
                  <div className="lp-hud-metric-val" style={{ color: '#38bdf8' }}>
                    18 km/h NW
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--lp-text-muted)', marginTop: '2px' }}>
                    Gusts: 34 km/h (DEM Correc.)
                  </div>
                </div>
              </div>

              <div className="lp-hud-metric-row">
                <div className="lp-hud-metric-box">
                  <div className="lp-hud-metric-label">Canadian FWI Pajonal</div>
                  <div className="lp-hud-metric-val" style={{ color: '#f59e0b' }}>
                    58.4 High
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--lp-text-muted)', marginTop: '2px' }}>
                    PR-AUC 0.7816 Calibrated
                  </div>
                </div>

                <div className="lp-hud-metric-box">
                  <div className="lp-hud-metric-label">Platt ML Occurrence</div>
                  <div className="lp-hud-metric-val" style={{ color: '#10b981' }}>
                    265 Active Cells
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--lp-text-muted)', marginTop: '2px' }}>
                    Parinacochas 8 Districts
                  </div>
                </div>
              </div>

              {/* Bilingual Quechua Safety Broadcast */}
              <div className="lp-hud-quechua-banner">
                <Flame size={20} color="#ef4444" style={{ flexShrink: 0 }} />
                <div className="lp-hud-quechua-text">
                  <strong>Quechua Early Safety Broadcast:</strong><br />
                  <em>"Qata wichayman amapuni asuykuychu"</em> — Never approach fire uphill due to thermal updrafts.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. THE ANDEAN PROBLEM SECTION */}
      <section className="lp-section">
        <div className="lp-section-header">
          <div className="lp-section-tag">The Andean Challenge</div>
          <h2 className="lp-section-title">The Triple Andean Divide</h2>
          <p className="lp-section-desc">
            In the remote highlands of Ayacucho, wildfires threaten communal lives, destroy pastureland for livestock,
            and damage irreplaceable peat water basins (*bofedales*).
          </p>
        </div>

        <div className="lp-grid-3">
          <div className="lp-card">
            <div className="lp-card-icon" style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444' }}>
              <Mountain size={26} />
            </div>
            <h3 className="lp-card-title">Deadly Andean Topography</h3>
            <p className="lp-card-text">
              Steep volcanic slopes and dry <em>ichu</em> grasslands act as natural chimneys. Flames rush uphill at
              speeds exceeding 40 km/h, frequently trapping local volunteers who lack wind telemetry.
            </p>
          </div>

          <div className="lp-card">
            <div className="lp-card-icon" style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8' }}>
              <WifiOff size={26} />
            </div>
            <h3 className="lp-card-title">Connectivity & Blind-Spot Divide</h3>
            <p className="lp-card-text">
              Isolated valleys lack cellular coverage. Smoke columns are often noticed hours late, after dozens of
              hectares are ablaze and fire crews are miles away across rugged mountain trails.
            </p>
          </div>

          <div className="lp-card">
            <div className="lp-card-icon" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b' }}>
              <Languages size={26} />
            </div>
            <h3 className="lp-card-title">Linguistic & Cultural Barrier</h3>
            <p className="lp-card-text">
              Indigenous Quechua-speaking farmers defend their herds with branches and shovels. Conventional
              civil protection broadcasts in technical Spanish fail to reach frontline communities.
            </p>
          </div>
        </div>
      </section>

      {/* 4. INTERACTIVE SOLUTION SHOWCASE (DUAL-FRONT TABS) */}
      <section className="lp-section">
        <div className="lp-solution-box">
          <div className="lp-section-header" style={{ marginBottom: '24px' }}>
            <div className="lp-section-tag">Engineered for Resilience</div>
            <h2 className="lp-section-title">WillAI Dual-Front Architecture</h2>
            <p className="lp-section-desc">
              Empowering frontline indigenous populations while equipping emergency command centers with space-grade analytics.
            </p>
          </div>

          {/* Interactive Tab Switcher */}
          <div className="lp-tab-nav">
            <button
              onClick={() => setSolutionTab('command')}
              className={`lp-tab-btn ${solutionTab === 'command' ? 'active' : ''}`}
            >
              <Shield size={16} />
              <span>Tactical Command Center (Web)</span>
            </button>

            <button
              onClick={() => setSolutionTab('mobile')}
              className={`lp-tab-btn ${solutionTab === 'mobile' ? 'active' : ''}`}
            >
              <Radio size={16} />
              <span>Citizen Mobile App (Offline Expo)</span>
            </button>
          </div>

          {/* Tab Content 1: Command Center */}
          {solutionTab === 'command' && (
            <div className="lp-tab-content-grid">
              <div>
                <h3 className="lp-card-title" style={{ fontSize: '1.4rem' }}>
                  Geospatial AI & Satellite Command Center
                </h3>
                <p className="lp-card-text">
                  A high-density SPA tailored for COEP, Civil Defense, and Volunteer Firefighters B-12 of Coracora:
                </p>

                <ul className="lp-bullet-list">
                  <li className="lp-bullet-item">
                    <CheckCircle2 size={16} className="lp-bullet-check" />
                    <span><strong>Physical Satellite Polygons:</strong> True scan/track footprints in UTM 18S, not just dimensionless dots.</span>
                  </li>
                  <li className="lp-bullet-item">
                    <CheckCircle2 size={16} className="lp-bullet-check" />
                    <span><strong>Multi-Sensor Fusion (VIIRS + MODIS):</strong> Automated track fusion by day and metric proximity (1,200m buffer) with direct QGIS (.zip) and Google Earth 3D (.kmz) export.</span>
                  </li>
                  <li className="lp-bullet-item">
                    <CheckCircle2 size={16} className="lp-bullet-check" />
                    <span><strong>265-Cell ML Risk Grid:</strong> Calibrated occurrence probabilities taking into account elevation, slope, and community distance.</span>
                  </li>
                  <li className="lp-bullet-item">
                    <CheckCircle2 size={16} className="lp-bullet-check" />
                    <span><strong>Cell2Fire Huygens Simulation:</strong> Elliptical fire propagation with ±15° stochastic wind uncertainty band.</span>
                  </li>
                </ul>

                <div style={{ marginTop: '24px' }}>
                  <Link to="/mapa" className="lp-btn lp-btn-primary">
                    <Compass size={16} />
                    <span>Open Tactical Map</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>

              <div className="lp-preview-box">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span style={{ fontSize: '0.78rem', color: '#38bdf8', fontFamily: 'var(--lp-font-mono)' }}>
                    TACTICAL HUD • CORACORA LEAFLET SPA
                  </span>
                  <span style={{ fontSize: '0.72rem', background: 'rgba(16, 185, 129, 0.2)', color: '#10b981', padding: '2px 8px', borderRadius: '4px' }}>
                    ONLINE
                  </span>
                </div>
                <div style={{ background: '#070c18', padding: '16px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                  <div style={{ color: '#f8fafc', fontSize: '0.85rem', marginBottom: '8px', fontWeight: 700 }}>
                    Active Thermal Cluster: Sector Huallhua
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--lp-text-secondary)', lineHeight: 1.5 }}>
                    • Sensor: VIIRS NOAA-20 (375m)<br />
                    • Confidence: Nominal (87%)<br />
                    • Distance to Community: 2.4 km<br />
                    • Dispatch: Brigada B-12 Notified
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab Content 2: Mobile App */}
          {solutionTab === 'mobile' && (
            <div className="lp-tab-content-grid">
              <div>
                <h3 className="lp-card-title" style={{ fontSize: '1.4rem' }}>
                  Bilingual Quechua Citizen Mobile App
                </h3>
                <p className="lp-card-text">
                  Designed for rural watchmen, farmers, and community brigades in zero-connectivity environments:
                </p>

                <ul className="lp-bullet-list">
                  <li className="lp-bullet-item">
                    <CheckCircle2 size={16} className="lp-bullet-check" />
                    <span><strong>Vital Safety Doctrine:</strong> Alerts display <em>"Qata wichayman amapuni asuykuychu"</em> (Never approach fire uphill).</span>
                  </li>
                  <li className="lp-bullet-item">
                    <CheckCircle2 size={16} className="lp-bullet-check" />
                    <span><strong>Offline SQLite Queue:</strong> Stores photographic proof and GPS coordinates, auto-syncing upon signal recovery.</span>
                  </li>
                  <li className="lp-bullet-item">
                    <CheckCircle2 size={16} className="lp-bullet-check" />
                    <span><strong>Civic Guard Credential:</strong> Verified QR with SHA-256 integrity and civic badges recognizing community reporters.</span>
                  </li>
                </ul>

                <div style={{ marginTop: '24px' }}>
                  <Link to="/publico" className="lp-btn lp-btn-emerald">
                    <Globe size={16} />
                    <span>View Public Observatory</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>

              <div className="lp-preview-box">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span style={{ fontSize: '0.78rem', color: '#10b981', fontFamily: 'var(--lp-font-mono)' }}>
                    WILLAI MOBILE • QUECHUA INTERFACE
                  </span>
                  <span style={{ fontSize: '0.72rem', background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444', padding: '2px 8px', borderRadius: '4px' }}>
                    OFFLINE-FIRST
                  </span>
                </div>
                <div style={{ background: '#070c18', padding: '16px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                  <div style={{ color: '#ef4444', fontSize: '0.85rem', marginBottom: '8px', fontWeight: 700 }}>
                    HATUN WILLAKUY (Alerta Roja)
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--lp-text-secondary)', lineHeight: 1.5 }}>
                    • "Nina rawray kallpawan wichaykamuchkan"<br />
                    • GPS Precision: ±3.2 meters<br />
                    • SQLite Queue: 1 incident synchronized<br />
                    • Video Evidencia: 15s MP4 Attached
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 5. POWERED BY NASA SECTION */}
      <section className="lp-section">
        <div className="lp-section-header">
          <div className="lp-section-tag">Space Telemetry</div>
          <h2 className="lp-section-title">Powered by NASA Earth Observations</h2>
          <p className="lp-section-desc">
            Direct ingestion and physical modeling of authentic NASA and European Space Agency open datasets.
          </p>
        </div>

        <div className="lp-nasa-grid">
          <div className="lp-nasa-card">
            <div className="lp-nasa-header">
              <span className="lp-nasa-title">NASA FIRMS</span>
              <span className="lp-nasa-sub">REST API</span>
            </div>
            <p className="lp-card-text">
              Real-time ingestion of active thermal anomalies across the Parinacochas bounding box with Fire Radiative Power (MW).
            </p>
          </div>

          <div className="lp-nasa-card">
            <div className="lp-nasa-header">
              <span className="lp-nasa-title">VIIRS 375m</span>
              <span className="lp-nasa-sub">SNPP & NOAA</span>
            </div>
            <p className="lp-card-text">
              Ultra-high spatial resolution detecting small Andean initial fires before they expand into disaster fronts.
            </p>
          </div>

          <div className="lp-nasa-card">
            <div className="lp-nasa-header">
              <span className="lp-nasa-title">MODIS 1km</span>
              <span className="lp-nasa-sub">Terra & Aqua</span>
            </div>
            <p className="lp-card-text">
              Dual daily orbital passes providing multi-decadal historical calibration and spatial-temporal dissolve with VIIRS tracks.
            </p>
          </div>

          <div className="lp-nasa-card">
            <div className="lp-nasa-header">
              <span className="lp-nasa-title">Copernicus GLO-30</span>
              <span className="lp-nasa-sub">DEM 30m</span>
            </div>
            <p className="lp-card-text">
              High-accuracy Andean topography (2,200 to 4,800 msnm) driving slope correction vectors for cellular fire propagation.
            </p>
          </div>
        </div>
      </section>

      {/* 6. MEET THE TEAM SECTION */}
      <section className="lp-section">
        <div className="lp-section-header">
          <div className="lp-section-tag">Human Capital</div>
          <h2 className="lp-section-title">Meet the WillAI Team</h2>
          <p className="lp-section-desc">
            Multidisciplinary Peruvian innovators combining software engineering, data science, geospatial physics, and indigenous cultural advocacy.
          </p>
        </div>

        <div className="lp-team-grid">
          {teamMembers.map((member, idx) => (
            <div key={idx} className="lp-member-card">
              <div className="lp-member-avatar-wrapper">
                <img
                  src={member.photo}
                  alt={member.name}
                  className="lp-member-avatar"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
              <h3 className="lp-member-name">{member.name}</h3>
              <div className="lp-member-role">{member.role}</div>
              <p className="lp-member-desc">{member.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. SOCIOCULTURAL & ENVIRONMENTAL IMPACT */}
      <section className="lp-section" style={{ paddingTop: 0 }}>
        <div className="lp-cta-banner">
          <Droplets size={40} color="#38bdf8" style={{ marginBottom: '14px' }} />
          <h2 className="lp-section-title" style={{ fontSize: '1.8rem', marginBottom: '12px' }}>
            Preserving the High-Andean Ecosystems
          </h2>
          <p style={{ maxWidth: '820px', margin: '0 auto 24px auto', color: 'var(--lp-text-secondary)', lineHeight: 1.6, fontSize: '0.94rem' }}>
            The high-Andean pajonales and wetlands (bofedales) are the lifeblood of our province, sustaining rural communities throughout the dry season. By simulating fire propagation and issuing early alerts, WillAI provides the tactical intelligence needed to stop wildfires before they devastate these critical landscapes, protecting both regional water security and our agrarian heritage.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <Link to="/mapa" className="lp-btn lp-btn-primary">
              <Compass size={16} />
              <span>Open Tactical Map</span>
            </Link>
            <Link to="/publico" className="lp-btn lp-btn-outline">
              <Globe size={16} />
              <span>Explore Public Portal</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 8. FOOTER */}
      <footer className="lp-footer">
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img src="/logo.jpeg" alt="WillAI Logo" style={{ width: 24, height: 24, borderRadius: 6, objectFit: 'cover' }} />
            <span><strong>WillAI</strong> — Early Warning & Wildfire Management System • Parinacochas, Ayacucho, Peru.</span>
          </div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--lp-text-secondary)', textDecoration: 'none' }}>
              GitHub
            </a>
            <button
              onClick={() => setIsVideoModalOpen(true)}
              style={{ color: 'var(--lp-text-secondary)', background: 'transparent', border: 'none', cursor: 'pointer', font: 'inherit', padding: 0 }}
            >
              YouTube Demo
            </button>
            <Link to="/publico" style={{ color: 'var(--lp-text-secondary)', textDecoration: 'none' }}>
              Citizen Portal
            </Link>
            <a href="http://127.0.0.1:8000/api/docs/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--lp-text-secondary)', textDecoration: 'none' }}>
              Swagger OpenAPI
            </a>
          </div>
        </div>
        <div style={{ maxWidth: '1280px', margin: '14px auto 0 auto', fontSize: '0.78rem', color: 'var(--lp-text-muted)' }}>
          Developed for the NASA Space Apps Challenge 2026. Open Source under the MIT License.
        </div>
      </footer>

      {/* 9. VIDEO DEMO MODAL POPUP */}
      {isVideoModalOpen && (
        <div className="lp-modal-overlay" onClick={() => setIsVideoModalOpen(false)}>
          <div className="lp-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="lp-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <YoutubeIcon size={20} color="#ef4444" />
                <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#ffffff' }}>WillAI — Official NASA Space Apps Video Demo</h3>
              </div>
              <button className="lp-modal-close" onClick={() => setIsVideoModalOpen(false)}>
                <X size={20} />
              </button>
            </div>
            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: '10px', background: '#000' }}>
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="WillAI Demonstration Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--lp-text-muted)' }}>
                Demonstration of NASA FIRMS API, 265 ML cells & Bilingual Quechua app.
              </span>
              <a
                href={YOUTUBE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="lp-btn lp-btn-youtube"
                style={{ fontSize: '0.8rem', padding: '6px 12px' }}
              >
                Open on YouTube
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
