import { useTheme } from 'next-themes';
import Link from 'next/link';
import React from 'react';
import { BackButton, Layout, RoutineList, SettingItem, Switch } from '~/components';
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
        <Link href="/histories">
          <SettingItem title="View history" right={<div className="i-[carbon-chevron-right]" />} />
        </Link>
        <RoutineList />
      </div>
    </Layout>
  );
}
