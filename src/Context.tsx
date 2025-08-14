import { createContext, useContext, useState } from 'react';
import type { ReactNode } from "react";

// Define the shape of your context data and actions
interface MainContextType {
  data: any;
  step: number;
  page: number;
  goBack: () => void;
  goToStep: (val: number) => void;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setPrevSteps: React.Dispatch<React.SetStateAction<Array<number>>>;
  updateData: (val: any) => void;
  prevSteps: Array<number>;
}

// Create context with default empty values
const MainContext = createContext<MainContextType | undefined>(undefined);

// Provider component props
interface MainProviderProps {
  children: ReactNode;
}

// Provider component to wrap your app or subtree
export const MainProvider = ({ children }: MainProviderProps) => {
  const [step, setStep] = useState<number>(2);
  const [page, setPage] = useState<number>(1);
  const [data, setData] = useState({});
  const [prevSteps, setPrevSteps] = useState<number[]>([]);

  const goToStep = (val: number) => {
    setPrevSteps(prev => [...prev, step]); // push current step to history
    setStep(val);
  };

  const goBack = () => {
    setPrevSteps(prev => {
      if (prev.length === 0) return prev; // no history to go back to

      const lastStep = prev[prev.length - 1]; // get last step
      setStep(lastStep); // move to last step
      return prev.slice(0, -1); // remove it from history
    });
  }

  const updateData = (val: any) => {
    setData({
      ...data,
      ...val
    })
  }

  return (
    <MainContext.Provider value={{ step, page, setPage, goBack, setStep, goToStep, updateData, setPrevSteps, prevSteps, data }}>
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
