import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

const StyledHeaderWrap = styled(AppBar)({
  height: 54,
  backgroundColor: 'white',
  justifyContent: 'center',
  zIndex: 1,
  boxShadow: '0 4px 4px rgba(0,0,0,.103557)'
});

const StyledContentWrap = styled(Container)({
  position: 'relative',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center'
});

export default function Header() {
  return (
    <StyledHeaderWrap position="static">
      <StyledContentWrap>
        <Box
          component={'img'}
          src="./logo.svg"
        />
      </StyledContentWrap>
    </StyledHeaderWrap>
  );
}