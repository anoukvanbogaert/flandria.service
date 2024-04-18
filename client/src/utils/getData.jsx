import {
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    setDoc,
    where,
    updateDoc,
} from 'firebase/firestore';
import { db } from '../firebase';
import { AppStore } from '../stores/AppStore';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

export const getSetUserDoc = async (user) => {
    try {
        const docRef = doc(db, 'clients', user.uid);
        const docSnap = await getDoc(docRef);

        let userDoc;

        if (docSnap.exists()) {
            const data = docSnap.data();
            const id = docSnap.id;
            userDoc = { ...data, id };
        } else {
            const userData = {
                name: user.displayName,
                email: user.email,
                photoUrl: user.photoURL,
            };

            await setDoc(docRef, userData);
            userDoc = userData;
        }

        AppStore.update((s) => {
            s.user = user;
            s.userDoc = userDoc;
        });
    } catch (error) {
        // Handle error here
        console.error(error);
    }
};

export const getServices = async (user) => {
    console.log('firing getServices');

    try {
        const serviceRef = collection(db, 'clients', user.uid, 'services');
        const activeServiceRef = query(serviceRef);
        const activeSubSnap = await getDocs(activeServiceRef);
        const serviceArray = [];
        // console.log('activeSubSnap', activeSubSnap);
        if (activeSubSnap.docs.length > 0) {
            // console.log('active subscriptions found');
            activeSubSnap.docs.forEach((doc) => {
                console.log('still going');
                const data = doc.data();
                const id = doc.id;
                serviceArray.push({ ...data, id });
                console.log('serviceArray', serviceArray);
            });

            AppStore.update((s) => {
                s.userDoc = {
                    ...s.userDoc,
                    services: serviceArray,
                };
            });
        } else {
            // console.log('no active subscriptions found');
            AppStore.update((s) => {
                s.userDoc = {
                    ...s.userDoc,
                    services: [],
                };
            });
        }
    } catch (error) {
        // Handle error here
        console.error('getServices error', error);
    }
};

export const addUserToDataBase = (userInfo, password) => {
    const auth = getAuth();

    createUserWithEmailAndPassword(auth, userInfo.email, password)
        .then((userCredential) => {
            // User created successfully in Firebase Auth, now add user info to Firebase Database
            const uid = userCredential.user.uid;
            return db.doc('users', userInfo.uid).set(userInfo);
        })
        .then(() => {
            console.log('User added successfully in both Firebase Auth and Database');
        })
        .catch((error) => {
            console.error('Error adding user:', error);
        });
};
