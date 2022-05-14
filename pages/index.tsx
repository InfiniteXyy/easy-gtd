import dayjs from 'dayjs';
import Link from 'next/link';
import { Layout, TodoCreateModal, TodoGroup } from '~/components';
import { useIsServer } from '~/hooks';
import { todoModule, uiModule } from '~/store';

export default function Index() {
  const { initDefaultTodoList, applyRoutineTodos } = todoModule.useActions();
  const [{ isInEditMode }, { setInEditMode }] = uiModule.use();
  const [addModalVisible, setAddModalVisible] = useState(false);

  const isServer = useIsServer();
  useEffect(() => {
    initDefaultTodoList();
    applyRoutineTodos();
  }, [applyRoutineTodos, initDefaultTodoList]);

  return (
    <Layout
      title={dayjs().format('YYYY.MM.DD')}
      left={<></>}
      right={
        <div className="flex space-x-5">
          <Link href="/settings">
            <div className="i-[ant-design-setting-outlined] text-2xl" />
          </Link>
          <div
            className={`${isInEditMode ? 'i-[ic-round-check]' : 'i-[akar-icons-edit]'} text-2xl`}
            onClick={() => setInEditMode(!isInEditMode)}
          />
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
          <TodoGroup category="next" title="Next" />
          <TodoGroup category="project" title="Daily" />
          <TodoGroup category="waiting" title="Waiting For" />
          <TodoGroup category="maybe" title="Maybe" />
          <TodoGroup title="Inbox" />
          <div className="text-xs text-neutral-300">
            Unfinished tasks will be carried over to tomorrow
          </div>
        </div>
      )}
    </Layout>
  );
}
