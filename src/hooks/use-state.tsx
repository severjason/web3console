import { useContext } from 'react';
import { StateContext } from 'src/hooks/use-setup-state';

export function useState() {
  return useContext(StateContext);
}


export default useState;
