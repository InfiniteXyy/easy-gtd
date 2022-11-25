import dayjs from 'dayjs';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { Layout, TodoCreateForm, TodoGroup } from '~/components';
import { useIsServer } from '~/hooks';
import { todoModule, uiModule } from '~/store';

export default function Index() {
  const { initDefaultTodoList, applyRoutineTodos } = todoModule.useActions();
  const [{ isInEditMode }, { setInEditMode }] = uiModule.use();

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
            <div className="i-[material-symbols-more-horiz] text-2xl" />
          </Link>
          <div
            className={`${isInEditMode ? 'i-[ic-round-check]' : 'i-[akar-icons-edit]'} text-2xl`}
            onClick={() => setInEditMode(!isInEditMode)}
          />
        </div>
      }
    >
      <AnimatePresence>
        {isInEditMode && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            <div className="overflow-hidden rounded-lg border bg-neutral-50 p-4 dark:border-neutral-600 dark:bg-neutral-800">
              <TodoCreateForm showTitle={false} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {!isServer && (
        <div className="mt-2 space-y-4 overflow-auto">
          <TodoGroup category="next" title="Next" />
          <TodoGroup category="project" title="Daily" />
          <TodoGroup category="waiting" title="Waiting For" />
          <TodoGroup category="maybe" title="Maybe" />
          <TodoGroup title="Inbox" />
          <div className="pb-4 text-xs text-neutral-300">
            Unfinished tasks will be carried over to tomorrow
          </div>
        </div>
      )}
    </Layout>
  );
}
