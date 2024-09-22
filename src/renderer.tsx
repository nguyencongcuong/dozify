import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { SettingsPage } from './pages/Settings';
import { useAppearance } from './store/appearance.store';

const App: React.FC = () => {
  const { isRemainingTimeShown, trayIconSetNo, toggleDarkMode, theme } =
    useAppearance();

  useEffect(() => {
    window.electronAPI.toggleRemainingTime(isRemainingTimeShown);
  }, [isRemainingTimeShown]);

  useEffect(() => {
    window.electronAPI.changeTrayIcon(trayIconSetNo);
  }, [trayIconSetNo]);

  useEffect(() => {
    window.electronAPI.onThemeChange(toggleDarkMode);
  }, []);

  return <SettingsPage />;
};

const container = document.getElementById('root');
const root = createRoot(container);

root.render(<App />);
