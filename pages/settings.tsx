import { useTheme } from 'next-themes';
import React from 'react';
import { BackButton, Layout, Switch } from '~/components';
import { useIsServer } from '~/hooks';

export default function Settings() {
  const { theme, setTheme, systemTheme, resolvedTheme } = useTheme();
  const isServer = useIsServer();
  if (isServer) return null;
  return (
    <Layout title="Setting" left={<BackButton />}>
      <div className="space-y-2">
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
      </div>
    </Layout>
  );
}

function SettingItem(props: { title: string; right: React.ReactNode }) {
  return (
    <div className="flex justify-between items-center py-2 px-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
      <div className="opacity-80 font-medium">{props.title}</div>
      {props.right}
    </div>
  );
}
