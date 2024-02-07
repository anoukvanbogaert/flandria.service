import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithGooglePopup, handleEmailLogin } from '../firebase';
import Logo from '../assets/images/logo1.png';
import { Container, Box, Typography, TextField, Button } from '@mui/material';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleEmailSignIn = async (event) => {
        event.preventDefault();
        try {
            const user = await handleEmailLogin(email, password);
            console.log(user);
            navigate('/home');
        } catch (error) {
            console.error('Login error:', error);
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
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 4,
                    paddingTop: 8,
                    paddingBottom: 8,
                    borderRadius: 2,
                    boxShadow: 3,
                    mt: '2rem',
                    bgcolor: 'background.paper',
                }}
            >
                <Typography component='h1' variant='h5' marginBottom={3}>
                    Sign in
                </Typography>
                <Box component='form' onSubmit={handleEmailSignIn} sx={{ mt: 1, width: '100%' }}>
                    <TextField
                        margin='normal'
                        required
                        fullWidth
                        id='email'
                        label='Email Address'
                        name='email'
                        autoComplete='email'
                        autoFocus
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        variant='outlined'
                        sx={{ mb: 2, minWidth: '100%' }}
                    />
                    <TextField
                        margin='normal'
                        required
                        fullWidth
                        name='password'
                        label='Password'
                        type='password'
                        id='password'
                        autoComplete='current-password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        variant='outlined'
                        sx={{ mb: 3 }}
                    />
                    <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        color='primary'
                        sx={{ mb: 2, py: 1.5 }}
                    >
                        Sign In with Email
                    </Button>
                    <Button
                        onClick={() =>
                            signInWithGooglePopup()
                                .then((user) => {
                                    console.log(user);
                                    navigate('/home');
                                })
                                .catch((error) => console.error('Login error:', error))
                        }
                        fullWidth
                        variant='outlined'
                        sx={{ py: 1.5 }}
                    >
                        Login with Google
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default Login;
