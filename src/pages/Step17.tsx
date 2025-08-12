import { Stack, Typography, FormControl, keyframes } from '@mui/material';
import { PageLayout } from '../layouts';
import { styled } from '@mui/material/styles';
import { useMain } from '../Context';
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

// Pure fade-in animation
const fadeIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

export default function Step17() {
  const { goToStep } = useMain();

  const onClick = (val: string) => {
    goToStep(18)
  }

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
            What is the approximate lifetime value of a customer/client?
          </Typography>
          <Typography component="p" fontSize={18} lineHeight={1.5} fontWeight={700} align='center' color="primary" mt={4}>
            Knowing how much your customers are worth to you will help us determine the right budget to get you the ROI you're looking for.
          </Typography>
        </TextWrap>
        <FormWrap>
          <FormControl fullWidth>
            <Typography variant="h2" fontSize={32} align='center' fontWeight={700} lineHeight={1.5} color="info" mb={3.5}>
              Total Historical Revenue
            </Typography>
            <BootstrapInput placeholder='#' />
          </FormControl>
          <FormControl fullWidth>
            <Typography variant="h2" fontSize={32} align='center' fontWeight={700} lineHeight={1.5} color="info" mb={3.5}>
              Total # of Customers
            </Typography>
            <BootstrapInput placeholder='$' />
          </FormControl>
        </FormWrap>
        <Stack mt={5} mb={12}>
          <StyledButton onClick={() => onClick('11')}>Next</StyledButton>
        </Stack>
      </Stack>
    </PageLayout>
  );
}
