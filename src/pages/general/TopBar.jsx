import { AppBar, Typography, IconButton, Toolbar, InputBase, Paper } from "@mui/material";
import { Box } from "@mui/system";
import MenuIcon from '@mui/icons-material/Menu';
import { Search, SearchIconWrapper, StyledInputBase } from "../../components/MuiStyledComponents";
import SearchIcon from '@mui/icons-material/Search';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircle from '@mui/icons-material/AccountCircle';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import MenuOpenOutlinedIcon from '@mui/icons-material/MenuOpenOutlined';
import { useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext } from "../main/Main";
import { useProSidebar } from "react-pro-sidebar";


function TopBar() {

    const { collapseSidebar, collapsed } = useProSidebar();
    const theme = useTheme();
    const paper = theme.palette.background.paper;
    const colorMode = useContext(ColorModeContext);
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
                        <IconButton onClick={()=> collapseSidebar()}>

                            <MenuOpenOutlinedIcon sx={{
                                transform:!collapsed?'rotate(0deg)':'rotate(180deg)',
                            }} />
                        </IconButton>
                        <Search
                            sx={{

                            }}
                        >
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
                        <IconButton>
                            <AccountCircle />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    )

}
export default TopBar;