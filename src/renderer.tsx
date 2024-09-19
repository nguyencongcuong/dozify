import React from 'react';
import { createRoot } from 'react-dom/client';

const App: React.FC = () => {
  return (
    <div>
      <div>Dozify - Keep Your Mac Awake, Effortlessly</div>
    </div>
  );
};

const container = document.getElementById('root');
const root = createRoot(container);

root.render(<App />);
