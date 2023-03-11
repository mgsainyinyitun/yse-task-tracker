/* Sign in Success => 
 *  << READ >> Data On Firebase
 *  1. login user data      (all) -> store in redux store && local storage
 *  2. department data      (all) -> store in redux store
 *  3. position data        (all) -> store in redux store
 *  4. user related task    (all) -> store in redux store 
 *  5. Projects info (all) except for deparment scope -> store in redux store
 */

import { Button, Container, TextField, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import YSELOGO from "../../assets/images/YSE Logo (Color).png";
import ErrorAlert from "../../components/ErrorAlert";
import OverlayLoading from "../../components/OverlayLoading";
import { auth } from "../../firebase";
import { signin } from "../../firebase/auth/userFunction";
import { getUserById } from "../../firebase/firestore/userStoreFunction";
import { setUserDataToLocal } from "../../localstorage/user";
import { addUser } from "../../redux/reducers/userSlice";
import { PAGE } from "../pageConstants";

function Signin() {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorTitle, setErrorTitle] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleSiginSubmit(e) {
        e.preventDefault();
        setError(false);
        email.length === 0 ? setEmailError(true) : setEmailError(false);
        password.length === 0 ? setPasswordError(true) : setPasswordError(false);

        if (!(emailError && passwordError)) {
            setLoading(true);
            // 1. set loading
            // 2. submit signin info to firebase
            // 3. success => redirect to home page
            //    error   => display error message
            signin(email, password, dispatch)
                .then(data => {
                    if (data.status === 'success') {
                        getUserById(data.user.uid).then(
                            userData=>{
                                setUserDataToLocal(userData);
                                dispatch(addUser(userData));
                                setLoading(false);
                                navigate(PAGE.LINK.HOME)
                            }
                        )
                    }
                    else {
                        setError(true);
                        setErrorTitle(data.error.code);
                        setErrorMessage(data.error.message);
                    }
                });
        }
    }

    /** If Already Signin => Redirect to Home Page */
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log(user.uid);
                getUserById(user.uid).then(
                    userData=>{
                        setUserDataToLocal(userData);
                        dispatch(addUser(userData));
                        navigate(PAGE.LINK.HOME)
                    }
                );
            }
        });
    }, [])
    /** END */

    return (
        <Box
            sx={{
                padding: 0,
                margin: 0,
                width: '100%',
                height: '100%',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <ErrorAlert
                open={error}
                title={errorTitle}
                message={errorMessage}
            />
            <Container
                maxWidth={'xs'}
                sx={{
                    border: "none",
                    overflow: 'hidden',
                    padding: '1rem',
                }}
            >
                <form onSubmit={handleSiginSubmit}>
                    <Stack
                        spacing={3}
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <img src={YSELOGO} width={100} />

                        <Typography variant="h5" color={'primary.dark'}>
                            Signin
                        </Typography>
                        <TextField
                            error={emailError}
                            fullWidth
                            defaultValue={''}
                            size="small"
                            label="E-mail"
                            type="email"
                            onChange={e => setEmail(e.target.value)}
                            helperText={emailError ? "email cannot be empty" : null}
                        />
                        <TextField
                            error={passwordError}
                            fullWidth
                            defaultValue={''}
                            id="password"
                            name="password"
                            size="small"
                            label="Password"
                            type="password"
                            onChange={e => setPassword(e.target.value)}
                            helperText={passwordError ? "password cannot be empty" : null}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{
                                width: '100%',
                            }}
                        >
                            Login
                        </Button>
                        <Typography>
                            Do not have an account?
                            <Link to={PAGE.LINK.SIGNUP}
                                style={{
                                    textDecoration: 'none',
                                }}
                            >
                                Sign Up
                            </Link>
                        </Typography>
                    </Stack>
                </form>
            </Container>
            <OverlayLoading open={loading} />
        </Box>
    )
}
export default Signin;

