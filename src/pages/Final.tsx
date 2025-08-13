import { Stack, Typography, keyframes } from '@mui/material';
import { PageLayout } from '../layouts';
import { styled } from '@mui/material/styles';

const TextWrap = styled(Stack)({
  alignItems: 'start',
  maxWidth: 700
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
          <Typography component="p" fontSize={16} fontWeight={700} color="secondary">
            Thanks for contacting us! We will get in touch with you shortly.
          </Typography>
        </TextWrap>
      </Stack>
    </PageLayout>
  );
}
