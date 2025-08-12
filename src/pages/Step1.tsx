import { Stack, Box, Typography } from '@mui/material';
import { PageLayout } from '../layouts';
import { styled, keyframes } from '@mui/material/styles';
import { StyledButton } from '../components';
import { useMain } from '../Context';

const TextWrap = styled(Stack)({
  width: 460,
  marginTop: 12
});

const ImageWrap = styled(Stack)({
  width: 356,
  height: 356,
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative'
});

// Define fade-in + slight slide-up animation
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const IconImage = styled('img')({
  backgroundColor: 'white',
  borderRadius: 12,
  position: 'absolute',
  opacity: 0,
  animationFillMode: 'forwards',
  animationTimingFunction: 'ease',
  animationDuration: '0.6s',
  animationName: fadeInUp,
});

export default function Step1() {
  const { goToStep } = useMain();

  return (
    <PageLayout>
      <Stack
        direction={'row'}
        justifyContent={'space-between'}
        pt={12}
        mx={'auto'}
        sx={{ maxWidth: 966 }}
      >
        <TextWrap>
          <Typography variant="h2" fontSize={62} fontWeight={700} lineHeight={'72px'} mb={4} color="primary">
            Cost Calculator
          </Typography>
          <Typography component="p" fontSize={16} fontWeight={700} color="primary" mb={2.5}>
            Whether you’ve been exploring our site and want to learn more, or you just want to get right down to it, you’ve come to the right place.
          </Typography>
          <Typography component="p" fontSize={16} color="secondary">
            You can use this cost calculator to find out how much it will cost to get your project done.
          </Typography>
          <Box mt={5}>
            <StyledButton onClick={() => goToStep(2)} sx={{ width: 153 }}>Let's Go</StyledButton>
          </Box>
        </TextWrap>
        <ImageWrap>
          <Box
            component={'img'}
            src="./LL-5237-site-photos.jpg"
            sx={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 200 }}
          />
          <IconImage
            src="./homes/1.png"
            sx={{ width: 52, top: 20, left: '5%' }}
          />
          <IconImage
            src="./homes/2.png"
            sx={{ width: 71, bottom: -10, left: '20%', animationDelay: '0.1s' }}
          />
          <IconImage
            src="./homes/3.png"
            sx={{ width: 91, top: '60%', right: -10, animationDelay: '0.2s' }}
          />
        </ImageWrap>
      </Stack>
    </PageLayout>
  );
}
