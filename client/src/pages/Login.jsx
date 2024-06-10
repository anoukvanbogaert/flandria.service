import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    signInWithGooglePopup,
    handleEmailLogin,
    sendPasswordResetEmail,
    registerWithEmailPassword,
} from '../firebase';
import Logo from '../assets/images/logo1.png';
import { Container, Box, Typography, TextField, Button, Link, Alert } from '@mui/material';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);
    const [error, setError] = useState('');
    const [info, setInfo] = useState('');
    const navigate = useNavigate();

    const handleAction = async (event) => {
        event.preventDefault();
        setError('');
        try {
            if (isSignUp) {
                await registerWithEmailPassword(email, password);
            } else {
                await handleEmailLogin(email, password);
            }
            navigate('/admin' || '/home');
        } catch (error) {
            console.error('Login error:', error);
            setInfo('');
            setError('An error occurred. Please try again.');
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
            <img
                src={Logo}
                alt='Flandria Yachts'
                style={{ width: 360, height: 'auto', margin: '4rem 0' }}
            />
            <Box
                sx={{
                    maxWidth: '768px',
                    width: '100%',
                    display: 'flex',

                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    padding: 4,
                    borderRadius: 2,
                    boxShadow: 3,
                    bgcolor: 'background.paper',
                }}
            >
                <Typography component='h1' variant='h5' marginBottom={3}>
                    {isSignUp ? 'Sign Up' : 'Sign In'}
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
                <Box sx={{ mt: 1, width: '100%' }}>
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
                        sx={{ mb: '1rem', minWidth: '100%' }}
                    />
                    <TextField
                        id='password'
                        variant='outlined'
                        sx={{ mb: 1, width: '100%' }}
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
                            onClick={handleForgotPassword} // Changed to call handleForgotPassword
                            sx={{ mb: 2, width: '1', textAlign: 'end' }}
                        >
                            Forgot password?
                        </Link>
                    )}
                    <Button
                        onClick={handleAction}
                        fullWidth
                        variant='contained'
                        color='primary'
                        sx={{ mb: 2, py: 1.5 }}
                    >
                        {isSignUp ? 'Sign Up' : 'Sign In with Email'}
                    </Button>
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
                            sx={{ py: 1.5 }}
                        >
                            Login with Google
                        </Button>
                    )}
                    <Link
                        component='button'
                        variant='body2'
                        onClick={toggleForm}
                        sx={{ mt: 2, width: '1', textAlign: 'end' }}
                    >
                        {isSignUp
                            ? 'Already have an account? Sign In'
                            : "Don't have an account? Sign Up"}
                    </Link>
                </Box>
            </Box>
        </Container>
    );
};

export default Login;
