import * as React from "react";
import { styled, createTheme, ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
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
import Home from './components/Home';
import useConfig from "./components/useConfig";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import GitHubIcon from '@mui/icons-material/GitHub';
import { BrowserRouter, Route, Routes } from "react-router-dom";

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

  const toggleDrawer = () => {
    setOpen(!open);
  };

  React.useEffect(() => {
    const uri = window.location.href.replace(config.app.URL, "");
    if (uri.length > 1) {
      const words = uri.split('/');
      localStorage.setItem('modelId', words[2]);
      localStorage.setItem('modelParams', words[3]);
      window.location.href = config.app.URL;
    } else {
      setLinkModelId(localStorage.getItem('modelId'));
      setLinkModelParams(localStorage.getItem('modelParams'));
      localStorage.removeItem('modelId');
      localStorage.removeItem('modelParams');
    }
  }, [])

  const onModelsClick = (event) => {
    setShowHome(false);
    setShowModels(true);
    setPageTitle("Models");
  }

  const onHomeClick = (event) => {
    setShowModels(false);
    setShowHome(true);
    setPageTitle("Home");
  }

  const imageSrc = config.app.PUBLIC_URL + "/tocmenu1.png";

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={defaultTheme}>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <AppBar position="absolute" open={open}>
            <Toolbar
              sx={{
                pr: '24px', // keep right padding when drawer closed
              }}
            >
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer}
                sx={{
                  marginRight: '36px',
                  ...(open && { display: 'none' }),
                }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
              >
                {pageTitle}
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer variant="permanent" open={open}>
            <Toolbar
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                px: [1],
              }}
            >
              <Box
                component="img"
                sx={{
                  height: 50, // Adjust the height of the logo as needed
                  marginRight: 3, // Space between logo and text
                }}
                alt="Thing On Cloud Logo"
                src={imageSrc} // Replace with your logo URL
              />
              <IconButton onClick={toggleDrawer}>
                <ChevronLeftIcon />
              </IconButton>
            </Toolbar>
            <Divider />
            <List component="nav">
              <ListItemButton>
                <ListItemIcon>
                  <DashboardIcon onClick={onHomeClick} />
                </ListItemIcon>
                <ListItemText onClick={onHomeClick} primary="Home" />
              </ListItemButton>
              <ListItemButton>
                <ListItemIcon>
                  <ShoppingCartIcon onClick={onHomeClick} />
                </ListItemIcon>
                <ListItemText onClick={onModelsClick} primary="Models" />
              </ListItemButton>
              <Divider sx={{ my: 1 }} />

            </List>
          </Drawer>
          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === 'light'
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: '100vh',
              overflow: 'auto',
            }}
          >
            <Toolbar />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              {showHome && <Home />}
              {showModels &&
                <Grid container spacing={3}>
                  <Models modelId={linkModelId} modelParams={linkModelParams} />
                </Grid>
              }
              {config.app.COPYRIGHT_SHOW && <Copyright sx={{ pt: 4 }} />}
            </Container>
          </Box>
        </Box>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
