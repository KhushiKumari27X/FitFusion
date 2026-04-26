import React from 'react';
import {
  Route,
  Routes,
  useLocation,
  Navigate,
} from 'react-router-dom';
import { Box } from '@mui/material';
import { Toaster } from "react-hot-toast";

import './App.css';

// Pages
import Home from './pages/Home';
import ExerciseDetails from './pages/ExerciseDetails';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import Register from './pages/Register';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';


//  Safer Protected Route (uses token)
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  return token ? children : <Navigate to="/login" replace />;
};


// Layout Wrapper
const AppContent = () => {
  const location = useLocation();

  const hideLayout =
    location.pathname === "/login" ||
    location.pathname === "/register";

  return (
    <>
      {/* Toast Notifications */}
      <Toaster position="top-right" />

      <Box
        width="400px"
        sx={{ width: { xl: '1488px' } }}
        m="auto"
      >
        {/* Navbar */}
        {!hideLayout && <Navbar />}

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/exercise/:id" element={<ExerciseDetails />} />

          {/* Protected Route */}
          <Route
            path="/favorites"
            element={
              <PrivateRoute>
                <Favorites />
              </PrivateRoute>
            }
          />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>

        {/* Footer */}
        {!hideLayout && <Footer />}
      </Box>
    </>
  );
};


// Main App (Router is already in index.js)
const App = () => <AppContent />;

export default App;