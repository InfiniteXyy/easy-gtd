import { motion } from 'framer-motion';
import { ITodo, todoModule } from '~/store';

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
    <motion.div
      drag="x"
      dragSnapToOrigin
      onDragEnd={(_event, info) => {
        if (Math.abs(info.offset.x) > 100) {
          deleteTodo(todo.id);
        }
      }}
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
