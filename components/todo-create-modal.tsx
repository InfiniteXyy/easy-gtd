import { ITodoCategory, todoModule } from '~/store';
import { Modal } from './ui';

export function TodoCreateModal(props: { visible: boolean; onCancel: () => void }) {
  const [input, setInput] = useState('');

  const { createTodo } = todoModule.useActions();

  const handleCreate = (category?: ITodoCategory) => () => {
    if (!input) return;
    createTodo(input, category);
    setInput('');
    props.onCancel();
  };

  const createButtonCls =
    'w-full flex items-center justify-center gap-2 font-poetsen text-lg bg-neutral-100 dark:bg-neutral-600 rounded-lg h-10 px-2';
  return (
    <Modal {...props}>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold font-poetsen">Create A Task</h1>
        <input
          className="h-10 rounded-lg bg-neutral-100 dark:bg-neutral-600 w-full px-4"
          placeholder="What do you need to do?"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <div className="space-x-4 flex">
          <button
            className={`${createButtonCls} text-orange-500 !justify-center !w-fit`}
            onClick={() => {
              alert('Coming soon');
            }}
          >
            <div className="i-[material-symbols-calendar-month-outline] text-2xl" />
          </button>
          <button
            className={`${createButtonCls} text-orange-500 !justify-start`}
            onClick={handleCreate('maybe')}
          >
            <div className="i-[material-symbols-chevron-left] text-2xl" />
            <span>Later</span>
          </button>
          <button
            className={`${createButtonCls} text-green-600 !justify-end`}
            onClick={handleCreate('next')}
          >
            <span>Do Now</span>
            <div className="i-[material-symbols-chevron-right] text-2xl" />
          </button>
        </div>
        <button className={createButtonCls} onClick={handleCreate()}>
          <div className="i-[akar-icons-inbox] text-xl" />
          <span>Put in the inbox</span>
        </button>
      </div>
    </Modal>
  );
}
