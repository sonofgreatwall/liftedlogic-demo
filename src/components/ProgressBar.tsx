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
    ...theme.applyStyles('dark', {
      backgroundColor: theme.palette.background.default,
    }),
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 8,
    backgroundColor: theme.palette.success.main
  },
}));

interface ProgressBarProps {
  value: number;
}

export default function ProgressBar({ value }: ProgressBarProps) {
  return (
    <ProgressBarWrap>
      <BorderLinearProgress variant="determinate" value={value} />
    </ProgressBarWrap>
  );
}
