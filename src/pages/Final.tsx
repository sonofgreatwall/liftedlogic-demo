import { Stack, Typography, keyframes } from '@mui/material';
import { PageLayout } from '../layouts';
import { styled } from '@mui/material/styles';

const TextWrap = styled(Stack)({
  alignItems: 'center',
});

// Pure fade-in animation
const fadeIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

export default function Final() {
  return (
    <PageLayout>
      <Stack
        direction={'column'}
        alignItems={'start'}
        pt={12}
        mx={'auto'}
        sx={{ maxWidth: 966, animation: `${fadeIn} 1s ease-out` }}
      >
        <TextWrap>
          <Typography variant="h2" fontSize={32} align='center' fontWeight={700} lineHeight={'48px'} color="info">
            Thanks for contacting us!
          </Typography>
          <Typography component="p" fontSize={16} fontWeight={700} align='center' mt={4} color="secondary">
            Our robots are working hard to calculate the cost of your project. Once they're done, you'll get an email to your inbox with more information. In the meantime, feel free to check out Frequently Asked Questions to see if there's anything else we can answer for you.
          </Typography>
        </TextWrap>
      </Stack>
    </PageLayout>
  );
}
