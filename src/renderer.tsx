import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

const App: React.FC = () => {
  return (
    <div>
      <div className={'bg-amber-200'}>
        Dozify - Keep Your Mac Awake, Effortlessly
      </div>
    </div>
  );
};

const container = document.getElementById('root');
const root = createRoot(container);

root.render(<App />);
