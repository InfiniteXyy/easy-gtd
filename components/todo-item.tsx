import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useDrag } from 'react-dnd';
import { ITodo,todoModule,uiModule } from '~/store';
dayjs.extend(relativeTime);

interface TodoItemProps {
  todo: ITodo;
}

export function TodoItem(props: TodoItemProps) {
  const { todo } = props;
  const { updateTodoChecked, deleteTodo, updateTodoTitle } = todoModule.useActions();
  const [{ isInEditMode }] = uiModule.use();

  const [collected, dragRef, dragPreviewRef] = useDrag(() => ({
    type: 'TodoItem',
    item: { id: todo.id },
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  }));

  return (
    <div
      ref={dragPreviewRef}
      style={{ opacity: collected.isDragging ? 0.3 : 1 }}
      className={`${
        !todo.checked
          ? 'text-neutral-700 dark:text-neutral-100'
          : 'text-neutral-300 dark:text-neutral-500 line-through'
      } flex space-x-2 items-center active:bg-neutral-100 active:dark:bg-neutral-600 px-1 py-1.5 rounded-lg relative`}
      onClick={isInEditMode ? undefined : () => updateTodoChecked(todo.id, !todo.checked)}
    >
      {isInEditMode ? (
        <div className="i-[material-symbols-menu] text-xl flex-shrink-0" ref={dragRef} />
      ) : (
        <div
          className={`${
            !todo.checked ? 'i-[ri-checkbox-blank-circle-line]' : 'i-[ri-checkbox-circle-line]'
          } text-xl flex-shrink-0`}
        />
      )}
      {isInEditMode ? (
        <input
          value={todo.title}
          onChange={(e) => updateTodoTitle(todo.id, e.target.value)}
          className="w-full text-sm font-medium bg-transparent outline-none focus:underline"
        />
      ) : (
        <div className="whitespace-nowrap overflow-hidden text-ellipsis text-sm font-medium">
          {todo.title}
        </div>
      )}

      {isInEditMode && (
        <div style={{ marginLeft: 'auto' }} className="flex space-x-2">
          <div className="i-[carbon-trash-can] !text-red-500" onClick={() => deleteTodo(todo.id)} />
        </div>
      )}
      {!todo.checked && !isInEditMode && !dayjs(todo.createdAt).isSame(dayjs(), 'day') && (
        <div className="whitespace-nowrap text-xs text-orange-300 flex-1 text-right">
          {dayjs(todo.createdAt).fromNow(true)}
        </div>
      )}
    </div>
  );
}
