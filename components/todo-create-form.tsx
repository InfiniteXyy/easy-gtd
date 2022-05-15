import { ITodoCategory, todoModule } from '~/store';
import { WeekDaySelect } from './ui';

interface TodoCreateFormProps {
  showTitle?: boolean;
}

export function TodoCreateForm(props: TodoCreateFormProps) {
  const { showTitle } = props;
  const [input, setInput] = useState('');
  const [isCreatingRoutine, setIsCreatingRoutine] = useState(false);
  const [routineWeekDays, setRoutineWeekDays] = useState<number[]>([]);

  const { createTodo, createRoutine, applyRoutineTodos } = todoModule.useActions();

  const handleCreate = (category?: ITodoCategory) => () => {
    if (!input) return;
    if (category === 'project') {
      // creating routine
      createRoutine(input, routineWeekDays);
      applyRoutineTodos();
      setRoutineWeekDays([]);
    } else {
      // creating task
      createTodo(input, category);
    }
    setInput('');
  };

  const createButtonCls =
    'w-full flex items-center justify-center gap-2 font-medium text-lg bg-neutral-100 dark:bg-neutral-600 rounded-lg h-10 px-2';

  const addToInboxBtn = (
    <button className={createButtonCls} onClick={handleCreate()}>
      <div className="i-[akar-icons-inbox] text-xl" />
      <span>Put in the inbox</span>
    </button>
  );

  const addToNextBtn = (
    <button className={`${createButtonCls} text-green-600`} onClick={handleCreate('next')}>
      <span>Do Now</span>
      <div className="i-[material-symbols-chevron-right] text-2xl" />
    </button>
  );

  const addToMaybeBtn = (
    <button className={`${createButtonCls} text-yellow-400`} onClick={handleCreate('maybe')}>
      <span>Later</span>
    </button>
  );

  const createRoutineBtn = (
    <button className={createButtonCls} onClick={handleCreate('project')}>
      Set as Routine
    </button>
  );

  return (
    <div className="space-y-4">
      {showTitle && <h1 className="text-2xl font-bold">Create A Task</h1>}
      <input
        className="h-10 rounded-lg w-full bg-neutral-100 px-4 dark:bg-neutral-600"
        placeholder="What do you need to do?"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      {isCreatingRoutine && <WeekDaySelect value={routineWeekDays} onChange={setRoutineWeekDays} />}
      <div className="flex space-x-4">
        <button
          className={`${createButtonCls} ${
            isCreatingRoutine ? 'bg-blue-400 text-white dark:bg-blue-700' : 'text-blue-400'
          } !w-fit !justify-center`}
          onClick={() => setIsCreatingRoutine(!isCreatingRoutine)}
        >
          <div className="i-[material-symbols-calendar-month-outline] text-2xl" />
        </button>
        {isCreatingRoutine && createRoutineBtn}
        {!isCreatingRoutine && addToMaybeBtn}
        {!isCreatingRoutine && addToNextBtn}
      </div>
      {!isCreatingRoutine && addToInboxBtn}
    </div>
  );
}
