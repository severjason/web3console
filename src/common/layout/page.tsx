import React from 'react';
import Grid from '@mui/material/Grid';

const PageLayout:React.FC = ({children}) => {
  return (
    <Grid container flex={1} flexDirection="column" p={2} sx={{minHeight: '100vh'}} justifyContent="center">
      {children}
    </Grid>
  );
}

export default PageLayout;
