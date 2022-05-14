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
    <div className="mx-auto flex h-full max-w-[600px] flex-col overflow-hidden p-5 text-neutral-900 dark:text-neutral-200">
      <header className="flex items-center justify-between pb-5">
        {left ?? <div />}
        <h1 className="font-poetsen text-2xl font-bold">{title}</h1>
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
