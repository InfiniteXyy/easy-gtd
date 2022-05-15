import { useTheme } from 'next-themes';
import Link from 'next/link';
import React from 'react';
import { BackButton, Layout, RoutineList, Switch } from '~/components';
import { useIsServer } from '~/hooks';

export default function Settings() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const isServer = useIsServer();
  if (isServer) return null;
  return (
    <Layout title="Setting" left={<BackButton />}>
      <div className="mt-4 space-y-2">
        <SettingItem
          title="Use System Theme"
          right={
            <Switch
              enabled={theme === 'system'}
              setEnabled={() => {
                setTheme((theme === 'system' ? resolvedTheme : 'system') || 'light');
              }}
            />
          }
        />
        <SettingItem
          title="Dark Mode"
          right={
            <Switch
              enabled={resolvedTheme === 'dark'}
              setEnabled={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              disabled={theme === 'system'}
            />
          }
        />
        <Link href="/logs">
          <SettingItem title="View logs" right={<div className="i-[carbon-chevron-right]" />} />
        </Link>
        <RoutineList />
      </div>
    </Layout>
  );
}

function SettingItem(props: { title: string; right: React.ReactNode; onClick?: () => void }) {
  return (
    <div
      onClick={props.onClick}
      className="flex items-center justify-between rounded-lg bg-neutral-50 py-2 px-3 active:bg-neutral-100 dark:bg-neutral-800 dark:active:bg-neutral-700"
    >
      <div className="font-medium opacity-80">{props.title}</div>
      {props.right}
    </div>
  );
}
