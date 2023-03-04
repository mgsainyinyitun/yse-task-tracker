/***************************************************************************************
 * Check If user Signin or Not. If not Redirect to SignIn Page                         *
 * If so, render Main page                                                             *
 * Themes related settings                                                             *
/***************************************************************************************/

import Dashboard from '../dashboard/Dashboard';
import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { createContext, useEffect, useMemo, useState } from 'react';
import { THEME } from '../../themes';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase';
import { redirect, useNavigate } from 'react-router-dom';
import {PAGE} from '../../pages/pageConstants';

export const ColorModeContext = createContext({ toggleColorMode: () => { } });

function Main(props) {
    const [mode, setMode] = useState(THEME.DARK.palette.mode);
    const [user,setUser] = useState(null);
    const navigate = useNavigate();
    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            },
        }),
        [],
    );
    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                    custom: {
                        background: '#eef2f6',
                    }
                },
                breakpoints: {
                    values: {
                        xs: 0,
                        sm: 600,
                        md: 900,
                        lg: 1200,
                        xl: 1536,
                        middle: 768,
                    }
                },
            }),
        [mode],
    )

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                console.log(user);
            } else {
                setUser(null);
                console.log(user);
                navigate(PAGE.LINK.SIGNIN)
            }
        });
    }, []);

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {(user &&
                <Dashboard page={props.page} />
                )}
            </ThemeProvider>
        </ColorModeContext.Provider>
    )
}
export default Main;