import React from 'react';
import ReactDOM from 'react-dom/client';
import '@fontsource/six-caps/400.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/400-italic.css';
import '@fontsource/poppins/700.css';
import './styles.css';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GeneradorPage from './generador/generadorPage';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/generador" element={<GeneradorPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
