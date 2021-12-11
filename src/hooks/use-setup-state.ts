import React, { useState } from 'react';
import { Address } from 'src/types';
import _noop from 'lodash/fp/noop';

const INITIAL_STATE = {
  addresses: [] as Address[],
}

export const StateContext = React.createContext<ReturnType<typeof useSetupState>>({
  state: INITIAL_STATE,
  handleState: _noop
});

export function useSetupState() {
  const [state, setState] = useState(INITIAL_STATE);


  const handleState = (type: keyof typeof INITIAL_STATE, value: Address[]) => {
    setState(prevState => ({...prevState, [type]: value}))
  }

  return {
    state,
    handleState
  };
}


export default useSetupState;
