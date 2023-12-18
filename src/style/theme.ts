import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    color: {
      transparent: string;
      primary: string;
      accent: string;
      text: string;
      bg: string;
      white: string;
      accent_alt: string;
    };
    spacing: { sm: string; md: string; lg: string; xl: string };
    fontSize: {
      sm: string;
      base: string;
      xl: string;
      "2xl": string;
      "3xl": string;
      "4xl": string;
      "5xl": string;
    };
  }
}

export const theme = {
  color: {
    transparent: "transparent",
    primary: "#ecebff",
    accent: "#6366f1",
    text: "#000000de",
    bg: "#ffffff",
    white: "#ffffff",
    accent_alt: "#818cf8"
  },
  spacing: { sm: "8px", md: "12px", lg: "16px", xl: "24px" },
  fontSize: {
    sm: "0.8rem",
    base: "1rem",
    xl: "1.25rem",
    "2xl": "1.563rem",
    "3xl": "1.953rem",
    "4xl": "2.441rem",
    "5xl": "3.052rem"
  }
};
export const darkTheme = {
  color: {
    transparent: "transparent",
    primary: "#0f172a",
    accent: "#6366f1",
    text: "#ffffff",
    bg: "#1e1b4b",
    white: "#ffffff",
    accent_alt: "#818cf8"
  },
  spacing: { sm: "8px", md: "12px", lg: "16px", xl: "24px" },
  fontSize: {
    sm: "0.8rem",
    base: "1rem",
    xl: "1.25rem",
    "2xl": "1.563rem",
    "3xl": "1.953rem",
    "4xl": "2.441rem",
    "5xl": "3.052rem"
  }
};
