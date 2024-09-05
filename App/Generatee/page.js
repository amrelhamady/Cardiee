'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
  Dialog,
  TextField,
  Fade,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  IconButton,
  InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { doc, getDoc, writeBatch, collection } from 'firebase/firestore';
import { db } from '@/firebase'; // Ensure this is the correct path to Firebase configuration

export default function Generate() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [text, setText] = useState('');
  const [name, setName] = useState('');
  const [open, setOpen] = useState(false);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      loadHistory();
    }
  }, [isLoaded, isSignedIn]);

  const loadHistory = async () => {
    const userDocRef = doc(collection(db, 'users'), user.id);
    const docSnap = await getDoc(userDocRef);

    if (docSnap.exists()) {
      const flashcardsData = docSnap.data().flashcards || [];
      setHistory(flashcardsData);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();
      setFlashcards(data.flashcards);
    } catch (err) {
      console.error(err);
      alert('Failed to generate flashcards. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = (id) => {
    setFlipped((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const saveFlashcards = async () => {
    if (!name) {
      alert('Please enter a name');
      return;
    }

    const batch = writeBatch(db);
    const userDocRef = doc(collection(db, 'users'), user.id);
    const docSnap = await getDoc(userDocRef);

    if (docSnap.exists()) {
      const collections = docSnap.data().flashcards || [];
      if (collections.find((f) => f.name === name)) {
        alert('Flashcard collection with the same name already exists');
        return;
      } else {
        collections.push({ name });
        batch.set(userDocRef, { flashcards: collections }, { merge: true });
      }
    } else {
      batch.set(userDocRef, { flashcards: [{ name }] });
    }

    const colRef = collection(userDocRef, name);
    flashcards.forEach((flashcard) => {
      const cardDocRef = doc(colRef);
      batch.set(cardDocRef, flashcard);
    });

    await batch.commit();
    handleClose();
    router.push('/flashcards');
  };

  const loadFlashcards = async (collectionName) => {
    const userDocRef = doc(collection(db, 'users'), user.id);
    const colRef = collection(userDocRef, collectionName);
    const colSnap = await getDoc(colRef);

    if (colSnap.exists()) {
      setFlashcards(colSnap.data().flashcards || []);
    } else {
      alert('No flashcards found for this collection');
    }
  };

  const filteredHistory = history.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 6, display: 'flex', gap: 2 }}>
      {/* Left Sidebar for History */}
      <Box sx={{ width: '25%', pr: 2, overflowY: 'auto', height: '80vh' }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: '#333' }}>
          History of Generations
        </Typography>
        <TextField
          placeholder="Search History"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2 }}
        />
        <List>
          {filteredHistory.map((item) => (
            <ListItem button key={item.name} onClick={() => loadFlashcards(item.name)}>
              <ListItemText primary={item.name} secondary={item.date} />
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Main Content */}
      <Box sx={{ width: '50%', px: 2 }}>
        <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold', color: '#333', textAlign: 'center' }}>
          Generate Flashcards
        </Typography>

        <Box sx={{ width: '100%', backgroundColor: '#fff', borderRadius: 3, p: 4, boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)' }}>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Enter text to generate flashcards"
            value={text}
            onChange={(e) => setText(e.target.value)}
            sx={{ mb: 3, backgroundColor: '#f8f8f8', borderRadius: 2 }}
          />

          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            sx={{
              mb: 4,
              py: 1.5,
              px: 4,
              fontSize: '1rem',
              textTransform: 'none',
              backgroundColor: '#1976d2',
              '&:hover': { backgroundColor: '#115293' },
              borderRadius: 3,
            }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} sx={{ color: '#fff' }} /> : 'Generate'}
          </Button>

          <Grid container spacing={3}>
            {flashcards.map((flashcard, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Fade in timeout={500}>
                  <Card
                    onClick={() => handleCardClick(index)}
                    sx={{
                      cursor: 'pointer',
                      height: '100%',
                      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                      transition: 'transform 0.3s',
                      '&:hover': { transform: 'scale(1.05)', boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)' },
                      borderRadius: 2,
                    }}
                  >
                    <CardContent sx={{ textAlign: 'center', minHeight: '150px' }}>
                      <Typography variant="h6" color="text.secondary">
                        {flipped[index] ? flashcard.back : flashcard.front}
                      </Typography>
                    </CardContent>
                  </Card>
                </Fade>
              </Grid>
            ))}
          </Grid>

          <Button
            variant="outlined"
            color="secondary"
            onClick={handleOpen}
            sx={{
              mt: 4,
              py: 1.5,
              px: 4,
              fontSize: '1rem',
              textTransform: 'none',
              borderColor: '#1976d2',
              '&:hover': { backgroundColor: '#e3f2fd', borderColor: '#1976d2' },
              borderRadius: 3,
            }}
          >
            Save Flashcards
          </Button>
        </Box>
      </Box>

      {/* Right Sidebar for Flashcards */}
      <Box sx={{ width: '25%', pl: 2, overflowY: 'auto', height: '80vh' }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: '#333' }}>
          Flashcards Preview
        </Typography>
        <Grid container spacing={2}>
          {flashcards.length === 0 ? (
            <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', width: '100%' }}>
              No flashcards to display
            </Typography>
          ) : (
            flashcards.map((flashcard, index) => (
              <Grid item xs={12} key={index}>
                <Card
                  sx={{
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                    borderRadius: 2,
                  }}
                >
                  <CardContent sx={{ textAlign: 'center', minHeight: '100px' }}>
                    <Typography variant="h6" color="text.secondary">
                      {flipped[index] ? flashcard.back : flashcard.front}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </Box>

      {/* Dialog for saving flashcards */}
      <Dialog open={open} onClose={handleClose}>
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: '#333' }}>
            Save Flashcards
          </Typography>
          <TextField
            fullWidth
            label="Enter a name for this set"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ mb: 3 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={saveFlashcards}
            sx={{
              py: 1.5,
              px: 4,
              fontSize: '1rem',
              textTransform: 'none',
              backgroundColor: '#1976d2',
              '&:hover': { backgroundColor: '#115293' },
              borderRadius: 3,
            }}
          >
            Save
          </Button>
        </Box>
      </Dialog>
    </Container>
  );
}
