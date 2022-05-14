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
            transition={{ duration: 0.2 }}
            onClick={onCancel}
            className="absolute inset-0 bg-black -z-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {visible && (
          <motion.div initial={{ y: 300 }} animate={{ y: 0 }} exit={{ y: 300 }}>
            <div className="z-20 space-y-5 h-[350px] p-5 bg-white dark:bg-neutral-800 rounded-tl-3xl rounded-tr-3xl shadow-xl border-2 border-b-0 border-black dark:border-neutral-300 fixed -bottom-[50px] left-0 right-0">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>,
    document.body
  );
}
