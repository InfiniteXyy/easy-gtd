import dayjs from 'dayjs';
import { BackButton, Layout } from '~/components';
import { useIsServer } from '~/hooks';
import { ITodo, todoModule } from '~/store';

export default function Logs() {
  const [{ todoList }] = todoModule.use();
  const isServer = useIsServer();
  const dates = useMemo(() => {
    return todoList.reduce((acc, cur) => {
      if (!cur.finishedAt || cur.isDeleted) return acc;
      const date = dayjs(cur.finishedAt).format('YYYY-MM-DD');
      if (!acc[date]) acc[date] = [];
      acc[date].push(cur);
      return acc;
    }, {} as Record<string, ITodo[]>);
  }, [todoList]);

  return (
    <Layout title="History" left={<BackButton />}>
      {!isServer && (
        <div className="mt-4 space-y-2">
          {Object.entries(dates)
            .reverse()
            .map(([date, todos]) => (
              <div key={date} className="rounded bg-neutral-50 p-3 dark:bg-neutral-800">
                <div className="text-xs font-medium opacity-40">{date}</div>
                <ol className="mt-2 list-inside list-decimal space-y-1">
                  {todos.map((todo) => (
                    <li key={todo.id} className="opacity-85 text-sm font-medium">
                      {todo.title}
                    </li>
                  ))}
                </ol>
              </div>
            ))}
        </div>
      )}
    </Layout>
  );
}
