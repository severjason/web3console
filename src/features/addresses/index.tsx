import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { nanoid } from 'nanoid';
import React, { useCallback, useMemo, useState } from 'react';
import useAppState from 'src/hooks/use-state';
import { Address } from 'src/types';
import { isInvalidAddress } from 'src/utils/validation';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

const INITIAL_STATE: Address = {
  id: '',
  address: '',
  name: '',
};

function Addresses() {
  const { appState: {addresses}, addAddress, removeAddress } = useAppState();
  const [state, setState] = useState(INITIAL_STATE);
  const [opened, setOpened] = useState(false)

  const handleState = useCallback((type: keyof typeof INITIAL_STATE, value: string) => {
    setState(prevState => ({ ...prevState, [type]: value }));
  }, []);

  const clearState = useCallback(() => setState(INITIAL_STATE), [setState])

  const handleChange = useCallback((type: keyof typeof INITIAL_STATE) => (e: React.ChangeEvent<HTMLInputElement>) => {
    handleState(type, e.target.value);
  }, [handleState]);

  const handleClose = useCallback(() => {
    setOpened(false);
    clearState()
  }, [clearState]);

  const onSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    addAddress({ ...state, id: state.id || nanoid() });
    handleClose();
  }, [state, addAddress, handleClose]);

  const isInvalid = useMemo(() => !state.name || !state.address || isInvalidAddress(state.address), [state]);

  const handleOpen = useCallback(() => setOpened(true), []);

  const handleEdit = useCallback((address: Address) => () => {
    setState(address);
    handleOpen();
  }, [handleOpen]);

  const handleDelete = useCallback((id: string) => () => {
    removeAddress(id)
  }, [removeAddress])

  return (
    <Grid container flex={1} flexDirection='column' p={2}>
      <Fab onClick={handleOpen} sx={{position: 'fixed', bottom: 16, right: 16}} color="primary" aria-label="add">
        <AddIcon />
      </Fab>
      <Dialog
        open={opened}
        onClose={handleClose}
      >
        <DialogTitle>
          {state.id ? 'Update address' : 'Add address'}
        </DialogTitle>
        <DialogContent>
          <form onSubmit={onSubmit}>
            <Grid container pt={1} pb={1}>
              <TextField
                required
                onChange={handleChange('name')}
                value={state.name}
                label={'Address Name'}
                fullWidth
              />
            </Grid>
            <Grid container pt={1} pb={1}>
              <TextField
                required
                onChange={handleChange('address')}
                value={state.address}
                label={'Etheruim address'}
                fullWidth
                error={isInvalidAddress(state.address)}
                helperText={isInvalidAddress(state.address) && 'Invalid address'}
              />
            </Grid>
            <Grid container pt={1} pb={1} justifyContent='center' p={1}>
              <Button type='submit' variant='contained' disabled={isInvalid}>
                Add
              </Button>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>
      <Grid container flexDirection="column">
        <Typography sx={{ mt: 4, mb: 2 }} variant="h4" component="h1">
          You addresses
        </Typography>
        {addresses.length ? (
          <List >
            {addresses.map(({address, name, id}) => (
              <ListItem
                key={id}
                secondaryAction={
                  <Grid>
                    <IconButton onClick={handleEdit({address, name, id})} aria-label="edit">
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={handleDelete(id)} aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                }
              >
                <ListItemAvatar>
                  <Avatar>
                    <AccountBalanceWalletIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={name}
                  secondary={address}
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography sx={{ mt: 4, mb: 2 }}>
            You don&apos;t have saved addresses...
          </Typography>
        )}
      </Grid>
    </Grid>
  );
}

export default Addresses;
