import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Contact from './pages/Contact';
import Testimonials from './pages/Testimonials';
import Customers from './pages/Customers';
import CRM from './pages/CRM';
import WhatWeDo from './pages/WhatWeDo';
import Login from './pages/Login';

const theme = createTheme({
  palette: {
    primary: {
      main: '#B8860B', // Dark golden
      light: '#DAA520', // Golden rod
      dark: '#8B6914', // Dark golden brown
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#2F4F4F', // Dark slate gray
      light: '#708090', // Slate gray
      dark: '#1C2F2F', // Darker slate
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#F5F5F5', // Light gray background
      paper: '#FFFFFF',
    },
    text: {
      primary: '#2F4F4F', // Dark slate for main text
      secondary: '#696969', // Dim gray for secondary text
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
      color: '#2F4F4F',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
      color: '#2F4F4F',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          textTransform: 'none',
          fontWeight: 500,
        },
        containedPrimary: {
          '&:hover': {
            backgroundColor: '#8B6914',
          },
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <div className="App">
            <Navbar />
            <main style={{ minHeight: 'calc(100vh - 130px)', padding: '20px 0' }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/catalog" element={<Catalog />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/testimonials" element={<Testimonials />} />
                <Route path="/customers" element={<Customers />} />
                <Route path="/login" element={<Login />} />
                <Route path="/what-we-do" element={<WhatWeDo />} />
                <Route
                  path="/crm"
                  element={
                    <ProtectedRoute requireAdmin={true}>
                      <CRM />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
