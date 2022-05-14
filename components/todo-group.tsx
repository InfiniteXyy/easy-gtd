import { ITodoCategory, todoModule } from '~/store';
import { TodoItem } from './todo-item';

interface TodoGroupProps {
  title: string;
  category?: ITodoCategory;
}

export function TodoGroup(props: TodoGroupProps) {
  const { title, category } = props;
  const todoList = todoModule.useState((state) =>
    state.todoList.filter((i) => i.category === category)
  );
  return (
    <section>
      <h4 className="text-xs text-gray-400 mb-2">{title}</h4>
      <div className="p-2 rounded-lg bg-gray-100 space-y-3">
        {todoList.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </div>
    </section>
  );
}
