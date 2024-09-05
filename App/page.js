import React from 'react';
import getStripe from '@/utils/get-stripe'; 
import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Toolbar,
  Typography,
  IconButton,
  Link,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import Head from 'next/head';
import CheckIcon from '@mui/icons-material/Check';
import StarIcon from '@mui/icons-material/Star';

export default function Home() {
  return (
    <Box sx={{ width: '100%', minHeight: '100vh', bgcolor: '#ffffff' }}>
      {/* Head Section */}
      <Head>
        <title>Flashcard SaaS</title>
        <meta name="description" content="Create Flashcards From Your Text!" />
      </Head>

      {/* App Bar Section */}
      <AppBar position="fixed" color="default" elevation={1} sx={{ borderBottom: '1px solid #e0e0e0' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" component="div">
            Carrdie
          </Typography>
          <Box>
            <SignedOut>
              <Button color="primary" variant="outlined" sx={{ mx: 1 }}>
                Log In
              </Button>
              <Button color="primary" variant="contained" sx={{ mx: 1 }}>
                Sign Up
              </Button>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box
        sx={{
          width: '100%',
          height: '100vh',
          background: "url('./heroimage.jpg') no-repeat center center/cover",
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          color: '#fff',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Box sx={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: '3rem', borderRadius: '8px' }}>
          <Typography variant="h2" component="h1" sx={{ fontWeight: 'bold', mb: 3 }}>
            Revolutionize Your Learning with AI!
          </Typography>
          <Typography variant="h5" sx={{ mb: 4 }}>
            Unlock the power of AI to create personalized flashcards.
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            href="/relatee"
            sx={{ padding: '1rem 4rem', fontSize: '1.2rem', borderRadius: '50px' }}
          >
            Get Started
          </Button>
        </Box>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: 12, px: 2, backgroundColor: '#f5f7fa' }}>
        <Container maxWidth="lg">
          <Typography variant="h4" component="h2" align="center" sx={{ fontWeight: 'bold', mb: 8 }}>
            Core Features
          </Typography>
          <Grid container spacing={4}>
            {[
              {
                title: 'AI-Powered Text Analysis',
                description: 'Automatically generate flashcards from any text using cutting-edge AI.',
                image: 'https://miro.medium.com/v2/resize:fit:828/format:webp/1*IgmUgJ247jUZqarNYReLFA.gif',
              },
              {
                title: 'Full Customization',
                description: 'Personalize your flashcards with themes, images, and notes.',
                image: 'https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F78545e2b-460c-4faa-bc69-259499a914a4_1024x1024.png',
              },
              {
                title: 'Cloud Sync',
                description: 'Access and edit your flashcards from any device, anywhere.',
                image: 'https://i.pinimg.com/originals/1c/a7/49/1ca74946ed770bb635e4de4711bd861f.gif',
              },
            ].map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card
                  sx={{
                    borderRadius: '16px',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                    transition: 'transform 0.3s ease',
                    '&:hover': { transform: 'translateY(-8px)' },
                  }}
                >
                  <CardMedia component="img" height="200" image={feature.image} alt={feature.title} />
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* How It Works Section */}
      <Box sx={{ py: 12, backgroundColor: '#ffffff' }}>
        <Container maxWidth="lg">
          <Typography variant="h4" component="h2" align="center" sx={{ fontWeight: 'bold', mb: 8 }}>
            How It Works
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {[
              { step: '1. Upload Your Text', description: 'Paste or upload any text document to get started.' },
              { step: '2. Generate Flashcards', description: 'Our AI generates accurate flashcards instantly.' },
              { step: '3. Start Learning', description: 'Use your flashcards to study and master your subjects.' },
            ].map((item, index) => (
              <Grid item xs={12} md={3} key={index}>
                <Typography variant="h6" gutterBottom>
                  {item.step}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Box sx={{ py: 12, px: 2, backgroundColor: '#f5f7fa' }}>
        <Container maxWidth="lg">
          <Typography variant="h4" component="h2" align="center" sx={{ fontWeight: 'bold', mb: 8 }}>
            What Our Users Say
          </Typography>
          <Grid container spacing={4}>
            {[
              {
                quote: 'Flashcard SaaS has completely transformed my study routine. The AI-generated flashcards are spot on and save me hours!',
                author: 'Jane Doe, Student',
                avatar: '/avatars/jane-doe.jpg',
              },
              {
                quote: 'As an educator, this tool has been invaluable in helping my students learn more effectively. Highly recommended!',
                author: 'John Smith, Educator',
                avatar: '/avatars/john-smith.jpg',
              },
            ].map((testimonial, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card sx={{ borderRadius: '16px', padding: '1.5rem', backgroundColor: '#ffffff' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <img src={testimonial.avatar} alt={testimonial.author} style={{ borderRadius: '50%', width: '60px', marginRight: '1rem' }} />
                      <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                        "{testimonial.quote}"
                      </Typography>
                    </Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      - {testimonial.author}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Pricing Section */}
      <Box sx={{ py: 12, backgroundColor: '#ffffff' }}>
        <Container maxWidth="lg">
          <Typography variant="h4" component="h2" align="center" sx={{ fontWeight: 'bold', mb: 8 }}>
            Choose Your Plan
          </Typography>
          <Typography variant="body1" align="center" sx={{ mb: 6, color: 'text.secondary' }}>
            Select the plan that best fits your needs.
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {[
              {
                title: 'Basic',
                price: 'Free',
                features: [
                  'Core flashcard features',
                  'Limited storage',
                  'Access to AI-powered text analysis',
                ],
                icon: <CheckIcon />,
              },
              {
                title: 'Pro',
                price: '$5/month',
                features: [
                  'Unlimited storage',
                  'Advanced customization',
                  'Priority customer support',
                  'Cloud sync across all devices',
                ],
                icon: <StarIcon />,
              },
            ].map((plan, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card
                  sx={{
                    borderRadius: '16px',
                    textAlign: 'center',
                    padding: '2rem',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    borderColor: index === 1 ? 'primary.main' : 'transparent',
                    borderWidth: index === 1 ? '2px' : '1px',
                    borderStyle: 'solid',
                    '&:hover': {
                      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                      transform: 'scale(1.05)',
                    },
                  }}
                >
                  <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
                    {plan.title} {plan.icon}
                  </Typography>
                  <Typography variant="h4" sx={{ mb: 3 }}>
                    {plan.price}
                  </Typography>
                  <Box sx={{ mb: 4 }}>
                    {plan.features.map((feature, i) => (
                      <Typography key={i} variant="body2" color="text.secondary">
                        {feature}
                      </Typography>
                    ))}
                  </Box>
                  <Button variant={index === 1 ? 'contained' : 'outlined'} color="primary" sx={{ width: '100%' }}>
                    {index === 1 ? 'Start Free Trial' : 'Sign Up'}
                  </Button>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Footer Section */}
      <Box sx={{ py: 6, backgroundColor: '#0D47A1', color: '#ffffff' }}>
        <Container maxWidth="lg">
          <Typography variant="h6" align="center" sx={{ fontWeight: 'bold', mb: 2 }}>
            Flashcard SaaS
          </Typography>
          <Typography variant="body2" align="center" sx={{ mb: 4 }}>
            Copyright © {new Date().getFullYear()} Flashcard SaaS. All rights reserved.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
            <Link href="#" color="inherit">
              Privacy Policy
            </Link>
            <Link href="#" color="inherit">
              Terms of Service
            </Link>
            <Link href="#" color="inherit">
              Contact Us
            </Link>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
