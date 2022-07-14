import { createTheme } from '@mui/material/styles';
import 'typeface-fira-sans';

export const vainTheme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#565E2B',
      contrastText: 'rgba(255,255,255,0.87)',
    },
    secondary: {
      main: '#C58F47',
    },
    error: {
      main: '#b9471e',
    },
  },
  typography: {
    h1: {
      fontFamily: 'Fira Sans',
    },
    h2: {
      fontFamily: 'Fira Sans',
    },
    h3: {
      fontFamily: 'Fira Sans',
    },
    h4: {
      fontFamily: 'Fira Sans',
    },
    h5: {
      fontFamily: 'Fira Sans',
    },
    h6: {
      fontFamily: 'Fira Sans',
    },
    subtitle1: {
      fontFamily: 'Fira Sans',
    },
    subtitle2: {
      fontFamily: 'Fira Sans',
    },
    body1: {
      fontFamily: 'Fira Sans',
    },
    body2: {
      fontFamily: 'Fira Sans',
    },
    button: {
      fontFamily: 'Fira Sans',
    },
    caption: {
      fontFamily: 'Fira Sans',
    },
    overline: {
      fontFamily: 'Fira Sans',
    },
  },
});