import React, { useState } from 'react';
import Web3 from '@store/web3';
import ConnectWalletModal from './connectWalletModal';
import './style.scss';

function Index() {
  const [connectModalVisible, showConnectModal] = useState(false);
  const {
    currentAccount,
    disconnect,
  } = Web3.useContainer();

  let connectContent;
  if (currentAccount) {
    connectContent = (
      <>
        <div>当前地址：{currentAccount}</div>
        <div><button onClick={disconnect}>取消链接</button></div>
      </>
    );
  } else if (connectModalVisible) {
    connectContent = <ConnectWalletModal onClose={() => showConnectModal(false)} onSuccess={() => showConnectModal(false)} />;
  } else {
    connectContent = <div><button onClick={() => showConnectModal(true)}>点击链接</button></div>;
  }

  return (
    <div>
      <h1>链接钱包</h1>
      {connectContent}
    </div>
  );
}


export default Index;
