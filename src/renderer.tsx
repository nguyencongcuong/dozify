import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BackwardIcon } from '@heroicons/react/16/solid';

const App: React.FC = () => {
  return (
    <div>
      <div className={'bg-amber-200'}>
        Dozify - Keep Your Mac Awake, Effortlessly
        <BackwardIcon className="h-6 w-6" />
      </div>
    </div>
  );
};

const container = document.getElementById('root');
const root = createRoot(container);

root.render(<App />);
