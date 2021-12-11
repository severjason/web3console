import { useMediaQuery, useTheme } from '@mui/material';
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { NAV_PADDING } from '../../constants/styles';

function a11yProps(index: number) {
  return {
    tabIndex: 1,
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const  VerticalNav = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [value, setValue] = React.useState(0);


  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        zIndex: 2,
        bgcolor: 'background.paper',
        display: 'flex',
        height: {xs: 'auto', sm: '100vh' },
        width: {xs: '100%', sm: NAV_PADDING },
        top: 0,
        position: {xs: 'sticky', sm: 'fixed'}
      }}
    >
      <Tabs
        orientation={isMobile ? 'horizontal' : 'vertical'}
        variant="scrollable"
        value={value}
        scrollButtons={"auto"}
        allowScrollButtonsMobile
        onChange={handleChange}
        sx={{ borderRight: 1, borderColor: 'divider', width: '100%' }}
      >
        <Tab label="Item One" {...a11yProps(0)} />
        <Tab label="Item Two" {...a11yProps(1)} />
        <Tab label="Item Three" {...a11yProps(2)} />
        <Tab label="Item Four" {...a11yProps(3)} />
        <Tab label="Item Five" {...a11yProps(4)} />
        <Tab label="Item Six" {...a11yProps(5)} />
        <Tab label="Item Seven" {...a11yProps(6)} />
      </Tabs>
    </Box>
  );
}

export default VerticalNav;
