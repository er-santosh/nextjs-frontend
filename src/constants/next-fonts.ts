import { Poppins } from "next/font/google";

export const FONT_POPPINS = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["devanagari", "latin"],
  display: "swap",
  variable: "--font-poppins",
});
