import { useState } from 'react';
import { Stack, Typography, Link, FormControl, keyframes } from '@mui/material';
import { PageLayout } from '../layouts';
import { styled } from '@mui/material/styles';
import { useMain } from '../Context';
import { StyledButton, BootstrapInput } from '../components';

const TextWrap = styled(Stack)({
  alignItems: 'start',
  maxWidth: 700
});

const StyledLabel = styled(Typography)(({ theme }) => ({
  color: theme.palette.info.main,
  fontSize: 16,
  fontWeight: 700,
  marginBottom: 8
}));

const ErrorMessage = styled(Typography)({
  color: '#d32f2f',
  fontSize: 14,
  marginTop: 4,
  marginLeft: 4
});

// Pure fade-in animation
const fadeIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

function generateToken() {
  const array = new Uint8Array(16); // 16 bytes = 32 hex chars
  window.crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

export default function SaveProgress() {
  const { setPage, data, updateData, step, prevSteps } = useMain();
  const [formData, setFormData] = useState({
    email: '',
  });
  const [errors, setErrors] = useState({
    email: '',
  });

  const queryParams = new URLSearchParams(window.location.search);
  const gfToken = queryParams.get('gf_token');
  const [token] = useState(gfToken || generateToken());

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      email: '',
    };
    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== '');
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // Form is valid, proceed with submission
      updateData({ saveEmail: formData.email })
      fetch('http://localhost:5000/save_progress', {
        method: 'POST', // HTTP method
        headers: {
          'Content-Type': 'application/json' // tell server we're sending JSON
        },
        body: JSON.stringify({
          ...data,
          saveEmail: formData.email,
          token: token,
          prevSteps: [...prevSteps, step]
        })
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          setPage(4)
          console.log('Server response:', data);
        })
        .catch(error => {
          console.error('Fetch error:', error);
        });
    }
  };

  return (
    <PageLayout>
      <Stack
        direction={'column'}
        alignItems={'start'}
        pt={12}
        mx={'auto'}
        sx={{ maxWidth: 966, animation: `${fadeIn} 1s ease-out` }}
      >
        <TextWrap>
          <Typography variant="h2" fontSize={{ sm: 40, xs: 32 }} fontWeight={700} lineHeight={'48px'} color="info">
            Link to continue editing later
          </Typography>
          <Typography component="p" fontSize={16} lineHeight={1.5} color="primary" mt={2.5}>
            Please use the following link to return and complete this form from any computer.
          </Typography>
          <Link href="#" mt={2.5} fontWeight={600} color='info'>http://localhost:3000/?gf_token={token}</Link>
          <Typography component="p" fontSize={16} lineHeight={1.5} color="primary" my={2.5}>
            Note: This link will expire after 30 days.<br />
            Enter your email address if you would like to receive the link via email.
          </Typography>
          <FormControl fullWidth>
            <StyledLabel>
              Email Address*
            </StyledLabel>
            <BootstrapInput
              placeholder='Enter your email address'
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              error={!!errors.email}
            />
            {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
          </FormControl>
          <Stack mt={5} mb={12} width={'100%'} alignItems={'start'}>
            <StyledButton onClick={handleSubmit}>Send Link</StyledButton>
          </Stack>
        </TextWrap>
      </Stack>
    </PageLayout>
  );
}
