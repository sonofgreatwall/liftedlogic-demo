import { Step1, Step2, Step3, Step4, Step5, Step6 } from "./pages"
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
    </>
  );
}
