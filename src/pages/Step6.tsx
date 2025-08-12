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

export default function Step6() {
  const { goToStep } = useMain();

  const onClick = (val: string) => {
    goToStep(7)
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
            What is a typical transaction?
          </Typography>
          <Typography component="p" fontSize={18} lineHeight={1.5} fontWeight={700} align='center' color="primary" mt={4}>
            What is the reason for most of the transactions on your site?
          </Typography>
        </TextWrap>
        <FormWrap>
          <DataButton onClick={() => onClick('1')}>
            <Box component='img' src='./icons/product-indigo.webp' mr={1.5} />
            Products
          </DataButton>
          <DataButton onClick={() => onClick('2')}>
            <Box component='img' src='./icons/invoice-pink.webp' mr={1.5} />
            Invoices
          </DataButton>
          <DataButton onClick={() => onClick('3')}>
            <Box component='img' src='./icons/ticket-yellow.webp' mr={1.5} />
            Tickets / RSVPs
          </DataButton>
          <DataButton onClick={() => onClick('3')}>
            <Box component='img' src='./icons/donation-green.webp' mr={1.5} />
            Donations
          </DataButton>
          <DataButton onClick={() => onClick('3')}>
            <Box component='img' src='./icons/not-sure-blue.webp' mr={1.5} />
            Not Sure
          </DataButton>
        </FormWrap>
      </Stack>
    </PageLayout>
  );
}
