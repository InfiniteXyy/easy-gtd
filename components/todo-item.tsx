import { ITodo, todoModule } from '~/store';

interface TodoItemProps {
  todo: ITodo;
}

export function TodoItem(props: TodoItemProps) {
  const { todo } = props;
  const { updateTodoChecked } = todoModule.useActions();

  const onChange = () => {
    updateTodoChecked(todo.id, !todo.checked);
  };

  return (
    <div
      className={`${
        !todo.checked ? 'text-gray-700' : 'text-gray-300 line-through'
      } flex space-x-2 items-center transition`}
      onClick={onChange}
    >
      <div
        className={`${
          !todo.checked ? 'i-[ri-checkbox-blank-circle-line]' : 'i-[ri-checkbox-circle-line]'
        } text-xl`}
      />
      <div className="whitespace-nowrap overflow-hidden text-ellipsis text-md font-bold font-poetsen">
        {todo.title}
      </div>
    </div>
  );
}
