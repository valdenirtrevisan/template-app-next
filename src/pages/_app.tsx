import { globalStyles } from '@/styles/global';
import { darkTheme, lightTheme } from '@/styles/stitches.config';
import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider
      defaultTheme={lightTheme.className}
      themes={[lightTheme.className, darkTheme.className]}
      attribute="class"
    >
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
