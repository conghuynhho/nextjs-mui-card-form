import { ThemeOptions } from '@mui/material/styles'

// custom breakpoints
// https://mui.com/customization/breakpoints/#custom-breakpoints
declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: true;
    sm: false; // removes the `xs` breakpoint
    md: true;
    lg: true;
    xl: false; // removes the `xl` breakpoint
  }
}

declare module '@mui/material/styles/createPalette' {
  interface Palette {
    smoke: Palette['primary']
  }
  interface PaletteOptions {
    smoke: PaletteOptions['primary']
  }
}

const light: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#496CDC',
      light: '#9AA9EA',
      dark: '#0448CA',
    },
    secondary: {
      main: '#f50057',
    },
    success: {
      main: '#0448CA',
      light: '#E5ECFA',
      contrastText: '#E5ECFA',
    },
    error: {
      main: '#D50134',
      light: '#F2B2C1',
      contrastText: '#F2B2C1',
    },
    text: {
      primary: '#222222',
    },
    smoke: {
      main: '#E1E1E1',
      light: '#E1E1E1',
      dark: '#9F9F9F',
    },
    divider: '#E1E1E1',
  },
  spacing: [0, 4, 8, 16, 24, 32, 48, 64, 96],
  breakpoints: {
    values: {
      xs: 0,
      md: 768,
      lg: 1024,
    },
  },
  typography: {
    fontFamily: [
      'YakuHanJP',
      'Roboto',
      'SF Pro',
      'Hiragino Kaku Gothic ProN',
      'Noto Sans',
      'Noto Sans JP',
      'sans-serif',
    ].join(','),
    subtitle1: {
      color: '#626262'
    },
    subtitle2: {
      color: '#626262'
    },
    caption: {
      color: '#626262'
    }
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: 'contained', color: 'primary' },
          style: {
            background: '#222222',
            color: '#fff',
            boxShadow: 'none',
            borderRadius: '5px',
            '&:hover': {
              background: '#626262',
            },
            '&:focus': {
              background: '#222222',
            },
            '&:disabled': {
              background: '#222222B3',
              color: '#FFFFFF73',
            },
          },
        },
        {
          props: { variant: 'outlined', color: 'primary' },
          style: {
            background: '#fff',
            borderColor: '#9F9F9F',
            color: '#444444',
            fontSize: '14px',
            boxShadow: 'none',
            '&:hover': {
              background: '#FAFAFA',
              borderColor: '#9F9F9F',
              color: '#444444',
            },
            '&:focus': {
              background: '#fff',
              borderColor: '#9F9F9F',
              color: '#444444',
            },
            '&:disabled': {},
          },
        },
        {
          props: { variant: 'outlined', color: 'error' },
          style: {
            '&:disabled': {
              color:'#D5013452',
              borderColor: '#D5013452'
            },
          },
        },
      ],
    },
    // Single tab override
    MuiTab: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            color: '#222222',
            fontWeight: 'bold',
          },
        },
      },
    },
    // Tabs group override
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: '#222222',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          padding: '12.5px 14px'
        }
      }
    }
  },
}
export default Object.assign({}, {
  light,
  dark: {},
})
