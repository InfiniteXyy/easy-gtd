import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { createWagmiClient, WagmiProvider } from 'wagmi';
import { isTouchDevice } from '~/common';
import '../styles/globals.css';

dayjs.extend(relativeTime);
const client = createWagmiClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>EasyLab. Gtd</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </Head>
      <WagmiProvider client={client}>
        <DndProvider backend={isTouchDevice() ? TouchBackend : HTML5Backend}>
          <ThemeProvider defaultTheme="system" attribute="class">
            <AnimatePresence exitBeforeEnter>
              <Component {...pageProps} />
            </AnimatePresence>
          </ThemeProvider>
        </DndProvider>
      </WagmiProvider>
    </>
  );
}

export default MyApp;
