interface WeekDaySelectProps {
  value: number[];
  onChange: (value: number[]) => void;
  size?: 'default' | 'sm';
}

export function WeekDaySelect(props: WeekDaySelectProps) {
  const { value, onChange, size = 'default' } = props;
  return (
    <div className="flex w-full space-x-2">
      {Array.from({ length: 7 }, (_, index) => {
        const isSelected = value.includes(index);
        return (
          <div
            key={index}
            onClick={() => {
              onChange(isSelected ? value.filter((i) => i !== index) : [...value, index]);
            }}
            className={`${size === 'default' ? 'text-md font-bold' : 'text-sm font-medium'} ${
              isSelected
                ? 'bg-blue-400 text-neutral-100 dark:bg-blue-200 dark:text-neutral-700'
                : 'bg-neutral-100 dark:bg-neutral-600'
            } flex aspect-square w-full items-center justify-center rounded-full transition-colors`}
          >
            {index === 0 ? 7 : index}
          </div>
        );
      })}
    </div>
  );
}
