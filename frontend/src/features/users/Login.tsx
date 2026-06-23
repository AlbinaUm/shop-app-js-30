import React, {useState} from 'react';
import type {LoginMutation} from "../../types";
import {Alert, Avatar, Box, Button, Container, Grid, TextField, Typography} from "@mui/material";
import LockOpenIcon from '@mui/icons-material/LockOpen';
import {Link, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectLoginError} from "./usersSelectors.ts";
import {googleLogin, login} from "./usersThunks.ts";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import {GoogleLogin} from "@react-oauth/google";
import { toast } from "react-toastify";

const Login = () => {
    const dispatch = useAppDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const error = useAppSelector(selectLoginError);
    const navigate = useNavigate();
    const [form, setForm] = useState<LoginMutation>({
        username: '',
        password: '',
    });

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setForm(prevState => ({...prevState, [name]: value}));
    };

    const onSubmitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await dispatch(login(form)).unwrap();
            navigate('/');
        } catch (e) {
            console.log(e)
        }
    };

    const googleLoginHandler = async (credential: string) => {
        await dispatch(googleLogin(credential)).unwrap();
        navigate('/');
    };


    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOpenIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>

                {error && (<Alert severity='error' sx={{mt: 3, width: '100%'}}>
                    {error.error}
                </Alert>)}

                <Box component="form" noValidate onSubmit={onSubmitHandler} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid size={12}>
                            <TextField
                                autoComplete="given-name"
                                name="username"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                autoFocus
                                value={form.username}
                                onChange={onInputChange}
                            />
                        </Grid>
                        <Grid  size={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                autoComplete="new-password"
                                value={form.password}
                                onChange={onInputChange}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowPassword(prev => !prev)}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </Button>
                    <Box sx={{pt: 2, width: '100%'}}>
                        <GoogleLogin
                            width='100%'
                            size='large'
                            onSuccess={(credentialResponse) => {
                                if (credentialResponse.credential) {
                                    googleLoginHandler(credentialResponse.credential);
                                }
                            }}
                            onError={() => toast.error('Google login failed')}
                        />
                    </Box>
                    <Grid container justifyContent="flex-end">
                        <Grid>
                            <Link to='/register'>
                               Or sing up
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default Login;