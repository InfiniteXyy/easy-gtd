import dayjs from 'dayjs';
import Link from 'next/link';
import { Layout, TodoGroup } from '~/components';
import { useIsServer } from '~/hooks';
import { todoModule } from '~/store';

export default function Index() {
  const { initDefaultTodoList } = todoModule.useActions();
  const isServer = useIsServer();
  useEffect(() => {
    initDefaultTodoList();
  }, [initDefaultTodoList]);

  return (
    <Layout
      title={dayjs().format('YYYY.MM.DD')}
      left={<></>}
      right={
        <div className="space-x-5 flex">
          <Link href="/inbox">
            <div className="i-[akar-icons-inbox] text-2xl" />
          </Link>
          <Link href="/settings">
            <div className="i-[ant-design-setting-outlined] text-2xl" />
          </Link>
        </div>
      }
    >
      {!isServer && (
        <div className="space-y-2 overflow-auto">
          <TodoGroup category="next" title="Do now!" />
          <TodoGroup category="project" title="My daily routine" />
          <TodoGroup category="waiting" title="Waiting for something" />
          <TodoGroup category="maybe" title="If I have time" />
        </div>
      )}
    </Layout>
  );
}
