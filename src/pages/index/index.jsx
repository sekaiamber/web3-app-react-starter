import React, { useState } from 'react';
import Web3 from '@store/web3';
import ConnectWalletModal from './connectWalletModal';
import './style.scss';

function Index() {
  const [connectModalVisible, showConnectModal] = useState(false);
  const {
    setupNetwork,
    currentAccount,
    disconnect,
  } = Web3.useContainer();

  const switchToNetwork = () => {
    setupNetwork().then((success) => {
      console.log(success);
    });
  };

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
      <h1>切换到指定网络</h1>
      <div>这个函数用来在连接钱包前切换网络（如果用户没有网络，会直接加入进去），本例子用的是BSC网络，测试方法是先把Metamask切换到ETH主网，点击下面按钮，弹出框点确认，会自动切换到BSC，可以单独拿出来用，下面连接钱包已经集成了，可以不必再次调用。</div>
      <div><button onClick={switchToNetwork}>点击切换</button></div>
      <h1>链接钱包</h1>
      {connectContent}
    </div>
  );
}


export default Index;
