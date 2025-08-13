import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const DataButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'selected',
})<{ selected?: boolean }>(({ theme, selected }) => ({
  backgroundColor: selected ? theme.palette.success.main : theme.palette.common.white,
  color: selected ? theme.palette.common.white : theme.palette.secondary.main,
  padding: 16,
  boxShadow: selected ? '0 6px 20px rgba(25, 118, 210, 0.4)' : '0 18px 46px rgba(0, 0, 0, 0.06)',
  textTransform: 'none',
  fontSize: 20,
  fontWeight: 700,
  width: '100%',
  marginBottom: 16,
}));

export default DataButton;