import { extendTheme } from '@chakra-ui/react';
// custom themes in chakra UI
// https://chakra-ui.com/docs/theming/customize-theme
// https://www.easyreact.com/articles/chakra-ui-customisations

export const shopTheme = extendTheme({
  styles: {
    global: () => ({
      body: {
        fontFamily: "'Comfortaa', cursive",
        backgroundColor: '#F6F7FB'
      },
    }),
  },
  colors: {
    primary: '#E54242',
    secondary: '#303030',
    highlight: '#00C9A7',
    warning: '#FFC75F',
    danger: '#C34A36',
  },
});
