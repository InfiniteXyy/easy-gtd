import dayjs from 'dayjs';
import { useDrop } from 'react-dnd';
import { ITodoCategory, todoModule } from '~/store';
import { TodoItem } from './todo-item';

interface TodoGroupProps {
  title: string;
  category?: ITodoCategory;
}

const categoryColor: Record<ITodoCategory, string> = {
  next: 'bg-green-300',
  maybe: 'bg-yellow-300',
  project: 'bg-blue-300',
  waiting: 'bg-gray-400',
};
export function TodoGroup(props: TodoGroupProps) {
  const { title, category } = props;

  const [todoList, { updateTodoCategory }] = todoModule.use((state) =>
    state.todoList
      .filter((i) => i.category === category)
      .filter((i) => !i.finishedAt || dayjs(i.finishedAt).isSame(dayjs(), 'day'))
  );

  const finishedCount = todoList.filter((i) => i.checked).length;

  const [{ isOver }, dropRef] = useDrop(() => ({
    accept: 'TodoItem',
    collect: (monitor) => ({ isOver: monitor.isOver() }),
    drop: (item: { id: string }) => updateTodoCategory(item.id, props.category),
  }));

  return (
    <section>
      <div className="flex justify-between mb-2">
        <h4 className="text-sm text-neutral-400">{title}</h4>
        <div className="text-xs text-neutral-400">
          {finishedCount} / {todoList.length}
        </div>
      </div>
      <div
        ref={dropRef}
        className={`${
          !isOver ? 'bg-neutral-50 dark:bg-neutral-700' : 'bg-neutral-200 dark:bg-neutral-600'
        } relative p-2 px-4 rounded-lg overflow-hidden`}
      >
        <div
          className={`${
            category ? categoryColor[category] : 'bg-neutral-100'
          } absolute left-1 w-1 top-1 bottom-1 rounded`}
        />
        {todoList.length > 0 ? (
          todoList.map((todo) => <TodoItem key={todo.id} todo={todo} />)
        ) : (
          <div className="leading-10 text-center text-neutral-300 dark:text-neutral-00 font-bold">
            No Tasks
          </div>
        )}
      </div>
    </section>
  );
}
