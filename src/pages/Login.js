import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Tabs,
  Tab,
  Alert,
  Divider,
  InputAdornment,
  IconButton,
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login, register, googleLogin, phoneLogin, verifyPhoneCode } = useAuth();
  const [tabValue, setTabValue] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [phoneVerificationSent, setPhoneVerificationSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');

  // Login form state
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  // Register form state
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
  });

  // Phone login state
  const [phoneData, setPhoneData] = useState({
    phone: '',
    name: '',
  });

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setError('');
    setPhoneVerificationSent(false);
    setVerificationCode('');
  };

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleRegisterChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handlePhoneChange = (e) => {
    setPhoneData({ ...phoneData, [e.target.name]: e.target.value });
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(loginData.email, loginData.password);
    setLoading(false);

    if (result.success) {
      navigate('/');
    } else {
      setError(result.message);
    }
  };

  const handleEmailRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (registerData.password !== registerData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (registerData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    const result = await register(
      registerData.email,
      registerData.password,
      registerData.name,
      registerData.phone
    );
    setLoading(false);

    if (result.success) {
      navigate('/');
    } else {
      setError(result.message);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);

    const result = await googleLogin();
    setLoading(false);

    if (result.success) {
      navigate('/');
    } else {
      setError(result.message);
    }
  };

  const handlePhoneLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!phoneData.phone) {
      setError('Phone number is required');
      setLoading(false);
      return;
    }

    // Format phone number (add + if not present)
    let phoneNumber = phoneData.phone.trim();
    if (!phoneNumber.startsWith('+')) {
      // Assume Indian number if no country code
      if (phoneNumber.startsWith('0')) {
        phoneNumber = '+91' + phoneNumber.substring(1);
      } else if (phoneNumber.length === 10) {
        phoneNumber = '+91' + phoneNumber;
      } else {
        phoneNumber = '+' + phoneNumber;
      }
    }

    const result = await phoneLogin(phoneNumber, phoneData.name);
    setLoading(false);

    if (result.success) {
      if (result.requiresVerification) {
        setPhoneVerificationSent(true);
      } else {
        navigate('/');
      }
    } else {
      setError(result.message);
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await verifyPhoneCode(verificationCode);
    setLoading(false);

    if (result.success) {
      navigate('/');
    } else {
      setError(result.message);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      {/* reCAPTCHA container for phone auth */}
      <div id="recaptcha-container"></div>

      <Paper elevation={6} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ mb: 3, fontWeight: 700 }}>
          Welcome to Viraj Locks
        </Typography>

        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs value={tabValue} onChange={handleTabChange} centered>
            <Tab label="Login" />
            <Tab label="Sign Up" />
            <Tab label="Phone Login" />
          </Tabs>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
            {error}
          </Alert>
        )}

        {/* Email Login Tab */}
        {tabValue === 0 && (
          <Box component="form" onSubmit={handleEmailLogin}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={loginData.email}
              onChange={handleLoginChange}
              margin="normal"
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={loginData.password}
              onChange={handleLoginChange}
              margin="normal"
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{ mt: 3, mb: 2, py: 1.5 }}
              disabled={loading}
            >
              Login
            </Button>
            <Divider sx={{ my: 2 }}>OR</Divider>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<GoogleIcon />}
              onClick={handleGoogleLogin}
              sx={{ mb: 2 }}
              disabled={loading}
            >
              Continue with Google
            </Button>
          </Box>
        )}

        {/* Email Register Tab */}
        {tabValue === 1 && (
          <Box component="form" onSubmit={handleEmailRegister}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={registerData.name}
              onChange={handleRegisterChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={registerData.email}
              onChange={handleRegisterChange}
              margin="normal"
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              label="Phone (Optional)"
              name="phone"
              value={registerData.phone}
              onChange={handleRegisterChange}
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={registerData.password}
              onChange={handleRegisterChange}
              margin="normal"
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              label="Confirm Password"
              name="confirmPassword"
              type={showPassword ? 'text' : 'password'}
              value={registerData.confirmPassword}
              onChange={handleRegisterChange}
              margin="normal"
              required
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{ mt: 3, mb: 2, py: 1.5 }}
              disabled={loading}
            >
              Sign Up
            </Button>
            <Divider sx={{ my: 2 }}>OR</Divider>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<GoogleIcon />}
              onClick={handleGoogleLogin}
              sx={{ mb: 2 }}
              disabled={loading}
            >
              Continue with Google
            </Button>
          </Box>
        )}

        {/* Phone Login Tab */}
        {tabValue === 2 && (
          <Box>
            {!phoneVerificationSent ? (
              <Box component="form" onSubmit={handlePhoneLogin}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phone"
                  value={phoneData.phone}
                  onChange={handlePhoneChange}
                  margin="normal"
                  required
                  placeholder="+91 1234567890 or 1234567890"
                  helperText="Include country code (e.g., +91 for India)"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  fullWidth
                  label="Name (Optional)"
                  name="name"
                  value={phoneData.name}
                  onChange={handlePhoneChange}
                  margin="normal"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  sx={{ mt: 3, mb: 2, py: 1.5 }}
                  disabled={loading}
                >
                  Send Verification Code
                </Button>
              </Box>
            ) : (
              <Box component="form" onSubmit={handleVerifyCode}>
                <Alert severity="info" sx={{ mb: 2 }}>
                  Verification code sent to {phoneData.phone}. Please enter the code below.
                </Alert>
                <TextField
                  fullWidth
                  label="Verification Code"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  margin="normal"
                  required
                  inputProps={{ maxLength: 6 }}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  sx={{ mt: 3, mb: 2, py: 1.5 }}
                  disabled={loading}
                >
                  Verify Code
                </Button>
                <Button
                  fullWidth
                  variant="text"
                  onClick={() => {
                    setPhoneVerificationSent(false);
                    setVerificationCode('');
                  }}
                >
                  Change Phone Number
                </Button>
              </Box>
            )}
            <Typography variant="body2" align="center" color="text.secondary" sx={{ mt: 2 }}>
              Note: Phone login creates a new account if the number doesn't exist
            </Typography>
          </Box>
        )}

        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            <a href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              Continue as Guest
            </a>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
