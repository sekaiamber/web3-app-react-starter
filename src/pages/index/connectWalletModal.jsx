import React, { useState, useEffect } from 'react';
import { ConnectorNames } from '@store/web3/connectors';
import Web3 from '@store/web3';

const connectors = [
  {
    title: 'Metamask',
    connectorName: ConnectorNames.Injected,
  },
  {
    title: 'TrustWallet',
    connectorName: ConnectorNames.Injected,
  },
  {
    title: 'MathWallet',
    connectorName: ConnectorNames.Injected,
  },
  {
    title: 'TokenPocket',
    connectorName: ConnectorNames.Injected,
  },
  {
    title: 'WalletConnect',
    connectorName: ConnectorNames.WalletConnect,
  },
  {
    title: 'Binance Chain Wallet',
    connectorName: ConnectorNames.BSC,
  },
  {
    title: 'SafePal Wallet',
    connectorName: ConnectorNames.Injected,
  },
];

export default function ConnectWalletModal({ onClose, onSuccess }) {
  const {
    connect,
  } = Web3.useContainer();

  const handleConnect = (connectorName) => {
    connect(connectorName, onSuccess);
  };

  return (
    <div id="connectWalletModal">
      <div>选择接入方式：</div>
      <ul>
        {connectors.map(connector => (
          <li key={connector.title}><button onClick={() => handleConnect(connector.connectorName)}>{connector.title}</button></li>
        ))}
      </ul>
      <div><button onClick={onClose}>取消</button></div>
    </div>
  );
}
