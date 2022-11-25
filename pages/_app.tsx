import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { AnimatePresence, useForceUpdate } from 'framer-motion';
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
  const currentDay = dayjs().date();

  const [forceUpdate] = useForceUpdate();

  useEffect(() => {
    if (dayjs().date() !== currentDay) forceUpdate();

    const interval = setInterval(() => {
      if (dayjs().date() !== currentDay) forceUpdate();
    }, 10 * 60 * 1000);

    return () => clearInterval(interval);
  }, [currentDay, forceUpdate]);

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
            <Component key={currentDay} {...pageProps} />
          </AnimatePresence>
        </ThemeProvider>
      </DndProvider>
    </>
  );
}

export default MyApp;
