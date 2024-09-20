import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import '@fontsource/poppins';
import { SettingsPage } from './pages/Settings';

const App: React.FC = () => {
  return (
    <div className={'p-2'}>
      <SettingsPage />
    </div>
  );
};

const container = document.getElementById('root');
const root = createRoot(container);

root.render(<App />);
