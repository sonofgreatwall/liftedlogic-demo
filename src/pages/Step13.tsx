import { useState } from 'react';
import { Stack, Typography, Button, keyframes } from '@mui/material';
import { PageLayout } from '../layouts';
import { styled } from '@mui/material/styles';
import { useMain } from '../Context';
import { StyledButton } from '../components'

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

const DataButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'selected',
})<{ selected?: boolean }>(({ theme, selected }) => ({
  backgroundColor: selected ? theme.palette.success.main : theme.palette.common.white,
  color: selected ? theme.palette.common.white : theme.palette.secondary.main,
  padding: 16,
  height: 60,
  boxShadow: selected ? '0 6px 20px rgba(25, 118, 210, 0.4)' : '0 18px 46px rgba(0, 0, 0, 0.06)',
  textTransform: 'none',
  fontSize: 20,
  fontWeight: 700,
  width: '100%',
  marginBottom: 16,
}));

// Pure fade-in animation
const fadeIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

const buttonLists = [
  "Website", "PPC & Digital Advertising", "Social Media", "Print Materials", "Radio", "TV", "SEO Blogging", "Email", "Text", "Rewards Program", "Other", "None"
]

export default function Step13() {
  const { setStep } = useMain();
  const [selected, setSelected] = useState<number[]>([]);

  const selectData = (val: number) => {
    setSelected(prev => {
      if (prev.includes(val)) {
        // Remove val
        return prev.filter(i => i !== val);
      } else {
        // Add val
        return [...prev, val];
      }
    });
  }

  const gotoNext = () => {
    setStep(14)
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
            What tools are you currently using as part of your marketing strategy?
          </Typography>
          <Typography component="p" fontSize={18} lineHeight={1.5} fontWeight={700} align='center' color="primary" mt={4}>
            Check all that apply.
          </Typography>
        </TextWrap>
        <FormWrap>
          {buttonLists.map((text, index) => (
            <DataButton
              key={index}
              onClick={() => selectData(index)}
              selected={selected.includes(index)}
            >
              {text}
            </DataButton>
          ))}
        </FormWrap>
        <Stack mt={5} mb={12}>
          <StyledButton onClick={() => gotoNext()}>Next</StyledButton>
        </Stack>
      </Stack>
    </PageLayout>
  );
}
