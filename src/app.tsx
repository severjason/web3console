import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from 'src/routes';
import { Layout } from './common';
import useSetupState, { StateContext } from './hooks/use-setup-state';
import useSetupWeb3, { Web3Context } from './hooks/use-setup-web3';

function App() {
  const web3 = useSetupWeb3();
  const state = useSetupState();
  return (
    <BrowserRouter>
      <Web3Context.Provider value={web3}>
        <StateContext.Provider value={state}>
          <Layout.Page>
            <Routes />
          </Layout.Page>
        </StateContext.Provider>
      </Web3Context.Provider>
    </BrowserRouter>
  );
}

export default App;
