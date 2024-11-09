declare module 'src/styles/theme' {
  interface Theme {
    color: {
      main: {
        mainColor: string;
        positive: string;
        negative: string;
        pointPurple: string;
        pointPink: string;
        pointBlue: string;
        selectedMain: string;
      };
      grayScale: {
        black: string;
        lightBlack: string;
        darkGray: string;
        gray: string;
        lightGray: string;
        brightGray: string;
        brightLightGray: string;
        mediumGray: string;
        mediumBrightGray: string;
        white: string;
        gray12: string;
        gray18: string;
        gray20: string;
        gray30: string;
        gray65: string;
      };
    };
    font: {
      family: {
        pretendard_regular: string;
        pretendard_semiBold: string;
      };
    };
  }

  const theme: Theme;
  export default theme;
}
