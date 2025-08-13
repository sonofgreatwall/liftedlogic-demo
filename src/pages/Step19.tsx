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

  // Phone number validation function
  const isValidPhoneNumber = (phone: string): boolean => {
    // Remove all non-digit characters for validation
    const digitsOnly = phone.replace(/\D/g, '');
    
    // Check if it's a valid length (7-15 digits is standard)
    if (digitsOnly.length < 7 || digitsOnly.length > 15) {
      return false;
    }
    
    // Check if it starts with a valid country code or area code
    // US numbers typically start with 1, other countries have various codes
    if (digitsOnly.length === 11 && digitsOnly[0] === '1') {
      return true; // US number with country code
    }
    
    if (digitsOnly.length === 10) {
      return true; // US number without country code
    }
    
    // Allow international numbers (7-15 digits)
    if (digitsOnly.length >= 7 && digitsOnly.length <= 15) {
      return true;
    }
    
    return false;
  };

  // Function to format phone number as user types with dashes
  const formatPhoneNumber = (value: string): string => {
    // Only allow digits, +, -, (, ), and spaces
    let cleaned = value.replace(/[^\d\s\+\-\(\)]/g, '');
    
    // Remove all non-digit characters for length checking
    const digitsOnly = cleaned.replace(/\D/g, '');
    
    // Limit to maximum 15 digits (international standard)
    if (digitsOnly.length > 15) {
      return value;
    }
    
    // Format with dashes for US numbers (10 digits)
    if (digitsOnly.length <= 10) {
      if (digitsOnly.length <= 3) {
        return digitsOnly;
      } else if (digitsOnly.length <= 6) {
        return `${digitsOnly.slice(0, 3)}-${digitsOnly.slice(3)}`;
      } else {
        return `${digitsOnly.slice(0, 3)}-${digitsOnly.slice(3, 6)}-${digitsOnly.slice(6)}`;
      }
    }
    
    // For longer numbers (international), add dashes every 3-4 digits
    if (digitsOnly.length <= 12) {
      if (digitsOnly.length <= 4) {
        return digitsOnly;
      } else if (digitsOnly.length <= 8) {
        return `${digitsOnly.slice(0, 4)}-${digitsOnly.slice(4)}`;
      } else {
        return `${digitsOnly.slice(0, 4)}-${digitsOnly.slice(4, 8)}-${digitsOnly.slice(8)}`;
      }
    } else {
      // For very long numbers (13-15 digits)
      if (digitsOnly.length <= 15) {
        if (digitsOnly.length <= 5) {
          return digitsOnly;
        } else if (digitsOnly.length <= 10) {
          return `${digitsOnly.slice(0, 5)}-${digitsOnly.slice(5)}`;
        } else {
          return `${digitsOnly.slice(0, 5)}-${digitsOnly.slice(5, 10)}-${digitsOnly.slice(10)}`;
        }
      }
    }
    
    return cleaned;
  };

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
    } else if (!isValidPhoneNumber(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number (7-15 digits)';
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== '');
  };

  const handleInputChange = (field: string, value: string) => {
    let processedValue = value;
    
    // Special handling for phone field
    if (field === 'phone') {
      processedValue = formatPhoneNumber(value);
    }
    
    setFormData(prev => ({
      ...prev,
      [field]: processedValue
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
              inputProps={{
                maxLength: 20 // Allow for formatting characters
              }}
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
