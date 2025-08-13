import { Stack, Typography, keyframes } from '@mui/material';
import { PageLayout } from '../layouts';
import { styled } from '@mui/material/styles';
import { useMain } from '../Context';

const TextWrap = styled(Stack)({
  alignItems: 'start',
  maxWidth: 700
});
// Pure fade-in animation
const fadeIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

export default function SaveSuccess() {
  const { data } = useMain();

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
          <Typography variant="h2" fontSize={{ sm: 40, xs: 32 }} fontWeight={700} lineHeight={'48px'} color="info">
            Success!
          </Typography>
          <Typography component="p" fontSize={16} lineHeight={1.5} color="primary" mt={2.5}>
            The link was sent to the following email address: {data.saveEmail}
          </Typography>
        </TextWrap>
      </Stack>
    </PageLayout>
  );
}
