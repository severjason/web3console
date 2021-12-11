import { useContext } from 'react';
import { Web3Context } from 'src/hooks/use-setup-web3';

export function useWeb3() {
  return useContext(Web3Context);
}


export default useWeb3;
