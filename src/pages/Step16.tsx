import { Stack, Box, Typography, Button, keyframes } from '@mui/material';
import { PageLayout } from '../layouts';
import { styled } from '@mui/material/styles';
import { useMain } from '../Context';

const TextWrap = styled(Stack)({
  alignItems: 'center',
  maxWidth: 750
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
  lineHeight: 1.4,
  fontWeight: 700,
  width: '100%',
  marginBottom: 16
}));

// Pure fade-in animation
const fadeIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

export default function Step16() {
  const { setStep } = useMain();

  const onClick = (val: string) => {
    setStep(17)
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
            How satisfied are you with your current marketing efforts?
          </Typography>
        </TextWrap>
        <FormWrap>
          <DataButton onClick={() => onClick('1')}>
            <Box component='img' src='./icons/Yes-svg.webp' mr={1.5} />
            Total despise
          </DataButton>
          <DataButton onClick={() => onClick('2')}>
            <Box component='img' src='./icons/checkmark-pink.webp' mr={1.5} />
            Occasionally loathe
          </DataButton>
          <DataButton onClick={() => onClick('2')}>
            <Box component='img' src='./icons/checkmark-yellow.webp' mr={1.5} />
            Eh
          </DataButton>
          <DataButton onClick={() => onClick('3')}>
            <Box component='img' src='./icons/checkmark-green.webp' mr={1.5} />
            Pretty Okay
          </DataButton>
          <DataButton onClick={() => onClick('3')}>
            <Box component='img' src='./icons/checkmark-blue.webp' mr={1.5} />
            Satisified AF
          </DataButton>
          <DataButton onClick={() => onClick('3')}>
            <Box component='img' src='./icons/not-sure-purple.webp' mr={1.5} />
            I have no cule
          </DataButton>
        </FormWrap>
      </Stack>
    </PageLayout>
  );
}
