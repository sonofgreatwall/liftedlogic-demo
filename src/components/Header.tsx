import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import WestSharpIcon from '@mui/icons-material/WestSharp';
import { useMain } from '../Context';

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
  justifyContent: 'space-between',
  maxWidth: '1248px !important'
});

const BackButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  color: theme.palette.info.main,
  border: 0,
  '& svg': {
    fontSize: '14px !important'
  }
}));

export default function Header() {
  const { step, page, goBack } = useMain();

  return (
    <StyledHeaderWrap position="fixed">
      <StyledContentWrap>
        <Box
          component={'img'}
          src="./logo.svg"
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
        {(page === 2 && step > 2 && step <= 19) && (
          <BackButton
            variant="outlined"
            startIcon={<WestSharpIcon />}
            onClick={goBack}
          >
            Back
          </BackButton>
        )}
      </StyledContentWrap>
    </StyledHeaderWrap>
  );
}