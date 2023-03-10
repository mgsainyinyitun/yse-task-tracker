import { Avatar, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Menu, MenuItem, Sidebar, useProSidebar } from 'react-pro-sidebar';
import { ADMIN_MENU, USER_MENU } from './MenuConstant';
import { Link } from "react-router-dom";
import YSE_LOGO from "../../assets/images/YSE Logo (Color).png";
import { useTheme } from "@mui/material";
import { THEME } from "../../themes";
import { useState, useEffect } from "react";

function SideMenuBar() {
    const currentRoute = window.location.pathname;
    const theme = useTheme();
    const paper = theme.palette.background.paper;
    const background = theme.palette.mode === THEME.DARK.palette.mode ?
        theme.palette.grey[900] : theme.palette.custom.background;

    const menuActiveStyle = {
        fontWeight: 'bold',
        color: `${theme.palette.primary.main}`,

        background: `${background}`,
        borderRadius: '10px 0 0 10px',
    };

    const menuBeforeActiveStyle = {
        position: 'absolute',
        content: '""',
        height: "30px",
        width: "30px",
        background: `${paper}`,
        right: 0,
        bottom: '100%',
        borderBottomRightRadius: "13px",
        boxShadow: `0 17px 0 ${background}`,
    }

    const menuAfterActiveStyle = {
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

    const [menuActive, setMenuActive] = useState(menuActiveStyle);
    const [menuActiveBefore, setMenuActiveBefore] = useState(menuBeforeActiveStyle);
    const [menuActiveAfter, setMenuActiveAfter] = useState(menuAfterActiveStyle);

    const { collapsed, toggleSidebar, broken } = useProSidebar();


    function changeMenuActiveStyleEnter() {
        setMenuActive({
            ...menuActive, background: `transparent`,
        });
        setMenuActiveBefore({
            content: 'none',
        });
        setMenuActiveAfter({
            content: 'none',
        })
    }

    function changeMenuActiveStyleLeave() {
        setMenuActive(menuActiveStyle);
        setMenuActiveAfter(menuAfterActiveStyle);
        setMenuActiveBefore(menuBeforeActiveStyle);
    }



    useEffect(() => {
        changeMenuActiveStyleLeave();
    }, [theme]);

    return (
        <Box
            sx={{
                display: 'flex',
                flexGrow: '1',
                height:'100%',
                overflow: 'auto',
                borderRadius: '10px 10px 10px 10px',
                '& .ps-menu-button.ps-active': menuActive,
                '& .ps-menu-button.ps-active:before': menuActiveBefore,
                '& .ps-menu-button.ps-active:after': menuActiveAfter,
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
                                    background: `${background}`,
                                    borderRadius: '10px 0 0 10px',
                                    color: `${theme.palette.primary.dark}`,
                                },
                                '&:hover:before': {
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
                                '&:hover:after': {
                                    position: 'absolute',
                                    content: '""',
                                    height: "30px",
                                    width: "30px",
                                    background: `${paper}`,
                                    right: 0,
                                    top: '100%',
                                    borderTopRightRadius: "13px",
                                    boxShadow: `0 -17px 0 ${background}`,
                                },
                            },
                        }}
                    >
                        {/* Avator and some text */}
                        {(!collapsed &&
                            <Box
                                sx={{
                                    minHeight: "200px",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    background: `${paper}`,
                                    borderRadius: "10px",
                                    padding: "0.5rem",
                                    boxShadow: 1,
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
                            onMouseEnter={() => changeMenuActiveStyleEnter()}
                            onMouseLeave={() => changeMenuActiveStyleLeave()}
                            sx={{
                                borderRadius: "10px",
                                background: `${paper}`,
                                boxShadow: 1,
                                paddingTop: '30px',
                            }}

                        >
                            {(!collapsed &&
                                <Typography
                                    variant="body1"
                                    m={1}
                                    fontWeight={'bold'}
                                >
                                    User
                                </Typography>
                            )}
                            {
                                USER_MENU.items.map(item => {
                                    return (
                                        <MenuItem
                                            active={currentRoute === item.link}
                                            // active={item.link.includes(currentRoute)}
                                            rootStyles={{
                                                paddingLeft: !collapsed ? '10px' : '3px',
                                                zIndex: 1,
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
                            {(!collapsed &&
                                <Typography
                                    variant="body1"
                                    m={1}
                                    fontWeight={'bold'}
                                >
                                    Admin
                                </Typography>
                            )}
                            {
                                ADMIN_MENU.items.map(item => {
                                    return (
                                        <MenuItem
                                            active={currentRoute === item.link}
                                            rootStyles={{
                                                paddingLeft: !collapsed ? '10px' : '3px',
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
                                boxShadow: 1,
                            }}
                                mt={1}
                                mb={2}
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
                        {(collapsed &&
                            <Box sx={{
                                display: "flex",
                                flexGrow: 1,
                                justifyContent: "center",
                                alighItems: 'center',
                                background: `${paper}`,
                                padding: "0.5rem",
                                borderRadius: "10px",
                                boxShadow:1,
                            }}
                                mt={1}
                                mb={1}
                            >
                                <Typography sx={{
                                    color:"primary.main",
                                    writingMode:'vertical-lr',
                                    transform:'rotate(180deg)',
                                    textAlign:'center',
                                    fontWeight:'bold',
                                }}>
                                    Youth Society for Education
                                </Typography>


                            </Box>
                        )}
                    </Menu>
                </Box>
            </Sidebar>
        </Box>
    );
}
export default SideMenuBar;