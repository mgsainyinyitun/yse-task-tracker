import { AppBar, Typography, IconButton, Toolbar, InputBase, Paper, Menu, MenuItem, Divider, Avatar, ListItemIcon } from "@mui/material";
import { Box } from "@mui/system";
import { Search, SearchIconWrapper, StyledInputBase } from "../../components/MuiStyledComponents";
import SearchIcon from '@mui/icons-material/Search';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircle from '@mui/icons-material/AccountCircle';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import MenuOpenOutlinedIcon from '@mui/icons-material/MenuOpenOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { useTheme } from "@mui/material";
import { useContext, useState } from "react";
import { ColorModeContext } from "../main/Main";
import { useProSidebar } from "react-pro-sidebar";
import { Logout } from "@mui/icons-material";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { Link, useNavigate } from "react-router-dom";
import { PAGE } from "../pageConstants";

function TopBar() {
    const { collapseSidebar, broken, collapsed, toggleSidebar } = useProSidebar();
    const theme = useTheme();
    const paper = theme.palette.background.paper;
    // const paper = theme.palette.custom.secondary;
    const colorMode = useContext(ColorModeContext);
    const navigate = useNavigate();

    /** Avatar Menu */
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    /** END */


    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                localStorage.clear();
                navigate(PAGE.LINK.SIGNIN);
            });
    }

    return (
        <Box
            sx={{
                flexGrow: '1',
            }} >
            <AppBar
                color="inherit"
                position="sticky"
                sx={{
                    backgroundColor: 'transparent',
                    borderRadius: '0 0 10px 10px',
                    boxShadow: 'none',
                }}
            >
                <Toolbar
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        backgroundColor: paper,
                        borderRadius: '0 0 10px 10px'
                    }}>
                    <Box
                        color={"inherit"}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            flexGrow: 1,
                        }}>

                        {broken && (
                            <IconButton onClick={()=>toggleSidebar()}>
                                <MenuOutlinedIcon/>
                            </IconButton>
                        )}
                        {!broken && (
                            <IconButton onClick={() => collapseSidebar()}>

                                <MenuOpenOutlinedIcon sx={{
                                    transform: !collapsed ? 'rotate(0deg)' : 'rotate(180deg)',
                                }} />
                            </IconButton>
                        )}
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search"
                            />
                        </Search>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            flexGrow: 1,
                        }}
                    >
                        <IconButton
                            onClick={colorMode.toggleColorMode}
                        >
                            {
                                theme.palette.mode === "dark" ? (
                                    <LightModeOutlinedIcon />
                                ) : (
                                    <DarkModeOutlinedIcon />
                                )}
                        </IconButton>
                        <IconButton>
                            <MailIcon />
                        </IconButton>
                        <IconButton>
                            <NotificationsIcon />
                        </IconButton>
                        <IconButton
                            onClick={handleClick}
                            aria-controls={open ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                        >
                            <AccountCircle />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={handleClose}>
                    <Link to={PAGE.LINK.PROFILE}
                        style={{
                            textDecoration: 'none',
                            color: 'inherit',
                            display: 'flex',
                            alignItems: 'center',
                        }}>
                        <Avatar /> Profile
                    </Link>
                </MenuItem>
                <MenuItem onClick={handleSignOut}>
                    <ListItemIcon>
                        <Logout />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </Box>
    )
}
export default TopBar;