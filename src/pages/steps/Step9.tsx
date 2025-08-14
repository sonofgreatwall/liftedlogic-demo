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

export default function Step9() {
  const { goToStep, updateData, data } = useMain();
  const [selected, setSelected] = useState<number>(data.step9);

  const onClick = (val: number) => {
    if(val === selected) return
    setSelected(val)
    updateData({ step9: val })
    goToStep(10)
  }

  return (
    <>
      <TextWrap>
        <Typography component="p" fontSize={16} fontWeight={700} color="secondary">
          "*" indicates required fields
        </Typography>
        <Typography variant="h2" fontSize={{ sm: 40, xs: 32 }} align='center' fontWeight={700} lineHeight={'48px'} color="info">
          How important is Search Engine Optimization (SEO)?
        </Typography>
        <Typography component="p" fontSize={18} lineHeight={1.5} fontWeight={700} align='center' color="primary" mt={4}>
          Building a site with a heavy focus on each engine optimization is best executed the earlier it is planned. SEO should never compromise a user’s experience.
        </Typography>
      </TextWrap>
      <FormWrap>
        <DataButton selected={selected === 1} onClick={() => onClick(1)}>
          <Box component='img' src='./icons/Yes-svg.webp' mr={1.5} />
          Very Important
        </DataButton>
        <DataButton selected={selected === 2} onClick={() => onClick(2)}>
          <Box component='img' src='./icons/No-svg.webp' mr={1.5} />
          Not Important
        </DataButton>
        <DataButton selected={selected === 3} onClick={() => onClick(3)}>
          <Box component='img' src='./icons/Not-sure-svg.webp' mr={1.5} />
          Not Sure
        </DataButton>
      </FormWrap>
    </>
  );
}
