import { loadFont } from '@remotion/google-fonts/Inter';

// Inter dari Google Fonts. Butuh internet saat render; jika gagal, ganti ke 'sans-serif'.
const font = loadFont('normal', { weights: ['400', '600', '800'], subsets: ['latin'] });

export const FONT: string = font.fontFamily;
