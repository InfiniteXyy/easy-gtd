import dayjs from 'dayjs';
import { ITodoCategory, todoModule } from '~/store';
import { TodoItem } from './todo-item';

interface TodoGroupProps {
  title: string;
  category?: ITodoCategory;
}

const categoryColor: Record<ITodoCategory, string> = {
  next: 'border-green-400',
  maybe: 'border-yellow-400',
  project: 'border-blue-400',
  waiting: 'border-gray-500',
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
        className={`${
          category ? categoryColor[category] : ''
        } p-2 rounded-r-lg bg-neutral-50 dark:bg-neutral-700 border-l-4 overflow-hidden`}
      >
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
