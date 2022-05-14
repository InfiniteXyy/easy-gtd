import { BackButton, Layout, TodoGroup } from '~/components';

export default function Inbox() {
  return (
    <Layout title="Inbox" left={<BackButton />}>
      <TodoGroup title="Inbox" />
    </Layout>
  );
}
