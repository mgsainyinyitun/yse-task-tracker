/***************************************************************************************
 * Check If user Signin or Not. If not Redirect to SignIn Page                         *
 * If so, render Main page                                                             *
 * Themes related settings                                                             *
/***************************************************************************************/

import Dashboard from '../dashboard/Dashboard';
import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { createContext, useMemo, useState } from 'react';
import { THEME } from '../../themes';

export const ColorModeContext = createContext({ toggleColorMode: () => { } });

function Main(props) {
    const [mode, setMode] = useState(THEME.DARK.palette.mode);
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
                    custom:{
                        background:'#eef2f6',
                    }
                },
                breakpoints:{
                    values:{
                        xs:0,
                        sm:600,
                        md:900,
                        lg:1200,
                        xl:1536,
                        middle:768,
                    }
                },
            }),
        [mode],
    )
    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Dashboard page={props.page} />
            </ThemeProvider>
        </ColorModeContext.Provider>
    )
}
export default Main;