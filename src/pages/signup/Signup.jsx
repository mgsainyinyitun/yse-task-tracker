import { Autocomplete, Button, Container, TextField, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import YSELOGO from "../../assets/images/YSE Logo (Color).png";
import ErrorAlert from "../../components/ErrorAlert";
import OverlayLoading from "../../components/OverlayLoading";
import { mockDepartment, mockPosition } from "../../data/mockData";
import { signup } from "../../firebase/auth/userFunction";
import { getUserById } from "../../firebase/firestore/userStoreFunction";
import { setUserDataToLocal } from "../../localstorage/user";
import { addUser } from "../../redux/reducers/userSlice";
import { validateDepartment, validatePasswordEmpty, validateEmail, validatePhone, validatePosition, validateSamePassword, validateUsername } from "../../validation/SignupValidation";
import { PAGE } from "../pageConstants";

function Signup() {
    const { register, handleSubmit, formState, getValues } = useForm();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorTitle, setErrorTitle] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { errors } = formState
    function checkError(data, validator) {
        const response = validator(data);
        if (response.status) {
            return response.message;
        } return true;
    }
    function checkPasswordMatch(data, validate) {
        const { password } = getValues();
        const response = validate(data, password);
        if (response.status) {
            return response.message;
        } return true;
    }
    function handleSignUpSubmit(data) {
        setLoading(true);
        const { username, email, phone, address, department, position, password } = data;
        signup(username, email, phone, address, department, position, password)
            .then(response => {
                if (response.status === 'success') {
                    console.log('user id', response.user.uid);
                    getUserById(response.user.uid).then(
                        userData => {

                            if (userData) {
                                console.log('userData', userData)
                                setUserDataToLocal(userData);
                                dispatch(addUser(userData));
                                setLoading(false);
                                navigate(PAGE.LINK.HOME); 
                            }else{
                                navigate(PAGE.LINK.SIGNUP);
                            }
                        }
                    )
                } else {
                    setError(true);
                    setErrorTitle(response.error.code);
                    setErrorMessage(response.error.message);
                }
            });
    }

    return (
        <Box
            sx={{
                padding: 0,
                margin: 0,
                width: '100%',
                height: '100%',
                overflow: 'scroll',
                display: 'flex',
                flexDirection: 'column',
                marginTop: '1rem',
                alignItems: 'center',
            }}
        >
            <ErrorAlert
                open={error}
                title={errorTitle}
                message={errorMessage}
            />
            <Container
                maxWidth={'sm'}
                sx={{
                    border: "none",
                    overflow: 'hidden',
                    padding: '1rem',
                }}
            >
                <form onSubmit={handleSubmit(handleSignUpSubmit)} noValidate>
                    <Stack
                        spacing={3}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <img src={YSELOGO} width={100} />
                        <Typography variant="h5" color={'primary.dark'}>
                            Signup
                        </Typography>
                        <TextField
                            error={!!errors.username}
                            fullWidth
                            defaultValue={''}
                            size="small"
                            label="Name"
                            type="text"
                            {...register("username", {
                                validate: { checkUsername: (v) => checkError(v, validateUsername) }
                            })}
                            helperText={errors.username ? errors.username.message : null}
                        />
                        <TextField
                            error={!!errors.email}
                            fullWidth
                            defaultValue={''}
                            size="small"
                            label="E-mail"
                            type="email"
                            {...register("email", {
                                validate: { checkEmail: (v) => checkError(v, validateEmail) }
                            })}
                            helperText={errors.email ? errors.email.message : null}
                        />
                        <TextField
                            error={!!errors.phone}
                            fullWidth
                            defaultValue={''}
                            size="small"
                            label="Phone"
                            type="text"
                            {...register("phone", {
                                validate: { checkPhone: (v) => checkError(v, validatePhone) }
                            })}
                            helperText={errors.phone ? errors.phone.message : null}

                        />
                        <TextField
                            fullWidth
                            defaultValue={''}
                            size="small"
                            label="Address"
                            multiline
                            rows={3}
                            type="text"
                            {...register("address")}
                        />
                        <Autocomplete
                            fullWidth
                            options={mockDepartment.map(dep => dep.name)}
                            size="small"
                            renderInput={(params) =>
                                <TextField
                                    {...params}
                                    error={!!errors.department}
                                    {...register("department", {
                                        validate: { checkDepartment: v => checkError(v, validateDepartment) }
                                    })}
                                    helperText={errors.department ? errors.department.message : null}
                                    label="Department"
                                    color="primary"
                                />}
                        />
                        <Autocomplete
                            fullWidth
                            id="position"
                            options={mockPosition.map(pos => pos.name)}
                            size="small"
                            renderInput={(params) =>
                                <TextField
                                    {...params}
                                    error={!!errors.position}
                                    {...register("position", {
                                        validate: { checkPosition: v => checkError(v, validatePosition) }
                                    })}
                                    helperText={errors.position ? errors.position.message : null}
                                    label="Position"
                                    color="primary"
                                />}
                        />
                        <TextField
                            error={!!errors.password}
                            fullWidth
                            defaultValue={''}
                            id="password"
                            name="password"
                            size="small"
                            label="Password"
                            type="password"
                            {...register("password", {
                                validate: { checkPassword: v => checkError(v, validatePasswordEmpty) }
                            })}
                            helperText={errors.password ? errors.password.message : null}
                        />
                        <TextField
                            error={!!errors.cpassword}
                            fullWidth
                            defaultValue={''}
                            id="confirm-password"
                            name="confirm-password"
                            size="small"
                            label="Confirm Password"
                            type="password"
                            {...register("cpassword", {
                                validate: {
                                    checkPassword: v => checkError(v, validatePasswordEmpty),
                                    checkPasswordSame: v => checkPasswordMatch(v, validateSamePassword),
                                }
                            })}
                            helperText={errors.cpassword ? errors.cpassword.message : null}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{
                                width: '100%',
                            }}
                        >
                            Signup
                        </Button>
                        <Typography>
                            Already have an account?
                            <Link to={PAGE.LINK.SIGNIN}
                                style={{
                                    textDecoration: 'none',
                                }}
                            >
                                Sign In
                            </Link>
                        </Typography>
                    </Stack>
                </form>
            </Container>
            <OverlayLoading open={loading} />
        </Box>
    )
}
export default Signup;