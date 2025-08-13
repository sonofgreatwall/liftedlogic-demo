import { useState } from 'react';
import { Stack, Typography, keyframes } from '@mui/material';
import { PageLayout } from '../layouts';
import { styled } from '@mui/material/styles';
import { useMain } from '../Context';
import { StyledButton, DataButton, ErrorAlert } from '../components'

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

// Pure fade-in animation
const fadeIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

const buttonLists = [
  "PPC or Digital Advertising", "Social Media", "SEO Blogging", "Email Marketing", "Video Asset Creation", "Lead Tracking", "Monitoring Analytics", "Monitoring My Online Reputation", "Print Materials", "Other"
]

export default function Step15() {
  const { goToStep, updateData, data } = useMain();
  const [selected, setSelected] = useState<number[]>(data.step15 || []);
  const [error, setError] = useState<boolean>(false);

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
    if (selected.length === 0) {
      setError(true)
    } else {
      updateData({ step15: selected })
      setError(false)
      goToStep(16)
    }
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
        {error && <ErrorAlert message='There was a problem with your submission. Please review the fields below.' />}
        <TextWrap>
          <Typography component="p" fontSize={16} fontWeight={700} color="secondary">
            "*" indicates required fields
          </Typography>
          <Typography variant="h2" fontSize={{ sm: 40, xs: 32 }} align='center' fontWeight={700} lineHeight={'48px'} color="info">
            What efforts would you like Lifted Logic to take over?
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
        {error && <Typography fontSize={14} lineHeight={1.5} color="error" mt={1.5} mb={2}>This field is required.</Typography>}
        <Stack mt={5} mb={12}>
          <StyledButton onClick={() => gotoNext()}>Next</StyledButton>
        </Stack>
      </Stack>
    </PageLayout>
  );
}
