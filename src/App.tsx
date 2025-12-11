import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Booking from './pages/Booking';

const App: React.FC = () => {
  return (
    <div className="app">
      <header className="header">
        <h1>Modex Ticket Booking</h1>
        <nav>
          <Link to="/">Home</Link> | <Link to="/admin">Admin</Link>
        </nav>
      </header>

      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/booking/:id" element={<Booking />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
