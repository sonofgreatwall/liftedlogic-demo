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
  fontWeight: 700,
  width: '100%',
  marginBottom: 16
}));

// Pure fade-in animation
const fadeIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

export default function Step12() {
  const { goToStep } = useMain();

  const onClick = (val: string) => {
    goToStep(19)
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
            After your website is built, do you plan on running any marketing to it?
          </Typography>
        </TextWrap>
        <FormWrap>
          <DataButton onClick={() => onClick('1')}>
            <Box component='img' src='./icons/Yes-svg.webp' mr={1.5} />
            Yes - Ongoing SEO
          </DataButton>
          <DataButton onClick={() => onClick('1')}>
            <Box component='img' src='./icons/Yes-svg.webp' mr={1.5} />
            Yes - PPC
          </DataButton>
          <DataButton onClick={() => onClick('2')}>
            <Box component='img' src='./icons/No-svg.webp' mr={1.5} />
            No - I Won't Have Time
          </DataButton>
          <DataButton onClick={() => onClick('2')}>
            <Box component='img' src='./icons/No-svg.webp' mr={1.5} />
            No - Not Needed
          </DataButton>
          <DataButton onClick={() => onClick('3')}>
            <Box component='img' src='./icons/Not-sure-svg.webp' mr={1.5} />
            Not Sure
          </DataButton>
        </FormWrap>
      </Stack>
    </PageLayout>
  );
}
