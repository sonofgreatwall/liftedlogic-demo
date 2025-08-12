import { Stack, Typography, FormControl, keyframes } from '@mui/material';
import { PageLayout } from '../layouts';
import { styled } from '@mui/material/styles';
import { StyledButton, BootstrapInput } from '../components'

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

// Pure fade-in animation
const fadeIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

export default function Step18() {
  return (
    <PageLayout>
      <Stack
        direction={'column'}
        alignItems={'center'}
        pt={12}
        mx={'auto'}
        sx={{ maxWidth: 966, animation: `${fadeIn} 1s ease-out` }}
      >
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
          <FormControl fullWidth>
            <StyledLabel>
              Name*
            </StyledLabel>
            <Stack direction={'row'} gap={3.75}>
              <BootstrapInput placeholder='Enter your first name' />
              <BootstrapInput placeholder='Enter your last name' />
            </Stack>
          </FormControl>
          <FormControl fullWidth>
            <StyledLabel>
              Email*
            </StyledLabel>
            <BootstrapInput placeholder='Enter your email address' />
          </FormControl>
          <FormControl fullWidth>
            <StyledLabel>
              Phone*
            </StyledLabel>
            <BootstrapInput placeholder='Enter your phone number' />
          </FormControl>
          <FormControl fullWidth>
            <StyledLabel>
              Current Website
            </StyledLabel>
            <BootstrapInput placeholder='https://' />
          </FormControl>
          <Stack mt={5} mb={12} width={'100%'} alignItems={'start'}>
            <StyledButton>Submit</StyledButton>
          </Stack>
        </FormWrap>
      </Stack>
    </PageLayout>
  );
}
