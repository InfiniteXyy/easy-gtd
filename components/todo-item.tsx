import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { ITodo, todoModule } from '~/store';
dayjs.extend(relativeTime);

interface TodoItemProps {
  todo: ITodo;
}

export function TodoItem(props: TodoItemProps) {
  const { todo } = props;
  const { updateTodoChecked, deleteTodo } = todoModule.useActions();

  const onChange = () => {
    updateTodoChecked(todo.id, !todo.checked);
  };

  return (
    <div
      className={`${
        !todo.checked
          ? 'text-neutral-700 dark:text-neutral-100'
          : 'text-neutral-300 dark:text-neutral-500 line-through'
      } flex space-x-2 items-center active:bg-neutral-100 active:dark:bg-neutral-600 px-1 py-1.5 rounded-lg relative`}
      onClick={onChange}
    >
      <div
        className={`${
          !todo.checked ? 'i-[ri-checkbox-blank-circle-line]' : 'i-[ri-checkbox-circle-line]'
        } text-xl`}
      />
      <div className="whitespace-nowrap overflow-hidden text-ellipsis text-sm font-medium">
        {todo.title}
      </div>
      {!todo.checked && !dayjs(todo.createdAt).isSame(dayjs(), 'day') && (
        <div className="whitespace-nowrap text-xs text-orange-300 flex-1 text-right">
          {dayjs(todo.createdAt).fromNow(true)}
        </div>
      )}
    </div>
  );
}
