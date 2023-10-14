import { Noto_Color_Emoji, Ubuntu } from "next/font/google";

export const ubuntu = Ubuntu({
  weight: ["300", "400", "500", "700"],
  variable: "--font-ubuntu",
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export const notoColorEmoji = Noto_Color_Emoji({
  weight: ["400"],
  variable: "--font-emoji",
  subsets: ["emoji"],
  style: ["normal"],
});
