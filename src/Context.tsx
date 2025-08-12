import { createContext, useContext, useState } from 'react';
import type { ReactNode } from "react";

// Define the shape of your context data and actions
interface MainContextType {
  step: number;
  prevStep: number;
  setStep: (val: number) => void;
}

// Create context with default empty values
const MainContext = createContext<MainContextType | undefined>(undefined);

// Provider component props
interface MainProviderProps {
  children: ReactNode;
}

// Provider component to wrap your app or subtree
export const MainProvider = ({ children }: MainProviderProps) => {
  const [step, setStep] = useState<number>(1);
  const [prevStep, setPrevStep] = useState<number>(1);

  const goToStep = (val: number) => {
    setPrevStep(step)
    setStep(val)
  }

  return (
    <MainContext.Provider value={{ step, prevStep, setStep: goToStep }}>
      {children}
    </MainContext.Provider>
  );
};

// Custom hook for consuming the context, for easier usage & type safety
export const useMain = (): MainContextType => {
  const context = useContext(MainContext);
  if (context === undefined) {
    throw new Error('useMain must be used within an MainProvider');
  }
  return context;
};
