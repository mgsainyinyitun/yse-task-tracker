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
import { useNavigate } from 'react-router-dom';
import { PAGE } from '../../pages/pageConstants';
import { useDispatch } from 'react-redux';
import { addUser } from '../../redux/reducers/userSlice';
import { getUserDataInLocal } from '../../backend/localstorage/user';

export const ColorModeContext = createContext({ toggleColorMode: () => { } });

function Main(props) {
    const [mode, setMode] = useState(THEME.LIGHT.palette.mode);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
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
                    background: {
                        default: '#f5f5f5',
                        // paper:'#E7C6FF'
                    },
                    mode,
                    custom:
                        mode !== THEME.DARK.palette.mode ?
                            {
                                // background: '#eef2f6',
                                background: '#BBDEFB',
                                secondary: '#48CAE4',
                                // info:'#ADE8F4'
                                info:'#A9D6E5',
                                main:'#2A6F97',
                                primary:'#0096C7'
                            } :
                            {
                                secondary: '#3A0CA3',
                                info:'#000814',
                                primary:'#023E8A'

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
        const Luser = getUserDataInLocal();
        if (Luser) {
            setUser(Luser);
            dispatch(addUser(Luser))
        }
        else {
            navigate(PAGE.LINK.SIGNIN)
        }
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