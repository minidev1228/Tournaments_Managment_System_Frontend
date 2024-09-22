import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import SignInPage from "./pages/signInPage"
import SignUpPage from './pages/signUpPage';
import MainPage from './pages/mainPage'

import './App.css';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignInPage />} />
        <Route path='/sign-up' element={<SignUpPage />} />
        <Route path='/myteam' element={<MainPage />} />
      </Routes>
    </Router>
  );
}

export default App;
