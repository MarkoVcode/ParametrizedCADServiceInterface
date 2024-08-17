import * as React from "react";
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Models from './components/Models';
import ModelConfig from './components/ModelConfig';
import PageNotFound from './components/PageNotFound';
import Home from './components/Home';
import useConfig from "./components/useConfig";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import UnderTheHood from "./components/UnderTheHood";
import GitHubIcon from '@mui/icons-material/GitHub';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppDecorator from "./components/AppDecorator";

const defaultTheme = createTheme();

function Copyright(props: any) {
  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        px: 2,
        mt: 'auto',
        textAlign: 'center',
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="body2" color="textSecondary">
          {'© '}
          {new Date().getFullYear()} MarkoVcode. All rights reserved.
        </Typography>

        <Box mt={1}>
          <Link
            href="https://github.com/MarkoVcode/ParametrizedCADServiceInterface" // Replace with your GitHub project URL
            color="inherit"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              textDecoration: 'none',
            }}
          >
            <GitHubIcon sx={{ mr: 1 }} />
            <Typography variant="body2">
              View on GitHub
            </Typography>
          </Link>
        </Box>
      </Container>
    </Box>
  );
}

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

/**
 * Our Web Application
 */
export default function App() {
  const config = useConfig();
  const [open, setOpen] = React.useState(true);
  const [showHome, setShowHome] = React.useState(true);
  const [showModels, setShowModels] = React.useState(false);
  const [pageTitle, setPageTitle] = React.useState("Home");
  const [linkModelId, setLinkModelId] = React.useState();
  const [linkModelParams, setLinkModelParams] = React.useState();

  const imageSrc = config.app.PUBLIC_URL + "/tocmenu1.png";

  const routes = [
    {
      path: '/',
      element: <AppDecorator pageTitle={"Home"}><Home /></AppDecorator>
    },
    {
      path: '/models',
      element: <AppDecorator pageTitle={"Models"}><Models /></AppDecorator>
    },
    {
      path: '/models/:modelId',
      element: <AppDecorator pageTitle={"Models -> Model"}><Models /></AppDecorator>
    },
    {
      path: '/models/:modelId/:modelLink',
      element: <AppDecorator pageTitle={"Models -> Model -> Configurator"}><ModelConfig /></AppDecorator>
    },        
    {
      path: '/underthehood',
      element: <AppDecorator pageTitle={"Under The Hood"}><UnderTheHood /></AppDecorator>
    },
    {
      path: '*',
      element: <AppDecorator><PageNotFound /></AppDecorator>
    }
  ];

  const router = createBrowserRouter(routes, {
    basename: config.app.ROUTER_PATH_BASENAME
  });

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

