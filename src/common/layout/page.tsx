import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import React from 'react';
import { NAV_PADDING } from '../../constants/styles';
import { Nav } from '../index';

const PageLayout: React.FC = ({ children }) => {
  return (
    <Grid sx={{ flexDirection: { xs: 'column', sm: 'row' } }}>
      <Nav />
      <Grid sx={{ paddingLeft: {xs: 0, sm: `${NAV_PADDING}px`}, minHeight: '100vh' }} justifyContent='center'>
        <Container>
          {children}
        </Container>
      </Grid>
    </Grid>
  );
};

export default PageLayout;
