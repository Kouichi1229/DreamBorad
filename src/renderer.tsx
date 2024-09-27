import React from 'react';
import { createRoot } from 'react-dom/client';
import DreamBoard from './components/DreamBoard';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <DreamBoard />
  </React.StrictMode>
);