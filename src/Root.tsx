import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import Home from './views/Home';
import Dashboard from './views/Dashboard/Dashboard';
import Login from './views/Login';
import DisplayView from './views/Display';
import NotFound from './views/NotFound';

const Root: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/display/:path" element={<DisplayView />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default Root;
