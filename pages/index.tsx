import dayjs from 'dayjs';
import Link from 'next/link';
import { Layout, TodoCreateModal, TodoGroup } from '~/components';
import { useIsServer } from '~/hooks';
import { todoModule } from '~/store';

export default function Index() {
  const { initDefaultTodoList } = todoModule.useActions();

  const [addModalVisible, setAddModalVisible] = useState(false);
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
          <Link href="/settings">
            <div className="i-[ant-design-setting-outlined] text-2xl" />
          </Link>
          <Link href="/inbox">
            <div className="i-[akar-icons-inbox] text-2xl" />
          </Link>
          <div
            className="i-[ic-round-add-circle-outline] text-2xl"
            onClick={() => setAddModalVisible(!addModalVisible)}
          />
        </div>
      }
    >
      <TodoCreateModal visible={addModalVisible} onCancel={() => setAddModalVisible(false)} />
      {!isServer && (
        <div className="space-y-4 overflow-auto">
          <TodoGroup category="next" title="Do now!" />
          <TodoGroup category="project" title="My daily routine" />
          <TodoGroup category="waiting" title="Waiting for something" />
          <TodoGroup category="maybe" title="If I have time" />
          <div className="text-xs text-neutral-300">
            Unfinished tasks will be carried over to tomorrow
          </div>
        </div>
      )}
    </Layout>
  );
}
