import dayjs from 'dayjs';
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

  const todoList = todoModule.useState((state) =>
    state.todoList
      .filter((i) => i.category === category)
      .filter((i) => !i.finishedAt || dayjs(i.finishedAt).isSame(dayjs(), 'day'))
  );

  const finishedCount = todoList.filter((i) => i.checked).length;

  return (
    <section>
      <div className="flex justify-between mb-2">
        <h4 className="text-sm text-neutral-400">{title}</h4>
        <div className="text-xs text-neutral-400">
          {finishedCount} / {todoList.length}
        </div>
      </div>
      <div
        className={`relative p-2 px-4 rounded-lg bg-neutral-50 dark:bg-neutral-700 overflow-hidden`}
      >
        <div
          className={`${
            category ? categoryColor[category] : ''
          } absolute left-1 w-1 top-1 bottom-1 rounded`}
        />
        {todoList.length > 0 ? (
          todoList.map((todo) => <TodoItem key={todo.id} todo={todo} />)
        ) : (
          <div className="leading-10 text-center text-neutral-200 dark:text-neutral-500 font-bold">
            No Tasks
          </div>
        )}
      </div>
    </section>
  );
}
