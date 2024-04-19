import './App.scss';

import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Admin from './components/Admin';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { AppStore } from './stores/AppStore';
import {
    getServices,
    getSetUserDoc,
    getServiceTemplates,
    getClients,
    getBoats,
} from './utils/getData';
import Login from './pages/Login';
import { useStoreState } from 'pullstate';

function App() {
    const [user, setUser] = useState(null);
    const { userDoc } = useStoreState(AppStore);

    useEffect(() => {
        onAuthStateChanged(getAuth(), async (fbUser) => {
            if (fbUser) {
                setUser(fbUser);
                console.log('user', userDoc);
                AppStore.update((s) => {
                    s.user = fbUser;
                });
                getSetUserDoc(fbUser);
                getServices(fbUser);
                getServiceTemplates();
                getClients();
                getBoats();
            }
        });
    }, [user]);

    return (
        <main className='App'>
            <Router>
                <Routes>
                    <Route path='/login' element={<Login />} />
                    <Route
                        path='/home'
                        element={user ? <HomeWithNavbar /> : <Navigate to='/login' replace />}
                    />
                    <Route
                        path='/admin'
                        element={
                            userDoc.superAdmin ? (
                                <AdminWithNavbar />
                            ) : (
                                <Navigate to='/login' replace />
                            )
                        }
                    />
                    <Route path='/' element={<Navigate to={user ? '/home' : '/login'} replace />} />
                    <Route path='*' element={<Navigate to={user ? '/home' : '/login'} replace />} />
                </Routes>
            </Router>
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
