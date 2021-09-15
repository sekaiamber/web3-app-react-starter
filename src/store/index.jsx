import React from 'react';
// 工具和配置
import Web3, { Web3ReactProvider, getLibrary } from './web3';

const models = {
  Web3,
};


function compose(containers) {
  return function Component(props) {
    return containers.reduceRight((children, Container) => <Container.Provider>{children}</Container.Provider>, props.children);
  };
}

const ComposedStore = compose(Object.values(models));

function Store({ children }) {
  console.log('global contexts have been re-rendered at: ' + Date.now());

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <ComposedStore>
        {children}
      </ComposedStore>
    </Web3ReactProvider>
  );
}

function connect(ms) {
  return function linkMap(mapStateToProps) {
    return function wrapComponent(Component) {
      return function ConnectComponet(props) {
        const state = mapStateToProps(ms.map(model => model.useContainer()));
        return (
          <Component {...props} {...state} />
        );
      };
    };
  };
}

export default React.memo(Store);
export {
  connect,
};
