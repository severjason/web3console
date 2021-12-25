import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import React, { useCallback, useMemo, useState } from 'react';
import useWeb3 from 'src/hooks/use-web3';
import { isInvalidAddress } from 'src/utils/validation';
import baseAbi from '../../abi/base';

const INITIAL_STATE = {
  to: '',
  from: '',
  tokenAddress: '',
  tokenSymbol: '',
  value: 0,
  loading: false,
  transferToken: false,
}

function TransferForm() {
  const web3 = useWeb3();
  const [state, setState] = useState(INITIAL_STATE)

  const handleState = useCallback((type: keyof typeof INITIAL_STATE, value: string | number | boolean) => {
    setState(prevState => ({...prevState, [type]: value}));
  }, []);

  const handleChange = useCallback((type: keyof typeof INITIAL_STATE) => (e: React.ChangeEvent<HTMLInputElement>) => {
    handleState(type, e.target.value)
  }, [handleState]);


  const onTransferSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (web3) {
      try {
        handleState('loading', true);
        const { to, from, value} = state;
        const res = await web3.eth.sendTransaction({to, from, value: web3.utils.toWei(`${value}`, "ether") });
        alert(`You have sent ${state.value} to ${state.to}`);
        alert(`Transaction hash - ${res.transactionHash}`);
        handleState('value', 0);
        handleState('loading', false);
      } catch (e) {
        alert(JSON.stringify(e));
        handleState('loading', false);
      }

    }
  }, [state, web3, handleState]);

  const onTransferTokenSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (web3) {
      try {
        const { to, from, value, tokenAddress } = state;
        handleState('loading', true);
        //eslint-disable-next-line
        const contract = new web3.eth.Contract(baseAbi as any, tokenAddress);
        //eslint-disable-next-line
        const res = await (contract as any).methods.transfer(to, value).send({
          from
        });
        alert(`You have sent ${state.value} ${state.tokenSymbol} to ${state.to}`);
        alert(`Transaction hash - ${res.transactionHash}`);
        handleState('value', 0);
        handleState('loading', false);
      } catch (e) {
        alert(JSON.stringify(e));
        handleState('loading', false);
      }

    }
  }, [state, web3, handleState]);

  const onGetSymbol = useCallback(async (address: string) => {
    if (web3) {
      try {
        //eslint-disable-next-line
        const tokenType = new web3.eth.Contract(baseAbi as any, address);
        const symbol = await tokenType.methods.symbol().call();
        handleState('tokenSymbol', symbol)
      } catch (e) {
        handleState('tokenSymbol', '')
      }

    }
  }, [web3, handleState]);

  const handleCheckbox = (e: React.SyntheticEvent, checked: boolean) => {
      handleState('transferToken', checked);
  };

  const handleTokenAddress = useCallback( async (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange('tokenAddress')(e);
    if (isInvalidAddress(e.target.value)) {
      await onGetSymbol(e.target.value);
    } else {
      handleState('tokenSymbol', '')
    }
  }, [handleChange, onGetSymbol, handleState])

  const isDisabled = useMemo(() => state.loading || !state.to || !state.from || isInvalidAddress(state.to) || isInvalidAddress(state.from), [state])

  const valueLabel = useMemo(() => `Value ${state.transferToken ? (state.tokenSymbol ? `(${state.tokenSymbol})` : '') : '(ETH)'}`, [state]);

  return (
    <>
      <form onSubmit={state.transferToken ? onTransferTokenSubmit : onTransferSubmit}>
        <Grid container pt={1} pb={1}>
          <Grid container pt={1} pb={1}>
            <TextField
              onChange={handleChange('from')}
              value={state.from}
              label={"Sender"}
              fullWidth
              error={isInvalidAddress(state.from)}
              helperText={isInvalidAddress(state.from) && 'Invalid address'}
            />
          </Grid>
          <TextField
            onChange={handleChange('to')}
            value={state.to}
            label={"Receiver"}
            fullWidth
            error={isInvalidAddress(state.to)}
            helperText={isInvalidAddress(state.to) && 'Invalid address'}
          />
        </Grid>
        <Grid container pt={1} pb={1}>
          <TextField
            type="number"
            onChange={handleChange('value')}
            value={state.value}
            label={valueLabel}
            fullWidth
          />
        </Grid>
        <Grid container pt={1} pb={1}>
          <FormGroup>
            <FormControlLabel onChange={handleCheckbox} control={<Checkbox checked={state.transferToken} />} label="Transfer token" />
          </FormGroup>
        </Grid>
        {state?.transferToken && (
          <Grid container pt={1} pb={1}>
            <TextField
              onChange={handleTokenAddress}
              value={state.tokenAddress}
              label={`Token address`}
              fullWidth
              error={isInvalidAddress(state.tokenAddress)}
              helperText={isInvalidAddress(state.tokenAddress) && 'Invalid address'}
            />
          </Grid>
        )}
        <Grid container pt={1} pb={1} justifyContent="center">
          <Button type="submit" variant="contained" disabled={isDisabled}>
            {state?.loading ? 'Loading...' : 'Send'}
          </Button>
        </Grid>
      </form>
    </>
  );
}

export default TransferForm;
