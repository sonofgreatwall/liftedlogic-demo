import {
  Step1,
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
  Step19
} from "./pages"
import { useMain } from './Context';

export default function App() {
  const { step } = useMain();

  return (
    <>
      {step === 1 && <Step1 />}
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
    </>
  );
}
