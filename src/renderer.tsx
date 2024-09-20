import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import '@fontsource/poppins';
import { SettingsPage } from './pages/Settings';
import { ConfigProvider, ThemeConfig } from 'antd';

const theme: ThemeConfig = {
  token: {
    fontSize: 12,
    fontFamily: 'Poppins, sans-serif',
  },
};

const App: React.FC = () => {
  return (
    <ConfigProvider theme={theme}>
      <SettingsPage />
    </ConfigProvider>
  );
};

const container = document.getElementById('root');
const root = createRoot(container);

root.render(<App />);
