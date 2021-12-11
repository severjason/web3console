import React, { useEffect, useState } from 'react';
import Web3 from 'web3';

export const Web3Context = React.createContext<Web3 | null>(null);

export function useSetupWeb3(url = "http://localhost:8545") {
  const [web3Instance, setWeb3] = useState<Web3 | null>(null);
  useEffect(() => {
    setWeb3(new Web3(url));
  }, [url]);

  return web3Instance;
}


export default useSetupWeb3;
