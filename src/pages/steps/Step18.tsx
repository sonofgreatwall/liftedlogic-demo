import { useState } from 'react';
import { Stack, Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useMain } from '../../Context';
import { DataButton } from '../../components';

const TextWrap = styled(Stack)({
  alignItems: 'center',
  maxWidth: 750
});

const FormWrap = styled(Stack)(({ theme }) => ({
  marginTop: 80,
  width: '100%',
  flexDirection: 'row',
  gap: 32,
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  '& > *': {
    flex: '0 0 calc(33.333% - 21.33px)', // 3 per row, gap compensation (32 * 2 /3)
    maxWidth: 'calc(33.333% - 21.33px)',
  },
  [theme.breakpoints.down('md')]: {
    '& > *': {
      flex: '0 0 calc(50% - 16px)', // 2 per row on smaller screen
      maxWidth: 318,
    },
  },
  [theme.breakpoints.down('sm')]: {
    '& > *': {
      flex: '0 0 calc(100%)', // 2 per row on smaller screen
      maxWidth: 560,
    },
  },
}));

export default function Step18() {
  const { goToStep, updateData, data } = useMain();
  const [selected, setSelected] = useState<number>(data.step18);

  const onClick = (val: number) => {
    if(val === selected) return
    setSelected(val)
    updateData({ step18: val })
    goToStep(19)
  }

  return (
    <>
      <TextWrap>
        <Typography component="p" fontSize={16} fontWeight={700} color="secondary">
          "*" indicates required fields
        </Typography>
        <Typography variant="h2" fontSize={{ sm: 40, xs: 32 }} align='center' fontWeight={700} lineHeight={'48px'} color="info">
          Do you have any team members solely dedicated to marketing?
        </Typography>
      </TextWrap>
      <FormWrap>
        <DataButton selected={selected === 1} onClick={() => onClick(1)}>
          <Box component='img' src='./icons/Yes-svg.webp' mr={1.5} />
          Yes
        </DataButton>
        <DataButton selected={selected === 2} onClick={() => onClick(2)}>
          <Box component='img' src='./icons/No-svg.webp' mr={1.5} />
          No
        </DataButton>
      </FormWrap>
    </>
  );
}
