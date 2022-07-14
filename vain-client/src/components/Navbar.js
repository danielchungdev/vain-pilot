import React from 'react'
import { AppBar, Box, Toolbar, IconButton, Typography, 
    Menu, Container, Avatar, Button, Tooltip,
     MenuItem, Link
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Navigate, useNavigate } from 'react-router-dom';

export default function Navbar() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const pages = [{title: 'Home', path: '/'}, {title: 'Add Book', path: '/addbook'}, {title: 'Reports', path: '/reports'}]

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    let navigation = useNavigate()

    const logout = () => {
        localStorage.clear()
        navigation('/login')
    }

    return (
        <AppBar position="sticky">
        <Container maxWidth="xl">
            <Toolbar disableGutters>
            <Typography
                variant="h6"
                noWrap
                component="div"
                onClick={() => navigation("/")}
                sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
            >
                VAIN
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
                >
                <MenuIcon />
                </IconButton>
                <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                    display: { xs: 'block', md: 'none' },
                }}
                >
                {pages.map((page) => (
                    <MenuItem key={page.title} onClick={() => navigation(page.path)} >
                        <Typography textAlign="center">{page.title}</Typography>
                    </MenuItem>
                ))}
                </Menu>
            </Box>
            <Typography
                variant="h6"
                noWrap
                component="div"
                onClick={() => navigation("/")}
                sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
            >
                VAIN
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                {pages.map((page) => (
                <Button
                    key={page.title}
                    onClick={() => navigation(page.path)}
                    component={Link}
                    to="/addbook"
                    sx={{ my: 2, color: 'white', display: 'block' }}
                >
                    {page.title}
                </Button>
                ))}
            </Box>
            <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    {
                        localStorage.getItem('user') ? 
                        <Avatar>{localStorage.getItem('fname')[0].toUpperCase() + localStorage.getItem('lname')[0].toUpperCase()}</Avatar> 
                        : 
                        <Avatar>N</Avatar>
                    }
                </IconButton>
                </Tooltip>
                <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
                >
                    <MenuItem key='logout' onClick={logout}>
                        <Typography textAlign="center">Logout</Typography>
                    </MenuItem>
                </Menu>
            </Box>
            </Toolbar>
        </Container>
        </AppBar>
    )
}
