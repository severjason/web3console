import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import React, { useCallback, useState } from 'react';
import tokenAbi from 'src/abi/base';
import useWeb3 from 'src/hooks/use-web3';
import { isInvalidAddress } from 'src/utils/validation';
import TransferForm from './transfer-form';

const INITIAL_STATE = {
  address: '',
  tokenAddress: '',
  userTokenAddress: '',
  transactionHash: '',
}

function Main() {
  const web3 = useWeb3();
  const [state, setState] = useState(INITIAL_STATE)

  const handleState = useCallback((type: keyof typeof INITIAL_STATE, value: string) => {
    setState(prevState => ({...prevState, [type]: value}));
  }, []);

  const onGetBalance = useCallback((address: string) => {
    return web3?.eth.getBalance(address);
  }, [web3])

  const handleChange = useCallback((type: keyof typeof INITIAL_STATE) => (e: React.ChangeEvent<HTMLInputElement>) => {
    handleState(type, e.target.value)
  }, [handleState])

  const onAddressSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    onGetBalance(state.address)?.then(value => {
      alert(`${web3?.utils.fromWei(value, 'ether')} ether`);
    })
  }, [state, onGetBalance, web3]);

  const onContractAddressSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (web3) {
      try {
        //eslint-disable-next-line
        const tokenType = new web3.eth.Contract(tokenAbi as any, state.tokenAddress);
        const balance = await tokenType.methods.balanceOf(state.userTokenAddress).call();
        const symbol = await tokenType.methods.symbol().call();
        const name = await tokenType.methods.name().call();
        alert(`You have ${balance} of ${name}(${symbol})`);
      } catch (e) {
        alert(JSON.stringify(e));
      }

    }
  }, [state, web3]);

  const onTransactionHashSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (web3) {
      const transactionHash = await web3.eth.getTransactionReceipt(state.transactionHash);
      alert(JSON.stringify(transactionHash));
    }
  }, [state, web3]);

  return (
    <Grid container flex={1} flexDirection='column' p={2}>
      <form onSubmit={onAddressSubmit}>
        <Grid container pt={1} pb={1}>
          <TextField
            onChange={handleChange("address")}
            value={state.address}
            label={"Etheruim address"}
            fullWidth
            error={isInvalidAddress(state.address)}
            helperText={isInvalidAddress(state.address) && 'Invalid address'}
          />
        </Grid>
        <Grid container pt={1} pb={1} justifyContent="center" p={1}>
          <Button type="submit" variant="contained" disabled={!state.address || isInvalidAddress(state.address)}>
            Show
          </Button>
        </Grid>
      </form>

      <form onSubmit={onContractAddressSubmit}>
        <Grid container pt={1} pb={1}>
          <TextField
            onChange={handleChange('tokenAddress')}
            value={state.tokenAddress}
            label={"Token contract address"}
            fullWidth
            error={isInvalidAddress(state.tokenAddress)}
            helperText={isInvalidAddress(state.tokenAddress) && 'Invalid address'}
          />
        </Grid>
        <Grid container pt={1} pb={1}>
          <TextField
            onChange={handleChange('userTokenAddress')}
            value={state.userTokenAddress}
            label={"User address"}
            fullWidth
            error={isInvalidAddress(state.userTokenAddress)}
            helperText={isInvalidAddress(state.userTokenAddress) && 'Invalid address'}
          />
        </Grid>
        <Grid container pt={1} pb={1} justifyContent="center">
          <Button type="submit" variant="contained"
                  disabled={!state.tokenAddress || !state.userTokenAddress || isInvalidAddress(state.userTokenAddress) || isInvalidAddress(state.tokenAddress)}>
            Show
          </Button>
        </Grid>
      </form>


      <form onSubmit={onTransactionHashSubmit}>
        <Grid container pt={1} pb={1}>
          <TextField
            onChange={handleChange('transactionHash')}
            value={state.transactionHash}
            label={"Transaction info"}
            fullWidth
          />
        </Grid>
        <Grid container pt={1} pb={1} justifyContent="center">
          <Button type="submit" variant="contained" disabled={!state.transactionHash}>
            Show
          </Button>
        </Grid>
      </form>
      <TransferForm/>
    </Grid>
  );
}

export default Main;
