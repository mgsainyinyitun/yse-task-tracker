import { Avatar, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Menu, MenuItem, Sidebar, useProSidebar } from 'react-pro-sidebar';
import { ADMIN_MENU, USER_MENU } from './MenuConstant';
import { Link } from "react-router-dom";
import YSE_LOGO from "../../assets/images/YSE Logo (Color).png";
import { useTheme } from "@mui/material";
import { THEME } from "../../themes";

import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";


function SideMenuBar() {
    const currentRoute = window.location.pathname;
    const theme = useTheme();
    const paper = theme.palette.background.paper;
    const background = theme.palette.mode === THEME.DARK.palette.mode ?
        theme.palette.grey[900] : theme.palette.grey[300];

    const { collapseSidebar, collapsed, toggleSidebar, broken } = useProSidebar();

    return (
        <Box
            sx={{
                display: 'flex',
                flexGrow:'1',
                height: '90vh',
                overflow: 'scroll',
                borderRadius: '10px 10px 0 0',

                '& .ps-menu-button.ps-active:hover:before': {
                    content:'none',
                },
                '& .ps-menu-button.ps-active:hover:after': {
                    content:'none',
                },

                '& .ps-menu-button.ps-active': {
                    fontWeight: 'bold',
                    color: `${theme.palette.primary.dark}`,
                    background: `${background}`,
                    borderRadius: '10px 0 0 10px',
                },
                '& .ps-menu-button.ps-active:before': {
                    position: 'absolute',
                    content: '""',
                    height: "30px",
                    width: "30px",
                    background: `${paper}`,
                    right: 0,
                    bottom: '100%',
                    borderBottomRightRadius: "13px",
                    boxShadow: `0 17px 0 ${background}`,
                },
                '& .ps-menu-button.ps-active:after': {
                    position: 'absolute',
                    content: '""',
                    height: "30px",
                    width: "30px",
                    background: `${paper}`,
                    right: 0,
                    top: '100%',
                    borderTopRightRadius: "13px",
                    boxShadow: `0 -17px 0 ${background}`,
                }
            }}
        >
            <Sidebar
                backgroundColor={background}
                breakPoint={'md'}
                rootStyles={{
                    borderRightStyle: "none",
                    direction: 'rtl',
                    display: 'flex',
                }}
            >
                <Box
                    display={'flex'}
                    flexDirection={'column'}
                    height={'100%'}
                    sx={{
                        direction: "ltr",
                    }}
                >
                    <Menu
                        rootStyles={{
                            height: "100%",
                            background: { background },
                            display: 'flex',
                            flexDirection: 'column',
                            '& .css-ewdv3l': {
                                display: 'flex',
                                flexDirection: 'column',
                                height: '100%',
                            }
                        }}
                        menuItemStyles={{
                            button: {
                                '&:hover': {
                                   background:`transparent`,
                                    borderRadius:'10px 0 0 10px',
                                    borderLeft:`2px solid  ${theme.palette.primary.dark}`,
                                },
                                // '&:hover:before': {
                                //     position: 'absolute',
                                //     content: '""',
                                //     height: "30px",
                                //     width: "30px",
                                //     background: `${paper}`,
                                //     right: 0,
                                //     bottom: '100%',
                                //     borderBottomRightRadius: "13px",
                                //     boxShadow: `0 17px 0 ${background}`,
                                // },
                                // '&:hover:after': {
                                //     position: 'absolute',
                                //     content: '""',
                                //     height: "30px",
                                //     width: "30px",
                                //     background: `${paper}`,
                                //     right: 0,
                                //     top: '100%',
                                //     borderTopRightRadius: "13px",
                                //     boxShadow: `0 -17px 0 ${background}`,
                                // },
                            },
                        }}
                    >

                        {/* <MenuItem
                            onClick={() => collapseSidebar()}
                            icon={collapsed ? <MenuOutlinedIcon /> : undefined}
                            style={{
                                margin: "10px 0 10px 0",
                                color: 'GrayText',
                            }}
                        >
                            {!collapsed && (
                                <Box
                                    display="flex"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    ml="15px"
                                >
                                    <Typography variant="h6" color={'gray'} >
                                        Sai Nyi
                                    </Typography>
                                    <IconButton>
                                        <MenuOutlinedIcon />
                                    </IconButton>
                                </Box>
                            )}
                        </MenuItem> */}

                        {/* Avator and some text */}
                        {(!collapsed &&
                            <Box sx={{
                                minHeight: "200px",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                background: `${paper}`,
                                borderRadius: "10px",
                                padding: "0.5rem",
                            }}
                                mb={1}
                            >
                                <Avatar
                                >SN</Avatar>
                                <Typography
                                    variant="h6"
                                    mt={1}
                                >
                                    Sai Nyi Nyi Tun
                                </Typography>
                                <Typography
                                    variant="body2"
                                    mt={1}
                                >
                                    Web Designer
                                </Typography>
                                <Box
                                    sx={{
                                        color: { background },
                                        width: '100%',
                                        height: '3px',
                                        marginTop: '10px',
                                        marginBottom: '10px',
                                    }}></Box>
                                <Typography
                                    variant="body2"
                                    color={'GrayText'}
                                    textAlign={'center'}
                                >
                                    Social Media and Design Department
                                </Typography>
                            </Box>)}

                        {/* Avator and some text */}
                        {(collapsed &&
                            <Box sx={{
                                minHeight: "200px",
                                width: "80px",
                                background: `${paper}`,
                                display: 'flex',
                                justifyContent: 'center',
                                borderRadius: "10px",
                                padding: "0.5rem",
                            }}
                                mb={1}
                            >
                                <Avatar>SN</Avatar>
                            </Box>)}


                        <Box
                            pb={4}
                            sx={{
                                borderRadius: "10px",
                                background: `${paper}`,
                            }}
                        >
                            <Typography
                                variant="body1"
                                m={1}
                                fontWeight={'bold'}
                            >
                                User
                            </Typography>
                            {
                                USER_MENU.items.map(item => {
                                    return (
                                        <MenuItem
                                            active={currentRoute === item.link}
                                            rootStyles={{
                                                paddingLeft: '10px',
                                            }}
                                            key={item.id}
                                            component={<Link to={item.link} />}
                                            icon={item.icon}>
                                            <Typography
                                                style={{ opacity: collapsed ? 0 : 0.7, letterSpacing: '0.5px' }}>{item.title}
                                            </Typography>
                                        </MenuItem>
                                    );
                                })
                            }

                            {/** Admin Role Only  */}
                            <Typography
                                variant="body1"
                                m={1}
                                fontWeight={'bold'}
                            >
                                Admin
                            </Typography>
                            {
                                ADMIN_MENU.items.map(item => {
                                    return (
                                        <MenuItem
                                            active={currentRoute === item.link}
                                            rootStyles={{
                                                paddingLeft: '10px',
                                            }}
                                            key={item.id}
                                            component={<Link to={item.link} />}
                                            icon={item.icon}>
                                            <Typography
                                                style={{ opacity: collapsed ? 0 : 0.7, letterSpacing: '0.5px' }}>{item.title}
                                            </Typography>
                                        </MenuItem>
                                    );
                                })
                            }


                        </Box>
                        {(!collapsed &&
                            <Box sx={{
                                display: "flex",
                                flexGrow: '1',
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                background: `${paper}`,
                                borderRadius: "10px",
                                padding: "0.5rem",
                                minHeight: '150px',
                            }}
                                mt={1}
                                mb={1}
                            >
                                <Avatar
                                    variant="square"
                                    alt="YSE LOGO"
                                    src={YSE_LOGO}
                                    sx={{
                                        width: '100px',
                                        height: 'auto'
                                    }}
                                />
                            </Box>)}
                    </Menu>
                </Box>
            </Sidebar>
        </Box>
    )
}
export default SideMenuBar;