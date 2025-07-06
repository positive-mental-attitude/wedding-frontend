import React from 'react';
import { Routes, Route } from 'react-router-dom';
import WeddingRSVP from './components/WeddingRSVP';
import AfterpartyApp from './components/AfterpartyApp';

function App() {
  return (
    <Routes>
      <Route path="/" element={<WeddingRSVP />} />
      <Route path="/afterparty" element={<AfterpartyApp />} />
    </Routes>
  );
}

export default App;