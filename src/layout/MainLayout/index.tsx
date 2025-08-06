import React, { useMemo, FC } from 'react';

// material-ui
import { styled, useTheme, Theme } from '@mui/material/styles';
import { Container, AppBar, Box, CssBaseline, Toolbar, useMediaQuery } from '@mui/material';

// project imports
import Breadcrumbs from 'ui-component/extended/Breadcrumbs';
import Header from './Header';
import Sidebar from './Sidebar';
import Customization from '../Customization';
import navigation from 'menu-items';
import useConfig from 'hooks/useConfig';
import { drawerWidth } from 'store/constant';
import { openDrawer } from 'store/slices/menu';
import { useDispatch, useSelector } from 'store';
import AuthGuard from 'utils/route-guard/AuthGuard';
// assets
import { IconChevronRight } from '@tabler/icons';

interface MainStyleProps {
  theme: Theme;
  open: boolean;
}

// styles
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }: MainStyleProps) => ({
  ...theme.typography.mainContent
}));

// ==============================|| MAIN LAYOUT ||============================== //

const MainLayout: FC = ({ children }) => {
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down('lg'));

  const dispatch = useDispatch();
  const { drawerOpen } = useSelector((state) => state.menu);
  const { container } = useConfig();

  React.useEffect(() => {
    dispatch(openDrawer(!matchDownMd));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchDownMd]);

  const header = useMemo(
    () => (
      <Toolbar>
        <Header />
      </Toolbar>
    ),
    []
  );

  return (
    <Box sx={{ display: 'flex' }}>
      {/* <CssBaseline /> */}
      {/* header */}
      {/* <AppBar
          enableColorOnDark
          position="fixed"
          color="inherit"
          elevation={0}
          sx={{
            bgcolor: theme.palette.background.default,
            transition: drawerOpen ? theme.transitions.create('width') : 'none'
          }}
        >
          {header}
        </AppBar> */}

      {/* drawer */}
      {/* <Sidebar /> */}

      {/* main content */}
      <Main theme={theme} open={drawerOpen}>
        {/* breadcrumb */}
        {container && (
          <Container maxWidth="lg">
            <Breadcrumbs separator={IconChevronRight} navigation={navigation} icon title rightAlign />
            {children}
          </Container>
        )}
        {!container && (
          <>
            <Breadcrumbs separator={IconChevronRight} navigation={navigation} icon title rightAlign />
            {children}
          </>
        )}
      </Main>
      {/* <Customization /> */}
    </Box>
  );
};

export default MainLayout;
