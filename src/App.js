// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';  
import Account from './pages/Account';  // Import the Account component
import UpdateProfile from './pages/UpdateProfile'; // Import UpdateProfile page
import DeleteAccount from './pages/DeleteAccount'; // Import DeleteAccount page

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/account" element={<Account />} />  {/* New Route for Account */}
            <Route path="/update-profile" element={<UpdateProfile />} />
            <Route path="/delete-account" element={<DeleteAccount />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
