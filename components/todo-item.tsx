import { motion } from 'framer-motion';
import { useLongPress } from 'react-use';
import { ITodo, todoModule } from '~/store';

interface TodoItemProps {
  todo: ITodo;
}

export function TodoItem(props: TodoItemProps) {
  const { todo } = props;
  const { updateTodoChecked, deleteTodo } = todoModule.useActions();

  const longPressProps = useLongPress(
    () => confirm('Do you want to delete ' + todo.title) && deleteTodo(todo.id),
    { delay: 600, isPreventDefault: false }
  );
  const onChange = () => {
    updateTodoChecked(todo.id, !todo.checked);
  };

  return (
    <motion.div
      {...longPressProps}
      drag="x"
      dragSnapToOrigin
      whileTap={{ scale: 0.95 }}
      className={`${
        !todo.checked ? 'text-gray-700' : 'text-gray-300 line-through'
      } flex space-x-2 items-center active:bg-gray-200 p-1 rounded-lg relative`}
      onClick={onChange}
    >
      <div
        className={`${
          !todo.checked ? 'i-[ri-checkbox-blank-circle-line]' : 'i-[ri-checkbox-circle-line]'
        } text-xl`}
      />
      <div className="whitespace-nowrap overflow-hidden text-ellipsis text-md font-medium">
        {todo.title}
      </div>
    </motion.div>
  );
}
