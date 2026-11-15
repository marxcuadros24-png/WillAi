import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Map as MapIcon,
  Flame,
  CheckCircle2,
  Satellite,
  Clock,
  RefreshCw,
  CloudRain,
  Radio,
  ChevronRight,
  PlusCircle,
  ShieldAlert,
  Menu,
  Globe,
  Home
} from 'lucide-react';
import type { AppContextType } from '../context/AppContext';

interface LayoutProps {
  context: AppContextType;
}

export const Layout: React.FC<LayoutProps> = ({ context }) => {
  const {
    metricas,
    fwi,
    incidentes,
    reportes,
    loadAllData: onRefreshData,
    onOpenCreateIncident,
    onOpenAlertModal
  } = context;
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<string>('');

  // Reloj en tiempo real (Coracora / Perú UTC-5)
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('es-PE', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        }) + ' PET'
      );
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const incidentesCount = metricas?.incidentes_activos ?? incidentes.filter(i => i.estado !== 'cerrado').length;
  const reportesCount = metricas?.reportes_pendientes ?? reportes.filter(r => r.estado === 'recibido').length;
  const esLluvia = fwi.precipitacion > 0 || fwi.humedad_relativa >= 75;

  // Breadcrumbs title
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/panel':
        return 'Panel Principal Ejecutivo';
      case '/mapa':
        return 'Centro de Mando Táctico en Vivo';
      case '/incidentes':
        return 'Gestión de Incidentes & Despacho';
      case '/reportes':
        return 'Bandeja de Reportes Ciudadanos';
      case '/brigadas':
        return 'Gestión de Brigadas & Dotación Operativa';
      case '/viviendas':
        return 'Padrón de Viviendas Rurales Vulnerables';
      case '/usuarios':
        return 'Gestión de Usuarios & Personal (Exclusivo Administrador)';
      case '/logros':
        return 'Cuadro de Honor & Logros Comunitarios';
      case '/alertas':
        return 'Emisión y Monitoreo de Alertas';
      case '/donaciones':
        return 'Moderación de Donaciones Comunitarias';
      case '/satelites':
        return 'Sincronización NASA FIRMS & SERFOR';
      default:
        return 'Centro de Operaciones';
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', width: '100vw', background: 'var(--bg-app)', color: '#ffffff', overflowX: 'hidden' }}>
      {/* ========================================================
          SIDEBAR MODULAR PERSISTENTE
         ======================================================== */}
      <aside
        style={{
          width: sidebarOpen ? '270px' : '78px',
          background: 'var(--panel-bg-dark)',
          borderRight: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          transition: 'width 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
          zIndex: 100,
          flexShrink: 0
        }}
      >
        {/* Top: Branding & Switch */}
        <div>
          <div
            style={{
              padding: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: sidebarOpen ? 'space-between' : 'center',
              borderBottom: '1px solid rgba(255, 255, 255, 0.06)'
            }}
          >
            {sidebarOpen ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    background: 'linear-gradient(135deg, #ef4444 0%, #ea580c 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 14px rgba(239, 68, 68, 0.35)',
                    flexShrink: 0
                  }}
                >
                  <Flame size={22} color="#ffffff" />
                </div>
                <div>
                  <div style={{ fontWeight: 900, fontSize: '16px', letterSpacing: '-0.02em', color: '#ffffff' }}>
                    WillAI
                  </div>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                    CENTRO DE MANDO
                  </div>
                </div>
              </div>
            ) : (
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #ef4444 0%, #ea580c 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 14px rgba(239, 68, 68, 0.35)'
                }}
              >
                <Flame size={20} color="#ffffff" />
              </div>
            )}

            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                padding: '4px',
                display: sidebarOpen ? 'block' : 'none'
              }}
              title={sidebarOpen ? 'Colapsar barra lateral' : 'Expandir barra lateral'}
            >
              <Menu size={18} />
            </button>
          </div>

          {/* Navegación Seccionada del MVP */}
          <div style={{ padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {sidebarOpen && (
              <div style={{ fontSize: '10px', fontWeight: 800, color: 'var(--text-muted)', letterSpacing: '0.08em', padding: '0 8px 6px 8px' }}>
                MONITOREO & MACHINE LEARNING
              </div>
            )}

            {/* 1. Mapa Táctico en Vivo */}
            <NavLink
              to="/mapa"
              className={({ isActive }) => `sidebar-nav-item ${isActive && context.sidebarTab !== 'riesgo' ? 'active' : ''}`}
              title="Centro de Mando Táctico y Capas Satelitales"
              onClick={() => context.setSidebarTab('incidentes')}
            >
              <MapIcon size={18} />
              {sidebarOpen && <span>Mapa Táctico en Vivo</span>}
            </NavLink>

            {/* 2. Módulo Machine Learning: Riesgo de Ocurrencia */}
            <button
              onClick={() => {
                context.setSidebarTab('riesgo');
                context.setShowRiesgoOcurrencia(true);
                navigate('/mapa');
              }}
              className="sidebar-nav-item"
              style={{
                background: location.pathname === '/mapa' && context.sidebarTab === 'riesgo' ? 'rgba(245, 158, 11, 0.18)' : 'transparent',
                border: location.pathname === '/mapa' && context.sidebarTab === 'riesgo' ? '1px solid rgba(245, 158, 11, 0.35)' : 'none',
                width: '100%',
                textAlign: 'left',
                cursor: 'pointer',
                color: '#f59e0b',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '10px 14px',
                borderRadius: '8px',
                marginTop: '2px',
                marginBottom: '4px'
              }}
              title="Módulo de Machine Learning: Riesgo de Ocurrencia y Cuadrícula Calibrada"
            >
              <ShieldAlert size={18} color="#f59e0b" />
              {sidebarOpen && (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                  <span style={{ fontWeight: 700, fontSize: '13px' }}>Predicción ML</span>
                  <span style={{ fontSize: '10px', background: 'rgba(245, 158, 11, 0.25)', color: '#f59e0b', padding: '1px 5px', borderRadius: '4px', fontWeight: 800 }}>
                    265 CELDAS
                  </span>
                </div>
              )}
            </button>

            {/* 3. Telemetría y Sincronización NASA FIRMS */}
            <NavLink
              to="/satelites"
              className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`}
              title="Ingesta Satelital NASA FIRMS (VIIRS 375m & MODIS 1km)"
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%' }}>
                <Satellite size={18} color="#38bdf8" />
                {sidebarOpen && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <span>Telemetría Satelital</span>
                    <span style={{ fontSize: '9px', background: 'rgba(56, 189, 248, 0.2)', color: '#38bdf8', padding: '1px 5px', borderRadius: '4px', fontWeight: 800 }}>
                      NASA
                    </span>
                  </div>
                )}
              </div>
            </NavLink>

            {sidebarOpen && (
              <div style={{ fontSize: '10px', fontWeight: 800, color: 'var(--text-muted)', letterSpacing: '0.08em', padding: '16px 8px 6px 8px' }}>
                GESTIÓN DE RESPUESTA
              </div>
            )}

            {/* 4. Incidentes Tácticos */}
            <NavLink
              to="/incidentes"
              className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`}
              title="Incidentes Operacionales y Despacho B-12"
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%' }}>
                <Flame size={18} />
                {sidebarOpen && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <span>Incidentes Tácticos</span>
                    {incidentesCount > 0 && (
                      <span className="badge badge-red" style={{ fontSize: '10px', padding: '1px 6px' }}>
                        {incidentesCount}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </NavLink>

            {/* 5. Reportes Ciudadanos */}
            <NavLink
              to="/reportes"
              className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`}
              title="Bandeja de Reportes de Comuneros con Fotografía"
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%' }}>
                <CheckCircle2 size={18} />
                {sidebarOpen && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <span>Reportes Ciudadanos</span>
                    {reportesCount > 0 && (
                      <span className="badge badge-yellow" style={{ fontSize: '10px', padding: '1px 6px' }}>
                        {reportesCount}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </NavLink>

            {/* 6. Panel Ejecutivo */}
            <NavLink
              to="/panel"
              className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`}
              title="Resumen Ejecutivo y Métricas de Peligro FWI"
            >
              <LayoutDashboard size={18} />
              {sidebarOpen && <span>Panel Ejecutivo</span>}
            </NavLink>

            {sidebarOpen && (
              <div style={{ fontSize: '10px', fontWeight: 800, color: 'var(--text-muted)', letterSpacing: '0.08em', padding: '16px 8px 6px 8px' }}>
                ACCESO COMUNITARIO
              </div>
            )}

            {/* 7. PORTAL PÚBLICO CIUDADANO (ACCESO DIRECTO) */}
            <NavLink
              to="/publico"
              className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`}
              style={{
                background: 'rgba(16, 185, 129, 0.12)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                color: '#6ee7b7'
              }}
              title="Ver el Portal Público Comunal de Alertas de Incendios"
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%' }}>
                <Globe size={18} color="#10b981" />
                {sidebarOpen && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <span style={{ fontWeight: 800, color: '#a7f3d0' }}>Portal Público</span>
                    <span style={{ fontSize: '9px', background: '#10b981', color: '#064e3b', padding: '1px 5px', borderRadius: '4px', fontWeight: 900 }}>
                      CIUDADANOS
                    </span>
                  </div>
                )}
              </div>
            </NavLink>
          </div>
        </div>

        {/* Bottom: Estado de Fuentes & Perfil de Usuario */}
        <div>
          {sidebarOpen && (
            <div style={{ padding: '12px 18px', borderTop: '1px solid rgba(255, 255, 255, 0.06)', background: 'rgba(0, 0, 0, 0.2)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '11px', color: 'var(--text-muted)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Radio size={12} color="#10b981" />
                    NASA FIRMS VIIRS/MODIS
                  </span>
                  <span style={{ color: '#10b981', fontWeight: 700 }}>ONLINE</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <CloudRain size={12} color="#38bdf8" />
                    Open-Meteo Coracora
                  </span>
                  <span style={{ color: '#38bdf8', fontWeight: 700 }}>ONLINE</span>
                </div>
              </div>
            </div>
          )}

          {/* User Card */}
          <div
            style={{
              padding: '14px 16px',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: sidebarOpen ? 'space-between' : 'center',
              gap: '10px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', overflow: 'hidden' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'rgba(56, 189, 248, 0.2)',
                  border: '1px solid rgba(56, 189, 248, 0.45)',
                  color: '#38bdf8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '13px',
                  flexShrink: 0
                }}
              >
                W
              </div>
              {sidebarOpen && (
                <div style={{ overflow: 'hidden' }}>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#ffffff', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                    Acceso Público
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }} title="Acceso Público Abierto">
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '9.5px', color: '#34d399', fontWeight: 800, letterSpacing: '0.03em' }}>
                      <Globe size={10} color="#34d399" /> PÚBLICO / ABIERTO
                    </span>
                  </div>
                </div>
              )}
            </div>

            {sidebarOpen && (
              <NavLink
                to="/"
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  padding: '6px',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background 0.2s, color 0.2s',
                  textDecoration: 'none'
                }}
                title="Volver a la Página Principal (Inicio)"
              >
                <Home size={16} />
              </NavLink>
            )}
          </div>
        </div>
      </aside>

      {/* ========================================================
          CONTENEDOR PRINCIPAL (TOPBAR + CONTENIDO ESPACIOSO)
         ======================================================== */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, height: '100vh', overflowY: 'auto' }}>
        {/* Top Header Barra Superior */}
        <header
          style={{
            height: '64px',
            background: 'rgba(15, 23, 42, 0.85)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 28px',
            backdropFilter: 'blur(12px)',
            position: 'sticky',
            top: 0,
            zIndex: 90,
            flexShrink: 0
          }}
        >
          {/* Breadcrumbs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--text-muted)' }}>WillAI</span>
            <ChevronRight size={15} color="var(--text-muted)" />
            <span style={{ fontSize: '15.5px', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.01em' }}>
              {getPageTitle()}
            </span>
          </div>

          {/* Monitor Resumen & Acciones de Cabecera */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            {/* Pill Meteorológica en Vivo (Categoría / Estado) */}
            <div
              style={{
                background: esLluvia ? 'rgba(56, 189, 248, 0.12)' : 'rgba(239, 68, 68, 0.14)',
                border: esLluvia ? '1px solid rgba(56, 189, 248, 0.35)' : '1px solid rgba(239, 68, 68, 0.35)',
                padding: '5px 14px',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '12.5px',
                fontFamily: 'var(--font-mono)'
              }}
            >
              <span style={{ color: esLluvia ? '#38bdf8' : '#f87171', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                {esLluvia ? <CloudRain size={13} color="#38bdf8" /> : <Flame size={13} color="#f87171" />}
                {esLluvia ? 'Lluvia Activa' : 'Riesgo'} {fwi.nivel_peligro.toUpperCase()}
              </span>
              <span style={{ color: 'var(--text-muted)' }}>•</span>
              <span style={{ color: '#ffffff', fontWeight: 600 }}>{fwi.temperatura}°C</span>
              <span style={{ color: 'var(--text-muted)' }}>•</span>
              <span style={{ color: '#38bdf8', fontWeight: 600 }}>{fwi.humedad_relativa}% Hum</span>
              {fwi.precipitacion > 0 && (
                <>
                  <span style={{ color: 'var(--text-muted)' }}>•</span>
                  <span style={{ color: '#60a5fa', fontWeight: 600 }}>{fwi.precipitacion} mm</span>
                </>
              )}
            </div>

            {/* Reloj en Vivo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
              <Clock size={15} />
              <span>{currentTime}</span>
            </div>

            {/* Botón de Refresco Global */}
            <button
              className="btn-admin btn-admin-outline"
              style={{ padding: '7px 12px', fontSize: '0.84rem' }}
              onClick={onRefreshData}
              title="Refrescar todos los datos en caliente"
            >
              <RefreshCw size={14} />
              <span>Sync</span>
            </button>

            {/* Acceso Directo al Portal Público */}
            <NavLink
              to="/publico"
              className="btn-admin"
              style={{
                padding: '7px 14px',
                fontSize: '0.84rem',
                background: 'rgba(16, 185, 129, 0.15)',
                color: '#34d399',
                border: '1px solid rgba(16, 185, 129, 0.4)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: 700
              }}
              title="Abrir Portal Público de Emergencias (Vista para Comuneros y Ciudadanos)"
            >
              <Globe size={14} color="#10b981" />
              <span>Ver Portal Público</span>
            </NavLink>

            {/* Acciones Rápidas */}
            <button
              className="btn-admin btn-admin-primary"
              style={{ padding: '7px 14px', fontSize: '0.84rem' }}
              onClick={onOpenCreateIncident}
            >
              <PlusCircle size={15} />
              <span>Nuevo Incidente</span>
            </button>

            <button
              className="btn-admin btn-admin-danger"
              style={{ padding: '7px 14px', fontSize: '0.84rem' }}
              onClick={onOpenAlertModal}
            >
              <ShieldAlert size={15} />
              <span>Emitir Alerta</span>
            </button>
          </div>
        </header>

        {/* Área de Contenido Principal (Espaciosa, Sin Apreturas) */}
        <main
          style={{
            flex: 1,
            padding: location.pathname === '/mapa' ? '0' : '28px 36px',
            maxWidth: location.pathname === '/mapa' ? '100%' : '1600px',
            margin: location.pathname === '/mapa' ? '0' : '0 auto',
            width: '100%',
            boxSizing: 'border-box'
          }}
        >
          <Outlet context={context} />
        </main>
      </div>
    </div>
  );
};
