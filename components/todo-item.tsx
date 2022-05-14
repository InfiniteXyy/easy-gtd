import dayjs from 'dayjs';
import { Reorder, useDragControls } from 'framer-motion';
import Link from 'next/link';
import { useDrag } from 'react-dnd';
import { ITodo, todoModule, uiModule } from '~/store';

interface TodoItemProps {
  todo: ITodo;
}

export const TodoItem = memo(function TodoItem(props: TodoItemProps) {
  const { todo } = props;
  const { updateTodoChecked, deleteTodo, updateTodoTitle } = todoModule.useActions();
  const [{ isInEditMode }] = uiModule.use();
  const controls = useDragControls();
  const [collected, dragRef] = useDrag(() => ({
    type: 'TodoItem',
    item: { id: todo.id },
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  }));

  return (
    <Reorder.Item key={todo.id} value={todo} dragListener={false} dragControls={controls}>
      <div
        style={{ opacity: collected.isDragging ? 0.4 : 1 }}
        className={`${
          !todo.checked
            ? 'text-neutral-700 dark:text-neutral-100'
            : 'text-neutral-300 line-through dark:text-neutral-500'
        } relative flex items-center space-x-2 rounded-lg py-1.5 pl-1 active:bg-neutral-100 active:dark:bg-neutral-600`}
        onClick={isInEditMode ? undefined : () => updateTodoChecked(todo.id, !todo.checked)}
      >
        {isInEditMode ? (
          <div
            onTouchStart={(e) => controls.start(e)}
            onPointerDown={(e) => controls.start(e)}
            className="-m-3 flex-shrink-0 p-3 text-xl"
            ref={dragRef}
          >
            <div className="i-[material-symbols-menu]" />
          </div>
        ) : (
          <div
            className={`${
              !todo.checked ? 'i-[ri-checkbox-blank-circle-line]' : 'i-[ri-checkbox-circle-line]'
            } flex-shrink-0 text-xl`}
          />
        )}
        {isInEditMode ? (
          <input
            value={todo.title}
            onChange={(e) => updateTodoTitle(todo.id, e.target.value)}
            className="w-full bg-transparent text-sm font-medium outline-none focus:underline"
          />
        ) : (
          <div className="overflow-hidden text-ellipsis whitespace-nowrap text-sm font-medium">
            {todo.title}
          </div>
        )}
        {isInEditMode && (
          <div className="flex flex-1 justify-end space-x-2">
            <div
              className="i-[ic-round-delete] !text-red-500"
              onClick={() => deleteTodo(todo.id)}
            />
          </div>
        )}
        {todo.routineId && !isInEditMode && (
          <Link href="/settings">
            <div className="flex flex-1 justify-end" onClick={(e) => e.stopPropagation()}>
              <div className="i-[material-symbols-calendar-month-outline] text-blue-300" />
            </div>
          </Link>
        )}
        {!todo.checked && !isInEditMode && !dayjs(todo.createdAt).isSame(dayjs(), 'day') && (
          <div className="flex-1 whitespace-nowrap text-right text-xs font-bold text-orange-300">
            {dayjs(todo.createdAt).fromNow(true)}
          </div>
        )}
      </div>
    </Reorder.Item>
  );
});
