import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { Stack } from '@mui/material';

const ProgressBarWrap = styled(Stack)(({ theme }) => ({
  height: 16,
  borderRadius: 8,
  backgroundColor: theme.palette.background.default,
  boxShadow: 'inset 0 1px 2px rgba(0,0,0,.2)',
  padding: 3
}))

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.background.default,
    ...theme.applyStyles?.('dark', {
      backgroundColor: theme.palette.background.default,
    }),
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 8,
    backgroundColor: theme.palette.success.main,
    transition: 'transform 0.5s linear', // smooth animation
  },
}));

interface ProgressBarProps {
  value: number;
}

export default function ProgressBar({ value }: ProgressBarProps) {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    // smooth transition by animating intermediate values
    let frame: number;
    const animate = () => {
      setDisplayValue(prev => {
        if (Math.abs(prev - value) < 0.5) return value; // close enough
        return prev + (value - prev) * 0.2; // ease towards target
      });
      frame = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(frame);
  }, [value]);

  return (
    <ProgressBarWrap>
      <BorderLinearProgress variant="determinate" value={displayValue} />
    </ProgressBarWrap>
  );
}
