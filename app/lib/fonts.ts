import { Orbitron, Fira_Sans, Nunito_Sans } from "next/font/google";

export const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
});

export const nunito_sans = Nunito_Sans({
  subsets: ["latin"],
  display: "swap", // 'swap' ensures the fallback font is used until Nunito Sans loads
  weight: ["400", "700"], // Specify the weights you need, e.g., regular and bold
  variable: "--font-nunito-sans", // Optional: for use with CSS variables
});

export const fira_sans = Fira_Sans({
  subsets: ["latin"],
  display: "swap", // 'swap' ensures the fallback font is used until Fira Sans loads
  weight: ["400", "700"], // Specify the weights you need, e.g., regular and bold
  variable: "--font-fira-sans", // Optional: for use with CSS variables
});
