import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  title: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
}
export function Layout({ children, left, right, title }: LayoutProps) {
  return (
    <div className="mx-auto flex h-full max-w-[600px] flex-col overflow-hidden p-5 pb-0 text-neutral-900 dark:text-neutral-200">
      <header className="flex items-center justify-between pb-2">
        {left ?? <div className="w-5" />}
        <h1 className="text-xl font-bold">{title}</h1>
        {right ?? <div className="w-5" />}
      </header>
      <main className="overflow-auto scrollbar-hide">{children}</main>
    </div>
  );
}
