declare module 'src/styles/theme' {
  interface Theme {
    color: {
      main: string;
      mainMiddle: string;
      mainDark: string;
      positive: string;
      positiveDark: string;
      negative: string;
      negativeDark: string;
      pointPurple: string;
      pointPink: string;
      gray: {
        100: string;
        12: string;
        18: string;
        20: string;
        30: string;
        65: string;
      };
    };
    font: {
      semiBold: string;
      regular: string;
    };
  }

  const theme: Theme;
  export default theme;
}
