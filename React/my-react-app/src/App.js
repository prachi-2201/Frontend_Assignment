import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';

const AdminModule = lazy(() => import('./modules/Admin'));

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin/*" element={<AdminModule />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
