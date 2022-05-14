import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import { DndProvider } from 'react-dnd';
import { TouchBackend } from 'react-dnd-touch-backend';
import '../styles/globals.css';

dayjs.extend(relativeTime);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <DndProvider backend={TouchBackend}>
      <ThemeProvider defaultTheme="system" attribute="class">
        <AnimatePresence exitBeforeEnter>
          <Component {...pageProps} />
        </AnimatePresence>
      </ThemeProvider>
    </DndProvider>
  );
}

export default MyApp;
