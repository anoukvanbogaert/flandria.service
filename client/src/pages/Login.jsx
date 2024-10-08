import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    signInWithGooglePopup,
    handleEmailLogin,
    sendPasswordResetEmail,
    registerWithEmailPassword,
} from '../firebase';
import { getAuth } from 'firebase/auth';
import LoadingButton from '@mui/lab/LoadingButton';
import Logo from '../assets/images/logo1.png';
import googleLogo from '../assets/images/google-icon.webp';
import { Container, Box, Typography, TextField, Button, Link, Alert, Divider } from '@mui/material';
import { getSetUserDoc } from '../utils/getData';
import { useStoreState } from 'pullstate';
import { AppStore } from '../stores/AppStore';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);
    const [error, setError] = useState('');
    const [info, setInfo] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { userDoc } = useStoreState(AppStore);

    const handleAction = async (event) => {
        event.preventDefault();
        setError('');
        setLoading(true);
        try {
            if (isSignUp) {
                await registerWithEmailPassword(email, password);
            } else {
                await handleEmailLogin(email, password);
            }

            const fbUser = getAuth().currentUser;
            const userDoc = await getSetUserDoc(fbUser);

            if (userDoc?.superAdmin) {
                navigate('/admin');
            } else {
                navigate('/home');
            }
        } catch (error) {
            console.error('Login error:', error);
            setInfo('');
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const toggleForm = () => {
        setIsSignUp(!isSignUp);
        setError('');
    };

    const handleForgotPassword = async () => {
        if (!email) {
            setError('');
            setInfo('Please enter your email address to reset your password.');
            return;
        }
        try {
            const functionMessage = await sendPasswordResetEmail(email);
            if (functionMessage === true) {
                setError('');
                setInfo('Password reset email sent. Please check your inbox.');
            } else {
                setInfo('');
                setError(functionMessage);
            }
        } catch (error) {
            setInfo('');
            setError('An error occurred while sending the password reset email. Please try again.');
        }
    };

    return (
        <Container
            component='main'
            sx={{
                backgroundColor: '#032433',
                minWidth: '100vw',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Box
                component='img'
                src={Logo}
                alt='Flandria Yachts'
                sx={{
                    width: { xs: '10rem', sm: '15rem' },
                    height: 'auto',
                    margin: { xs: '2rem 0', sm: '4rem 0' },
                }}
            />
            <Box
                sx={{
                    maxWidth: '500px',
                    width: '100%',
                    display: 'flex',

                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    padding: { xs: 4, sm: 4 },
                    margin: '1rem',
                    borderRadius: '10px',
                    boxShadow: 3,
                    bgcolor: 'background.paper',
                }}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        handleAction(e);
                    }
                }}
            >
                <Typography
                    component='h1'
                    variant='h5'
                    fontWeight={'bold'}
                    sx={{
                        fontSize: { xs: '1.5rem', sm: '2rem' },
                        color: 'primary.main',
                        marginBottom: { xs: '2rem', sm: '2rem' },
                    }}
                >
                    {isSignUp ? 'Sign Up' : 'Log In to My Flandria'}
                </Typography>
                {error && (
                    <Alert severity='error' sx={{ width: '100%', mb: 2, animation: 'bounce 0.5s' }}>
                        {error}
                    </Alert>
                )}
                {info && (
                    <Alert severity='info' sx={{ width: '100%', mb: 2, animation: 'bounce 0.5s' }}>
                        {info}
                    </Alert>
                )}

                {!isSignUp && (
                    <Button
                        onClick={() =>
                            signInWithGooglePopup()
                                .then((user) => {
                                    if (user.uid === 'mXz2zFCHHSbOcvTx7PzMGW7aCD03') {
                                        navigate('/admin');
                                    } else {
                                        navigate('/home');
                                    }
                                })
                                .catch((error) => console.error('Login error:', error))
                        }
                        fullWidth
                        variant='outlined'
                        sx={{ py: 1.5, borderRadius: '50px' }}
                    >
                        <img
                            src={googleLogo}
                            alt='Flandria Yachts'
                            style={{
                                width: 'auto',
                                height: '38px',
                                marginRight: '0.5rem',
                            }}
                        />
                        <Typography
                            variant='body'
                            fontWeight={'800'}
                            fontSize={'16px'}
                            textTransform={'uppercase'}
                            margin={0}
                        >
                            Continue with Google
                        </Typography>
                    </Button>
                )}
                <Box sx={{ width: '100%' }}>
                    {!isSignUp && <Divider sx={{ m: '2rem 0' }}></Divider>}
                    <Typography
                        // component='h1'
                        variant='body'
                        fontWeight={'bold'}
                        margin={0}
                    >
                        Email
                    </Typography>

                    <TextField
                        margin='normal'
                        required
                        fullWidth
                        id='email'
                        placeholder='Email Address'
                        name='email'
                        autoComplete='email'
                        autoFocus
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        variant='outlined'
                        sx={{ marginBottom: '1rem', marginTop: '0.5rem', minWidth: '100%' }}
                    />
                    <Typography
                        // component='h1'
                        variant='body'
                        fontWeight={'bold'}
                        margin={0}
                    >
                        Password
                    </Typography>
                    <TextField
                        id='password'
                        variant='outlined'
                        sx={{ mb: 1, width: '100%', marginTop: '0.5rem' }}
                        fullWidth
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {!isSignUp && (
                        <Link
                            component='button'
                            variant='body2'
                            onClick={handleForgotPassword}
                            sx={{ width: '1', textAlign: 'end' }}
                        >
                            Forgot password?
                        </Link>
                    )}
                    <LoadingButton
                        onClick={handleAction}
                        loading={loading}
                        fullWidth
                        variant='contained'
                        color='primary'
                        sx={{
                            mb: 2,
                            marginTop: '1.5rem',
                            padding: '17px 15px',
                            borderRadius: '50px',
                            fontSize: '16px',
                            fontWeight: 'bold',
                        }}
                    >
                        {isSignUp ? 'Sign Up' : 'Log In'}
                    </LoadingButton>

                    <Link
                        component='button'
                        variant='body2'
                        onClick={toggleForm}
                        sx={{ mt: 2, width: '1', textAlign: 'end' }}
                    >
                        {isSignUp
                            ? 'Already have an account? Log In'
                            : "Don't have an account? Sign Up"}
                    </Link>
                </Box>
            </Box>
        </Container>
    );
};

export default Login;
