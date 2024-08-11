import './App.scss';

import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Admin from './pages/Admin';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { AppStore } from './stores/AppStore';
import {
    getServices,
    getSetUserDoc,
    getServiceTemplates,
    getClients,
    getBoats,
    getUserBoats,
    getUserServices,
} from './utils/getData';
import Login from './pages/Login';
import { useStoreState } from 'pullstate';

function App() {
    const [user, setUser] = useState(null);
    const { userDoc } = useStoreState(AppStore);

    const theme = createTheme({
        breakpoints: {
            values: {
                xs: 0,
                sm: 600,
                md: 900,
                lg: 1200,
                xl: 1536,
            },
        },
        palette: {
            primary: {
                main: '#032433',
            },
            secondary: {
                main: '#045174',
            },
            tertiary: {
                main: '#ceeefd',
            },
            // text: {
            //     primary: '#333333',
            //     secondary: '#666666',
            // },
        },
        typography: {
            fontFamily: 'Open Sans, sans-serif',
            fontSize: 15,
            h1: {
                fontSize: '31px',
                lineHeight: '64px',
            },
            h2: {
                fontSize: '25px',
                lineHeight: '56px',
            },
            h3: {
                fontSize: '19px',
                lineHeight: '47px',
            },

            body1: {
                fontSize: '15px',
                lineHeight: '41px',
            },
        },

        // overrides: {
        //     MuiButton: {
        //         root: {
        //             fontSize: '1rem', // Default font size for buttons
        //             [theme.breakpoints.down('sm')]: {
        //                 fontSize: '0.875rem', // Smaller font size on mobile devices
        //             },
        //         },
        //     },
        // },
    });
    const root = document.documentElement;
    root.style.setProperty('--primary-color', theme.palette.primary.main);
    root.style.setProperty('--secondary-color', theme.palette.secondary.main);
    root.style.setProperty('--tertiary-color', theme.palette.tertiary.main);

    useEffect(() => {
        onAuthStateChanged(getAuth(), async (fbUser) => {
            if (fbUser) {
                setUser(fbUser);
                AppStore.update((s) => {
                    s.user = fbUser;
                });
                const userDoc = getSetUserDoc(fbUser);
                if (userDoc && !userDoc.superAdmin) {
                    await getUserBoats(fbUser.uid);
                    await getUserServices(fbUser.uid);
                }
                getServices(fbUser);
                getServiceTemplates();
                getClients();
                getBoats();
            }
        });
    }, [user]);

    return (
        <main className='app'>
            <ThemeProvider theme={theme}>
                <Router>
                    <Routes>
                        <Route path='/login' element={<Login />} />
                        <Route
                            path='/home'
                            element={user ? <HomeWithNavbar /> : <Navigate to='/login' replace />}
                        />
                        <Route
                            path='/admin'
                            element={userDoc.superAdmin ? <AdminWithNavbar /> : <HomeWithNavbar />}
                        />
                        <Route
                            path='/'
                            element={<Navigate to={user ? '/home' : '/login'} replace />}
                        />
                        <Route
                            path='*'
                            element={<Navigate to={user ? '/home' : '/login'} replace />}
                        />
                    </Routes>
                </Router>
            </ThemeProvider>
        </main>
    );
}

const HomeWithNavbar = () => (
    <>
        <section className='nav-block'>
            <Navbar />
        </section>
        <section className='home-block'>
            <Home />
        </section>
    </>
);

const AdminWithNavbar = () => (
    <>
        <section className='nav-block'>
            <Navbar />
        </section>
        <section className='admin-block'>
            <Admin />
        </section>
    </>
);

export default App;
