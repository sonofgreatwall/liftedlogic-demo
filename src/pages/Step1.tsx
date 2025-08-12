import { Stack, Box, Typography } from '@mui/material';
import { PageLayout } from '../layouts';
import { styled } from '@mui/material/styles';
import { StyledButton } from '../components';
import { useMain } from '../Context';

const TextWrap = styled(Stack)({
  width: 460,
  marginTop: 12
});

const ImageWrap = styled(Stack)({
  width: 356,
  height: 356,
  overflow: 'hidden',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 200
});

export default function Step1() {
  const { setStep } = useMain();

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
            <StyledButton onClick={() => setStep(2)} sx={{ width: 153 }}>Let's Go</StyledButton>
          </Box>
        </TextWrap>
        <ImageWrap>
          <Box
            component={'img'}
            src="./LL-5237-site-photos.jpg"
            sx={{ width: '100%' }}
          />
        </ImageWrap>
      </Stack>
    </PageLayout>
  );
}
