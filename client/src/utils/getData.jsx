import {
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    setDoc,
    addDoc,
    deleteDoc,
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

export const addToCollection = async (collectionName, data) => {
    try {
        const docRef = await addDoc(collection(db, collectionName), data);
        console.log('Document written with ID: ', docRef.id);
        return docRef;
    } catch (e) {
        console.error('Error adding document: ', e);
        throw e;
    }
};

export const deleteFromCollection = async (collectionName, docId, store, clientId) => {
    const docRef = doc(db, collectionName, docId);
    await deleteDoc(docRef);

    // if (collectionName === 'boats') {
    //     const clientRef = doc(db, 'clients', clientId);
    // }
    console.log('store', store);

    if (store) {
        console.log('store', store);
        store.update((s) => {
            const updatedData = s[collectionName].filter((item) => item.id !== docId);
            return { ...s, [collectionName]: updatedData };
        });
    }
};

export const getServiceTemplates = async () => {
    console.log('firing getservicetemplates');
    try {
        const serviceTemplateRef = collection(db, 'serviceTemplates');
        const serviceTemplateSnapshot = await getDocs(serviceTemplateRef);

        if (!serviceTemplateSnapshot.empty) {
            const serviceTemplateArray = serviceTemplateSnapshot.docs
                .map((doc) => {
                    // Ensure each document has data before mapping
                    const data = doc.data();
                    return data ? { id: doc.id, ...data } : null;
                })
                .filter((item) => item !== null);

            AppStore.update((s) => {
                s.serviceTemplates = serviceTemplateArray;
            });
        } else {
            console.warn('No service templates found');
            AppStore.update((s) => {
                s.serviceTemplates = [];
            });
        }
    } catch (error) {
        console.error('getServiceTemplates error', error);
        // Optionally, update the store to reflect the error state
        AppStore.update((s) => {
            s.serviceTemplates = [];
        });
    }
};

export const getClients = async () => {
    console.log('firing getclients');
    try {
        const clientsRef = collection(db, 'clients');
        const clientsSnapshot = await getDocs(clientsRef);

        if (!clientsSnapshot.empty) {
            const clientsArray = clientsSnapshot.docs
                .map((doc) => {
                    const data = doc.data();
                    return data ? { id: doc.id, ...data } : null;
                })
                .filter((item) => item !== null);

            AppStore.update((s) => {
                s.clients = clientsArray;
            });
        } else {
            console.warn('No clients found');
            AppStore.update((s) => {
                s.clients = [];
            });
        }
    } catch (error) {
        console.error('getServiceTemplates error', error);
        // Optionally, update the store to reflect the error state
        AppStore.update((s) => {
            s.serviceTemplates = [];
        });
    }
};

export const getBoats = async () => {
    console.log('firing getboats');
    try {
        const boatsRef = collection(db, 'boats');
        const boatsSnapshot = await getDocs(boatsRef);

        if (!boatsSnapshot.empty) {
            const boatssArray = boatsSnapshot.docs
                .map((doc) => {
                    const data = doc.data();
                    return data ? { id: doc.id, ...data } : null;
                })
                .filter((item) => item !== null);

            AppStore.update((s) => {
                s.boats = boatssArray;
            });
        } else {
            console.warn('No boats found');
            AppStore.update((s) => {
                s.boats = [];
            });
        }
    } catch (error) {
        console.error('getServiceTemplates error', error);
        // Optionally, update the store to reflect the error state
        AppStore.update((s) => {
            s.serviceTemplates = [];
        });
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
                const data = doc.data();
                const id = doc.id;
                serviceArray.push({ ...data, id });
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
            // const uid = userCredential.user.uid;
            return db.doc('users', userInfo.uid).set(userInfo);
        })
        .then(() => {
            console.log('User added successfully in both Firebase Auth and Database');
        })
        .catch((error) => {
            console.error('Error adding user:', error);
        });
};
