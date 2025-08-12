import { Stack, Box, Typography, Button, keyframes } from '@mui/material';
import { PageLayout } from '../layouts';
import { styled } from '@mui/material/styles';
import { useMain } from '../Context';

const TextWrap = styled(Stack)({
  alignItems: 'center',
  maxWidth: 700
});

const FormWrap = styled(Stack)(({ theme }) => ({
  marginTop: 80,
  width: '100%',
  flexDirection: 'row',
  gap: 32,
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  '& > *': {
    flex: '0 0 calc(33.333% - 21.33px)', // 3 per row, gap compensation (32 * 2 /3)
    maxWidth: 'calc(33.333% - 21.33px)',
  },
  [theme.breakpoints.down('md')]: {
    '& > *': {
      flex: '0 0 calc(50% - 16px)', // 2 per row on smaller screen
      maxWidth: 318,
    },
  },
  [theme.breakpoints.down('sm')]: {
    '& > *': {
      flex: '0 0 calc(100%)', // 2 per row on smaller screen
      maxWidth: 560,
    },
  },
}));

const DataButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  padding: 16,
  boxShadow: '0 18px 46px rgba(0, 0, 0, .06)',
  textTransform: 'none',
  color: theme.palette.secondary.main,
  fontSize: 20,
  fontWeight: 700,
  width: '100%',
  marginBottom: 16
}));

// Pure fade-in animation
const fadeIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

export default function Step2() {
  const { goToStep } = useMain();

  const onClick = (val: number) => {
    goToStep(val)
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
            What do you need?
          </Typography>
        </TextWrap>
        <FormWrap>
          <DataButton onClick={() => onClick(3)}>
            <Box component='img' src='./icons/Website-indigo-icon2.webp' mr={1.5} />
            New Website
          </DataButton>
          <DataButton onClick={() => onClick(13)}>
            <Box component='img' src='./icons/Marketing-pink-icon.webp' mr={1.5} />
            Ongoing Marketing
          </DataButton>
          <DataButton onClick={() => onClick(3)}>
            <Box component='img' src='./icons/Both-yellow-icon.webp' mr={1.5} />
            Both
          </DataButton>
        </FormWrap>
      </Stack>
    </PageLayout>
  );
}
