import { Box, TextField, IconButton, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

const GlassFooter = styled(Box)({
  position: 'fixed',
  bottom: 0,
  left: 70,
  right: 0,
  zIndex: 1000,
  background: 'rgba(31, 58, 95, 0.85)', // Navy blue - trust & authority
  backdropFilter: 'blur(30px) saturate(150%)',
  borderTop: '1px solid rgba(31, 58, 95, 0.9)',
  boxShadow: '0 -4px 20px rgba(31, 58, 95, 0.5)',
  padding: '16px 24px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '16px',
});

const GlassTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    color: '#fff',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    borderRadius: '24px',
    '& fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    '&:hover fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.5)',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'rgba(79, 163, 165, 0.8)',
    },
  },
  '& .MuiInputLabel-root': {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: 'rgba(79, 163, 165, 0.9)',
  },
});

const SendButton = styled(IconButton)({
  background: 'rgba(255, 209, 102, 0.9)', // Golden yellow - attention without alarm
  backdropFilter: 'blur(10px) saturate(150%)',
  color: '#fff',
  width: '48px',
  height: '48px',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'rgba(255, 209, 102, 0.95)',
    transform: 'scale(1.05)',
  },
});

function Footer() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      // TODO: Add email to subscription list
      console.log('Email submitted:', email);
      setEmail('');
    }
  };

  return (
    <GlassFooter>
      <MailOutlineIcon sx={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '28px' }} />
      <Typography
        sx={{
          color: '#fff',
          fontWeight: 600,
          fontSize: '0.95rem',
          display: { xs: 'none', md: 'block' },
        }}
      >
        Subscribe to our weekly newsletter
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          flex: { xs: 1, md: 'initial' },
          maxWidth: '400px',
        }}
      >
        <GlassTextField
          size="small"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          required
          fullWidth
          sx={{
            minWidth: { xs: 'auto', md: '300px' },
          }}
        />
        <SendButton type="submit" size="small">
          <SendIcon />
        </SendButton>
      </Box>
    </GlassFooter>
  );
}

export default Footer;
