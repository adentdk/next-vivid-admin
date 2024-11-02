export enum BreakpointEnum {
  Mobile = "mobile",
  SM = "sm",
  MD = "md",
  LG = "lg",
  XL = "xl",
  XXL = "2xl",
  XXXL = "3xl",
  XXXXL = "4xl",
}

export const SCREENS: Record<BreakpointEnum, number> = {
  mobile: 320,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
  "3xl": 1920,
  "4xl": 2560,
};
