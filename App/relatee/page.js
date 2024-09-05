'use client'; // This directive ensures the code runs on the client side.

import React from 'react';
import { SignedOut, SignIn, SignUp } from '@clerk/nextjs';
import { Box, Typography, Container, Button } from '@mui/material';

// Inline Styles
const styles = {
  navbar: {
    width: '100%',
    padding: '10px 20px',
    backgroundColor: '#fff',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
    position: 'fixed',
    top: 0,
    zIndex: 1000,
  },
  footer: {
    backgroundColor: '#002366',
    color: '#fff',
    padding: '20px 0',
    textAlign: 'center',
    marginTop: 'auto',
    width: '100%',
  },
  formContainer: {
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
    padding: '30px',
    borderRadius: '10px',
    backgroundColor: '#fff',
    textAlign: 'center',
    marginTop: '120px', // Adjusting for the fixed navbar
  },
  pageContainer: {
    width: '100%',
    minHeight: '100vh',
    background: 'linear-gradient(120deg, #f5f7fa, #e2eafc)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '60px',
  },
  footerLinks: {
    color: '#fff',
    textTransform: 'none',
    marginLeft: '10px',
  },
};

export default function AuthPage() {
  return (
    <Box sx={styles.pageContainer}>
      {/* Navbar */}
      <Box sx={styles.navbar}>
        <Typography variant="h6" sx={{ color: '#2c3e50', fontFamily: 'Poppins, sans-serif' }}>
          Carrdie
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button sx={{ color: '#2c3e50', textTransform: 'none', marginRight: '20px' }}>Home</Button>
          <Button sx={{ color: '#2c3e50', textTransform: 'none' }}>About</Button>
        </Box>
      </Box>

      {/* Sign In/Up Form */}
      <Container maxWidth="sm">
        <SignedOut>
          <Box sx={styles.formContainer}>
            <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" redirectUrl="/dashboard" />
            <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" redirectUrl="/dashboard" />
          </Box>
        </SignedOut>
      </Container>

      {/* Footer */}
      <Box sx={styles.footer}>
        <Typography variant="body2">© 2024 Carrdie. All rights reserved.</Typography>
        <Box sx={{ mt: 1 }}>
          <Button sx={styles.footerLinks}>Privacy Policy</Button>
          <Button sx={styles.footerLinks}>Terms of Service</Button>
        </Box>
      </Box>
    </Box>
  );
}
