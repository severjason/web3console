import { useMediaQuery, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useCallback } from 'react';
import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { NAV_MENUS } from 'src/constants/menus';
import { NAV_PADDING } from 'src/constants/styles';

function a11yProps(index: number) {
  return {
    tabIndex: 1,
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const VerticalNav = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const {pathname} = useLocation();
  const navigate = useNavigate()

  const handleClick = useCallback((route: string) => () => navigate(route), [navigate])

  return (
    <Box
      sx={{
        zIndex: 2,
        bgcolor: 'background.paper',
        display: 'flex',
        height: { xs: 'auto', sm: '100vh' },
        width: { xs: '100%', sm: NAV_PADDING },
        top: 0,
        position: { xs: 'sticky', sm: 'fixed' },
      }}
    >
      <Tabs
        orientation={isMobile ? 'horizontal' : 'vertical'}
        variant='scrollable'
        value={pathname}
        scrollButtons={'auto'}
        allowScrollButtonsMobile
        sx={{ borderRight: 1, borderColor: 'divider', width: '100%' }}
      >
        {NAV_MENUS.map(({ title, route }, index) => (
          <Tab onClick={handleClick(route)} key={route} value={route} label={title} {...a11yProps(index)} />
        ))}
      </Tabs>
    </Box>
  );
};

export default VerticalNav;
