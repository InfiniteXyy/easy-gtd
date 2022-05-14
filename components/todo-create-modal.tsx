import { ITodoCategory, todoModule } from '~/store';
import { Modal, WeekDaySelect } from './ui';

interface TodoCreateModalProps {
  visible: boolean;
  onCancel: () => void;
}

export function TodoCreateModal(props: TodoCreateModalProps) {
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
    props.onCancel();
  };

  const createButtonCls =
    'w-full flex items-center justify-center gap-2 font-poetsen text-lg bg-neutral-100 dark:bg-neutral-600 rounded-lg h-10 px-2';
  return (
    <Modal {...props}>
      <div className="space-y-4">
        <h1 className="font-poetsen text-2xl font-bold">Create A Task</h1>
        <input
          className="h-10 w-full rounded-lg bg-neutral-100 px-4 dark:bg-neutral-600"
          placeholder="What do you need to do?"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        {isCreatingRoutine && (
          <WeekDaySelect value={routineWeekDays} onChange={setRoutineWeekDays} />
        )}
        <div className="flex space-x-4">
          <button
            className={`${createButtonCls} ${
              isCreatingRoutine ? 'bg-orange-400 text-white' : 'text-orange-500'
            } !w-fit !justify-center`}
            onClick={() => setIsCreatingRoutine(!isCreatingRoutine)}
          >
            <div className="i-[material-symbols-calendar-month-outline] text-2xl" />
          </button>
          {isCreatingRoutine ? (
            <button className={createButtonCls} onClick={handleCreate('project')}>
              Set as Routine
            </button>
          ) : (
            <>
              <button
                className={`${createButtonCls} !justify-start text-orange-500`}
                onClick={handleCreate('maybe')}
              >
                <div className="i-[material-symbols-chevron-left] text-2xl" />
                <span>Later</span>
              </button>
              <button
                className={`${createButtonCls} !justify-end text-green-600`}
                onClick={handleCreate('next')}
              >
                <span>Do Now</span>
                <div className="i-[material-symbols-chevron-right] text-2xl" />
              </button>
            </>
          )}
        </div>
        {!isCreatingRoutine && (
          <button className={createButtonCls} onClick={handleCreate()}>
            <div className="i-[akar-icons-inbox] text-xl" />
            <span>Put in the inbox</span>
          </button>
        )}
      </div>
    </Modal>
  );
}
