import { motion } from 'framer-motion';
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  title: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
}
export function Layout({ children, left, right, title }: LayoutProps) {
  return (
    <div className="text-neutral-900 dark:text-neutral-200 max-w-[600px] mx-auto p-5 h-full overflow-hidden flex flex-col">
      <header className="flex items-center justify-between pb-5">
        {left ?? <div />}
        <h1 className="text-2xl font-bold font-poetsen">{title}</h1>
        {right ?? <div />}
      </header>
      <motion.main
        className="overflow-auto scrollbar-hide"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        {children}
      </motion.main>
    </div>
  );
}
