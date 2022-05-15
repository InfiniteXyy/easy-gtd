import dayjs from 'dayjs';
import { Reorder } from 'framer-motion';
import { useDrop } from 'react-dnd';
import shallow from 'zustand/shallow';
import { ITodoCategory, todoModule } from '~/store';
import { TodoItem } from './todo-item';

interface TodoGroupProps {
  title: string;
  category?: ITodoCategory;
}

const categoryColor: Record<ITodoCategory, string> = {
  next: 'bg-green-400',
  maybe: 'bg-yellow-400',
  project: 'bg-blue-400',
  waiting: 'bg-gray-400',
};

export const TodoGroup = memo(function TodoGroup(props: TodoGroupProps) {
  const { title, category } = props;

  const [todoList, { updateTodoCategory, reorderItems }] = todoModule.use(
    (state) =>
      state.todoList
        .filter((i) => !i.isDeleted)
        .filter((i) => i.category === category)
        .filter((i) => !i.finishedAt || dayjs(i.finishedAt).isSame(dayjs(), 'day')),
    shallow
  );

  const finishedCount = todoList.filter((i) => i.checked).length;

  const [{ isOver }, dropRef] = useDrop(() => ({
    accept: 'TodoItem',
    collect: (monitor) => ({ isOver: monitor.isOver() }),
    drop: (item: { id: string }) => {
      updateTodoCategory(item.id, props.category);
    },
  }));

  return (
    <section>
      <div className="mb-2 flex justify-between">
        <h4 className="text-sm text-neutral-400">{title}</h4>
        <div className="text-xs text-neutral-400">
          {finishedCount} / {todoList.length}
        </div>
      </div>
      <Reorder.Group values={todoList} onReorder={reorderItems} className="relative">
        <div
          ref={dropRef}
          className={`${
            !isOver ? 'bg-neutral-100 dark:bg-neutral-700' : 'bg-neutral-200 dark:bg-neutral-600'
          } relative overflow-hidden rounded-lg p-2 pl-4`}
        >
          <div
            className={`${
              category ? categoryColor[category] : 'bg-neutral-100'
            } absolute left-1 top-1 bottom-1 w-1 rounded`}
          />

          {todoList.length > 0 ? (
            todoList.map((todo) => <TodoItem key={todo.id} todo={todo} />)
          ) : (
            <div className="text-center text-xs font-medium leading-8 text-neutral-300 dark:text-neutral-500">
              No Tasks
            </div>
          )}
        </div>
      </Reorder.Group>
    </section>
  );
});
