import { useCallback } from 'react';
import { createContainer } from 'unstated-next';
import { useWeb3React, UnsupportedChainIdError, Web3ReactProvider } from '@web3-react/core';
import { NoBscProviderError } from '@binance-chain/bsc-connector';
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from '@web3-react/injected-connector';
import {
  UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
  WalletConnectConnector,
} from '@web3-react/walletconnect-connector';
import { ethers } from 'ethers';
import chainOption from './chain';
import connectors, { connectorLocalStorageKey } from './connectors';

// TODO: toast error
function toastError(...messages) {
  console.error(...messages);
}

function useWeb3() {
  const { account, activate, deactivate } = useWeb3React();

  // 切换网络
  const setupNetwork = useCallback(async () => {
    const provider = window.ethereum;
    if (provider) {
      try {
        await provider.request({
          method: 'wallet_addEthereumChain',
          params: [
            chainOption,
          ],
        });
        return true;
      } catch (error) {
        toastError('Failed to setup the network in Metamask:', error);
        return false;
      }
    } else {
      toastError("Can't setup the BSC network on metamask because window.ethereum is undefined");
      return false;
    }
  }, []);

  const connect = useCallback((connectorName, onSuccess) => {
    const connector = connectors[connectorName];
    if (connector) {
      activate(connector, async (error) => {
        if (error instanceof UnsupportedChainIdError) {
          const hasSetup = await setupNetwork();
          if (hasSetup) {
            activate(connector).then(onSuccess);
          }
        } else {
          window.localStorage.removeItem(connectorLocalStorageKey);
          if (error instanceof NoEthereumProviderError || error instanceof NoBscProviderError) {
            toastError('Provider Error', 'No provider was found');
          } else if (
            error instanceof UserRejectedRequestErrorInjected
            || error instanceof UserRejectedRequestErrorWalletConnect
          ) {
            if (connector instanceof WalletConnectConnector) {
              const walletConnector = connector;
              walletConnector.walletConnectProvider = null;
            }
            toastError('Authorization Error', 'Please authorize to access your account');
          } else {
            toastError(error.name, error.message);
          }
        }
      }).then(onSuccess);
    } else {
      toastError('Unable to find connector', 'The connector config is wrong');
    }
  }, [activate]);

  const disconnect = useCallback(() => {
    deactivate();
    // This localStorage key is set by @web3-react/walletconnect-connector
    if (window.localStorage.getItem('walletconnect')) {
      connectors.walletconnect.close();
      connectors.walletconnect.walletConnectProvider = null;
    }
    window.localStorage.removeItem(connectorLocalStorageKey);
  }, [deactivate]);

  return {
    currentAccount: account,
    setupNetwork,
    connect,
    disconnect,
  };
}

const Web3 = createContainer(useWeb3);

export default Web3;
export {
  Web3ReactProvider,
};


export const getLibrary = (provider) => {
  const library = new ethers.providers.Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
};
