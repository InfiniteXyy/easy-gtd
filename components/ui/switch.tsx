import { Switch as UISwitch } from '@headlessui/react';

export function Switch(props: {
  enabled: boolean;
  setEnabled: (value: boolean) => void;
  disabled?: boolean;
}) {
  const { enabled, setEnabled, disabled } = props;
  return (
    <UISwitch
      checked={enabled}
      onChange={setEnabled}
      disabled={disabled}
      className={`${enabled ? 'bg-blue-500' : 'bg-blue-300'} ${disabled && 'opacity-40'}
    relative inline-flex h-[20px] w-[36px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
    >
      <span className="sr-only">Use setting</span>
      <span
        aria-hidden="true"
        className={`${enabled ? 'translate-x-[16px]' : 'translate-x-0'}
      pointer-events-none inline-block h-[16px] w-[16px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
      />
    </UISwitch>
  );
}
