import { useContext } from 'react';
import { StateContext } from 'src/hooks/use-setup-state';

export function useAppState() {
  return useContext(StateContext);
}


export default useAppState;
