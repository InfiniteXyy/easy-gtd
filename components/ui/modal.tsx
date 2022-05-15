import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import ReactDOM from 'react-dom';
import { useIsServer } from '~/hooks';

interface ModalProps {
  visible: boolean;
  onCancel: () => void;
  children: React.ReactNode;
}

export function Modal(props: ModalProps) {
  const { visible, onCancel, children } = props;
  const isServer = useIsServer();
  if (isServer) return null;
  return ReactDOM.createPortal(
    <>
      <AnimatePresence>
        {visible && (
          <motion.div
            transition={{ duration: 0.3, delay: 0.1, ease: 'linear' }}
            onClick={onCancel}
            className="-z-1 absolute inset-0 bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {visible && (
          <motion.div
            className="absolute bottom-0 w-[600px] max-w-full md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2"
            transition={{ ease: 'easeInOut' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="z-20 w-full rounded-tl-3xl rounded-tr-3xl border border-neutral-200 bg-white p-5 shadow-xl dark:border-neutral-800 dark:bg-neutral-800 md:rounded-3xl">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>,
    document.body
  );
}
