import { Stack, keyframes } from '@mui/material';
import { PageLayout } from '../../layouts';
import {
  Step2,
  Step3,
  Step4,
  Step5,
  Step6,
  Step7,
  Step8,
  Step9,
  Step10,
  Step11,
  Step12,
  Step13,
  Step14,
  Step15,
  Step16,
  Step17,
  Step18,
  Step19,
} from "../"
import { useMain } from '../../Context';

// Pure fade-in animation
const fadeIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

export default function StepLayout() {
  const { step } = useMain();

  return (
    <PageLayout>
      <Stack
        direction={'column'}
        alignItems={'center'}
        pt={12}
        mx={'auto'}
        sx={{ maxWidth: 966, animation: `${fadeIn} 1s ease-out` }}
      >
        {step === 2 && <Step2 />}
        {step === 3 && <Step3 />}
        {step === 4 && <Step4 />}
        {step === 5 && <Step5 />}
        {step === 6 && <Step6 />}
        {step === 7 && <Step7 />}
        {step === 8 && <Step8 />}
        {step === 9 && <Step9 />}
        {step === 10 && <Step10 />}
        {step === 11 && <Step11 />}
        {step === 12 && <Step12 />}
        {step === 13 && <Step13 />}
        {step === 14 && <Step14 />}
        {step === 15 && <Step15 />}
        {step === 16 && <Step16 />}
        {step === 17 && <Step17 />}
        {step === 18 && <Step18 />}
        {step === 19 && <Step19 />}
      </Stack>
    </PageLayout>
  );
}
