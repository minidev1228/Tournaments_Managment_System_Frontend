import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom'

import SignInPage from "./pages/signInPage"
import SignUpPage from './pages/signUpPage';
import MainPage from './pages/mainPage'
import ViewPage from './pages/viewPage'
import AdminPage from './pages/adminPage'
import EventPage from './pages/eventPage'

import './App.css';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignInPage />} />
        <Route path='/sign-up' element={<SignUpPage />} />
        <Route path='/mainPage' element={<MainPage />} />
        <Route path='/viewPage' element={<ViewPage />} />
        <Route path='/adminPage' element={<AdminPage />} />
        <Route path='/event' element={<EventPage />} />
      </Routes>
    </Router>
  );
}

export default App;
