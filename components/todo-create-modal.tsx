import { ITodoCategory, todoModule } from '~/store';
import { Modal } from './modal';

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
    'w-full font-poetsen text-lg bg-gray-300 active:bg-gray-400 rounded-lg h-10';
  return (
    <Modal {...props}>
      <h1 className="text-2xl font-bold font-poetsen">Create A Task</h1>
      <input
        className="h-10 rounded-lg bg-gray-100 w-full px-4"
        placeholder="What do you need to do?"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <div className="space-x-5 flex">
        <button className={createButtonCls} onClick={handleCreate('maybe')}>
          Maybe Later?
        </button>
        <button className={createButtonCls} onClick={handleCreate('next')}>
          Do Now!
        </button>
      </div>
      <button className={createButtonCls} onClick={handleCreate()}>
        Just Add It
      </button>
    </Modal>
  );
}
