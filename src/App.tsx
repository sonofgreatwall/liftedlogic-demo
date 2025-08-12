import { Step1, Step2 } from "./pages"
import { useMain } from './Context';

export default function App() {
  const { step } = useMain();

  return (
    <>
      {step === 1 && <Step1 />}
      {step === 2 && <Step2 />}
    </>
  );
}
