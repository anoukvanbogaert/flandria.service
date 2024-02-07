import './App.scss';

import { React } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Admin from './components/Admin';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { AppStore } from './stores/AppStore';
// import { useStoreState } from 'pullstate';
// import { AppStore } from './stores/AppStore';
import { getServices, getSetUserDoc } from './utils/getData';

import Login from './pages/Login';

function App() {
    // const { userDoc, drawerWidth, appBarHeight } = useStoreState(AppStore);
    const [user, setUser] = useState(null);

    useEffect(() => {
        onAuthStateChanged(getAuth(), async (fbUser) => {
            console.log('fbUser', fbUser);
            if (fbUser) {
                setUser(fbUser);
                AppStore.update((s) => {
                    s.user = fbUser;
                });
                //gets available plans from firestore and sets them in the store
                getSetUserDoc(fbUser);
                getServices(fbUser);
                console.log('getting overview');
            }
            //small delay just to show the loading screen
            //can be removed if we don't want to show the loading screen
        });
    }, [user]);
    return (
        <main className='App'>
            <Router>
                <Routes>
                    {/* {user && ( */}
                    <Route
                        path='/home'
                        element={
                            <>
                                <section className='nav-block'>
                                    <Navbar />
                                </section>
                                <section className='home-block'>
                                    <Home />
                                </section>
                            </>
                        }
                    />
                    {/* )} */}

                    <Route
                        path='/admin'
                        element={
                            <>
                                <section className='nav-block'>
                                    <Navbar />
                                </section>
                                <section className='admin-block'>
                                    <Admin />
                                </section>
                            </>
                        }
                    />
                    <Route path='/login' element={<Login user={user} />} />
                </Routes>
            </Router>
        </main>
    );
}

export default App;
