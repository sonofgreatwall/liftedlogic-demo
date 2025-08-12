import AppBar from '@mui/material/AppBar';
import { Container, Stack, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import ProgressBar from './ProgressBar';
import { useMain } from '../Context';

const StyledFooterWrap = styled(AppBar)({
  height: 74,
  backgroundColor: 'white',
  justifyContent: 'center',
  boxShadow: '0 -2px 14px rgba(0, 0, 0, .07)',
  top: 'auto',
  bottom: 0
});

const StyledContentWrap = styled(Container)({
  position: 'relative',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  maxWidth: '1014px !important'
});

const SaveButton = styled(Button)(({ theme }) => ({
  padding: 0,
  textTransform: 'none',
  color: theme.palette.text.secondary,
  marginTop: '0px !important',
  lineHeight: '21px'
}))

export default function Footer() {
  const { step } = useMain();

  if (step > 1) {
    return (
    <StyledFooterWrap position="fixed">
      <StyledContentWrap>
        <Stack
          spacing={2}
          sx={{ flexGrow: 1, height: 46 }}
          justifyContent={'space-between'}
        >
          <ProgressBar value={20} />
          <SaveButton disableRipple>Save My Progress</SaveButton>
        </Stack>
      </StyledContentWrap>
    </StyledFooterWrap>
    );
  } else {
    return <></>
  }
}