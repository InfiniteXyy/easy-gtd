import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { isTouchDevice } from '~/common';
import '../styles/globals.css';

dayjs.extend(relativeTime);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Get Things Done</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </Head>
      <DndProvider backend={isTouchDevice() ? TouchBackend : HTML5Backend}>
        <ThemeProvider defaultTheme="system" attribute="class">
          <AnimatePresence exitBeforeEnter>
            <Component {...pageProps} />
          </AnimatePresence>
        </ThemeProvider>
      </DndProvider>
    </>
  );
}

export default MyApp;
