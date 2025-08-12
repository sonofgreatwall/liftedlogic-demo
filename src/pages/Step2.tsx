import { Stack, Box, Typography, Button, keyframes } from '@mui/material';
import { PageLayout } from '../layouts';
import { styled } from '@mui/material/styles';
import { useMain } from '../Context';

const TextWrap = styled(Stack)({
  alignItems: 'center'
});

const FormWrap = styled(Stack)({
  marginTop: 80,
  width: '100%',
  flexDirection: 'row',
  gap: 32
});

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  padding: 16,
  boxShadow: '0 18px 46px rgba(0, 0, 0, .06)',
  textTransform: 'none',
  color: theme.palette.secondary.main,
  fontSize: 20,
  fontWeight: 700,
  width: '100%'
}));

// Pure fade-in animation
const fadeIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

export default function Step2() {
  const { setStep } = useMain();

  const onClick = (val: string) => {
    setStep(3)
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
          <Typography variant="h2" fontSize={40} fontWeight={700} lineHeight={'48px'} color="info">
            What do you need?
          </Typography>
        </TextWrap>
        <FormWrap>
          <StyledButton onClick={() => onClick('1')}>
            <Box component='img' src='./icons/Website-indigo-icon2.webp' mr={1.5} />
            New Website
          </StyledButton>
          <StyledButton onClick={() => onClick('2')}>
            <Box component='img' src='./icons/Marketing-pink-icon.webp' mr={1.5} />
            Ongoing Marketing
          </StyledButton>
          <StyledButton onClick={() => onClick('3')}>
            <Box component='img' src='./icons/Both-yellow-icon.webp' mr={1.5} />
            Both
          </StyledButton>
        </FormWrap>
      </Stack>
    </PageLayout>
  );
}
