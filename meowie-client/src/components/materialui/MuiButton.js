import { styled } from "@mui/material/styles";
import Button from '@mui/material/Button';

export const MuiButton = styled(Button)(() => ({
    color: '#ebebf0',
    fontWeight: 'bold',
    backgroundColor: '#c23442',
    paddingTop: '0.75rem',
    paddingBottom: '0.75rem',
    marginTop: '1.5rem',
    marginBottom: '1.5rem',
    '&:hover': {
      backgroundColor: '#ff6473',
    },
  }));