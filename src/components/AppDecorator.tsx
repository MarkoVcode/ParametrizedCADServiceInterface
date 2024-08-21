import * as React from "react";
import { useState, useEffect } from 'react';
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
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import useConfig from "./useConfig";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Link as RouterLink, NavLink, useLocation, Outlet, useParams } from "react-router-dom";

const defaultTheme = createTheme();

function Copyright(props: any) {
    const config = useConfig();
    const [version, setVersion] = useState({});

    useEffect(() => {
        fetch(config.app.CAD_SERVICE_URL + '/version')
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setVersion(data);
            });
    }, []);


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
                    {version.version &&
                    <>
                    API ver.:
                    {version.version}
                    </>
                    }
                    { '© '}
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
export default function AppDecorator(props) {
    const config = useConfig();
    const [open, setOpen] = React.useState(true);
    const [linkModelId, setLinkModelId] = React.useState();
    const [linkModelParams, setLinkModelParams] = React.useState();
    const location = useLocation();
    const params = useParams();

    const toggleDrawer = () => {
        setOpen(!open);
    };

    const getLocation = () => {
        if (location.pathname == "/") {
            return "Home";
        } else if (location.pathname == "/models") {
            return "Models";
        } else if (location.pathname.startsWith("/models/") && params.modelId) {
            return "Model";
        } else if (location.pathname.startsWith("/underthehood")) {
            return "Under The Hood";
        }
        return location.pathname;
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
                                {getLocation()}
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
                            <NavLink
                                style={{ textDecoration: 'none' }}
                                to={'/'}
                                className={({ isActive, isPending }) =>
                                    isPending ? "pending" : isActive ? "active" : ""
                                }
                            >
                                <ListItemButton>
                                    <ListItemIcon>
                                        <DashboardIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Home" />
                                </ListItemButton>
                            </NavLink>
                            <NavLink
                                style={{ textDecoration: 'none' }}
                                to={'/models'}
                                className={({ isActive, isPending }) =>
                                    isPending ? "pending" : isActive ? "active" : ""
                                }
                            >
                                <ListItemButton>
                                    <ListItemIcon>
                                        <ShoppingCartIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Models" />
                                </ListItemButton>
                            </NavLink>
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
                            <Outlet />
                            {config.app.COPYRIGHT_SHOW && <Copyright sx={{ pt: 4 }} />}
                        </Container>
                    </Box>
                </Box>
            </ThemeProvider>
        </StyledEngineProvider>
    );
}
