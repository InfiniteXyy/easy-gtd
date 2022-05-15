import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { Modal, SettingItem } from './ui';
export function ProfileSettingItem() {
  const { data: account } = useAccount();
  const { connect } = useConnect({ connector: new WalletConnectConnector({ options: {} }) });
  const { disconnectAsync } = useDisconnect();

  const [detailModalVisible, setDetailModalVisible] = useState(false);

  return (
    <>
      {account ? (
        <SettingItem
          title={`Connected: ${account.address?.slice(0, 8) + '...' + account.address?.slice(34)}`}
          right={<div className="i-[carbon-chevron-right]" />}
          onClick={() => setDetailModalVisible(true)}
        />
      ) : (
        <SettingItem
          title="Connect Wallet"
          right={<div className="i-[carbon-chevron-right]" />}
          onClick={() => connect()}
        />
      )}
      <Modal visible={detailModalVisible} onCancel={() => setDetailModalVisible(false)}>
        <div className="space-y-2">
          <div className="font-bold">Linked to {account?.connector?.name}</div>
          <div className="mt-2 break-words text-xl font-bold opacity-75">{account?.address}</div>
          <div className="flex gap-2 rounded bg-neutral-50 p-2 dark:bg-neutral-700">
            <div className="i-[ant-design-info-circle-filled] mt-1.5 flex-shrink-0 opacity-50" />
            <span>
              Currently, Wallet connection is just for demo usage, your data is still stored on
              localStorage.
            </span>
          </div>
          <footer className="flex space-x-2 pt-4">
            <button
              onClick={() => setDetailModalVisible(false)}
              className="h-10 w-full rounded-lg border font-medium shadow-sm dark:border-neutral-500"
            >
              Cancel
            </button>
            <button
              onClick={async () => {
                await disconnectAsync();
                setDetailModalVisible(false);
              }}
              className="h-10 w-full rounded-lg border bg-red-500 font-medium text-white shadow-sm dark:border-neutral-500"
            >
              Disconnect
            </button>
          </footer>
        </div>
      </Modal>
    </>
  );
}
