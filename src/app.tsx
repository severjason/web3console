import React from 'react';
import Main from 'src/features/main'
import useSetupWeb3, { Web3Context } from './hooks/use-setup-web3';
import useSetupState , { StateContext } from './hooks/use-setup-state';
import { Layout } from './common';

function App() {
  const web3 = useSetupWeb3();
  const state = useSetupState();
  return (
    <Web3Context.Provider value={web3}>
      <StateContext.Provider value={state}>
        <Layout.Page>
          <Main/>
        </Layout.Page>
      </StateContext.Provider>
    </Web3Context.Provider>
  );
}

export default App;
