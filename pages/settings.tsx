import { useTheme } from 'next-themes';
import { BackButton, Layout, Switch } from '~/components';

export default function Settings() {
  const { theme, setTheme } = useTheme();

  return (
    <Layout title="Setting" left={<BackButton />}>
      <div className="flex justify-between items-center py-2 px-3 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
        <div className="opacity-80 font-medium">Dark Mode</div>
        <Switch
          enabled={theme === 'dark'}
          setEnabled={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        />
      </div>
    </Layout>
  );
}
