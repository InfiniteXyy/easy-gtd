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
    <div className="text-dark-500 dark:text-light-300 max-w-[600px] mx-auto p-5">
      <header className="flex items-center justify-between pb-5">
        {left ?? <div />}
        <h1 className="text-2xl font-bold font-poetsen">{title}</h1>
        {right ?? <div />}
      </header>
      <motion.main
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {children}
      </motion.main>
    </div>
  );
}
