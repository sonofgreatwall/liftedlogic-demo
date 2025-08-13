import { useState } from 'react';
import { Stack, Typography, FormControl, keyframes } from '@mui/material';
import { PageLayout } from '../layouts';
import { styled } from '@mui/material/styles';
import { StyledButton, BootstrapInput, ErrorAlert } from '../components'
import { useMain } from '../Context';

const TextWrap = styled(Stack)({
  alignItems: 'center',
  maxWidth: 750
});

const FormWrap = styled(Stack)({
  marginTop: 40,
  width: '100%',
  maxWidth: 640,
  padding: '0 40px',
  flexDirection: 'row',
  gap: 40,
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
});

const StyledLabel = styled(Typography)(({ theme }) => ({
  color: theme.palette.info.main,
  fontSize: 20,
  fontWeight: 700,
  marginBottom: 8
}));

const ErrorMessage = styled(Typography)(({ theme }) => ({
  color: '#d32f2f',
  fontSize: 14,
  marginTop: 4,
  marginLeft: 4
}));

// Pure fade-in animation
const fadeIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

export default function Step19() {
  const { goToStep, data } = useMain();
  const [error, setError] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    website: ''
  });
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });

  const validateForm = () => {
    const newErrors = {
      firstName: '',
      lastName: '',
      email: '',
      phone: ''
    };

    // Validate first name
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    // Validate last name
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Validate phone
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/[\s\-\(\)]/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== '');
  };

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

  const handleSubmit = () => {
    if (validateForm()) {
      setError(false);
      delete data.saveEmail;
      fetch('http://localhost:5000/save_result', {
        method: 'POST', // HTTP method
        headers: {
          'Content-Type': 'application/json' // tell server we're sending JSON
        },
        body: JSON.stringify({
          ...formData,
          data
        })
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          goToStep(100)
          console.log('Server response:', data);
        })
        .catch(error => {
          console.error('Fetch error:', error);
        });
    } else {
      setError(true);
    }
  };

  return (
    <PageLayout>
      <Stack
        direction={'column'}
        alignItems={'center'}
        pt={12}
        mx={'auto'}
        sx={{ maxWidth: 966, animation: `${fadeIn} 1s ease-out` }}
      >
        {error && <ErrorAlert message='There was a problem with your submission. Please review the fields below.' />}
        <TextWrap>
          <Typography component="p" fontSize={16} fontWeight={700} color="secondary">
            "*" indicates required fields
          </Typography>
          <Typography variant="h2" fontSize={{ sm: 40, xs: 32 }} align='center' fontWeight={700} lineHeight={'48px'} color="info">
            Let us know where to send your custom estimate.
          </Typography>
          <Typography component="p" fontSize={18} lineHeight={1.5} fontWeight={700} align='center' color="primary" mt={4}>
            We will never share or sell your information. Scout's honor.
          </Typography>
        </TextWrap>
        <FormWrap>
          <Stack width="100%">
            <StyledLabel>
              Name*
            </StyledLabel>
            <Stack direction={'row'} width="100%" gap={3.75}>
              <FormControl fullWidth>
                <BootstrapInput
                  placeholder='Enter your first name'
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  error={!!errors.firstName}
                />
                {errors.firstName && <ErrorMessage>{errors.firstName}</ErrorMessage>}
              </FormControl>
              <FormControl fullWidth>
                <BootstrapInput
                  placeholder='Enter your last name'
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  error={!!errors.lastName}
                />
                {errors.lastName && <ErrorMessage>{errors.lastName}</ErrorMessage>}
              </FormControl>
            </Stack>
          </Stack>
          <FormControl fullWidth>
            <StyledLabel>
              Email*
            </StyledLabel>
            <BootstrapInput
              placeholder='Enter your email address'
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              error={!!errors.email}
            />
            {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
          </FormControl>
          <FormControl fullWidth>
            <StyledLabel>
              Phone*
            </StyledLabel>
            <BootstrapInput
              placeholder='Enter your phone number'
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              error={!!errors.phone}
            />
            {errors.phone && <ErrorMessage>{errors.phone}</ErrorMessage>}
          </FormControl>
          <FormControl fullWidth>
            <StyledLabel>
              Current Website
            </StyledLabel>
            <BootstrapInput
              placeholder='https://'
              value={formData.website}
              onChange={(e) => handleInputChange('website', e.target.value)}
            />
          </FormControl>
          <Stack mt={5} mb={12} width={'100%'} alignItems={'start'}>
            <StyledButton onClick={handleSubmit}>Submit</StyledButton>
          </Stack>
        </FormWrap>
      </Stack>
    </PageLayout>
  );
}
