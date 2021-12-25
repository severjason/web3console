import _noop from 'lodash/fp/noop';
import React, { useState } from 'react';
import { Address } from 'src/types';

const INITIAL_STATE = {
  addresses: [{
    id: '1',
    name: 'Main',
    address: '0x4bd77836551197b58117bb9402c0c19f4ae7a3d0',
  }, {
    id: '2',
    name: 'Secondary',
    address: '0x49d86af56676c6150d1c4d0b5290c93fb0cae34d',
  },] as Address[],
};

export const StateContext = React.createContext<ReturnType<typeof useSetupState>>({
  appState: INITIAL_STATE,
  handleAppState: _noop,
  addAddress: _noop,
  removeAddress: _noop,
});

export function useSetupState() {
  const [appState, setAppState] = useState(INITIAL_STATE);


  const handleAppState = (type: keyof typeof INITIAL_STATE, value: Address[]) => {
    setAppState(prevState => ({ ...prevState, [type]: value }));
  };

  const addAddress = (value: Address) => {
    setAppState(prevState => {
      const isExisted = prevState.addresses.find(a => a.id === value.id);
      return {
        ...prevState,
        addresses: isExisted ? prevState.addresses.map(add => add.id === value.id ? value : add) : [...prevState.addresses, value],
      };
    });
  };

  const removeAddress = (id: string) => {
    setAppState(prevState => ({
      ...prevState,
      addresses: prevState.addresses.filter(add => add.id !== id),
    }));
  };

  return {
    appState,
    handleAppState,
    addAddress,
    removeAddress,
  };
}


export default useSetupState;
