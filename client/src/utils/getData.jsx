import {
    collection,
    doc,
    getDoc,
    getDocs,
    setDoc,
    addDoc,
    deleteDoc,
    updateDoc,
    query,
    where,
} from 'firebase/firestore';
import { db, sendPasswordResetEmail, registerWithEmailPassword } from '../firebase';
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
        console.error(error);
    }
};

export const getUserBoats = async (uid) => {
    try {
        const boatsQuery = query(collection(db, 'boats'), where('client', '==', uid));
        const boatsSnap = await getDocs(boatsQuery);

        const userBoats = boatsSnap.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

        AppStore.update((s) => {
            s.userBoats = userBoats;
        });
    } catch (error) {
        console.error('Error fetching user boats:', error);
    }
};

export const getUserServices = async (uid) => {
    try {
        const servicesQuery = query(collection(db, 'services'), where('client', '==', uid));
        const servicesSnap = await getDocs(servicesQuery);

        const userServices = servicesSnap.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

        AppStore.update((s) => {
            s.userServices = userServices;
        });
    } catch (error) {
        console.error('Error fetching user services:', error);
    }
};

export const addToCollection = async (collectionName, data) => {
    try {
        console.log('collectionName', collectionName);
        if (collectionName === 'clients') {
            const dummyPassword = 'temporaryPassword!';
            try {
                // Create user in Firebase Authentication
                const userCredential = await registerWithEmailPassword(data.email, dummyPassword);

                if (userCredential) {
                    // Prepare data for Firestore without sensitive password data
                    const clientData = {
                        ...data,
                        uid: userCredential.uid, // Ensure that uid is stored
                    };

                    // Use the UID from Auth as the document ID in Firestore
                    const docRef = doc(db, collectionName, userCredential.uid);

                    // Set client data in Firestore using the same UID
                    await setDoc(docRef, clientData);

                    // Trigger a password reset email to allow the user to set their password
                    await sendPasswordResetEmail(data.email);

                    // Update local store if necessary
                    AppStore.update((s) => {
                        s[collectionName].push(clientData);
                    });

                    console.log('Client created and password reset email sent.');

                    //Update boats collection

                    const addedBoats = data.boat;
                    for (const boatId of addedBoats) {
                        const boatDocRef = doc(db, 'boats', boatId);
                        const boatDoc = await getDoc(boatDocRef);
                        if (boatDoc.exists()) {
                            const boatData = boatDoc.data();
                            if (boatData.client !== clientData.uid) {
                                await updateDoc(boatDocRef, { client: clientData.uid });
                            }

                            //locally update boats
                            AppStore.update((s) => {
                                const boatIndex = s.boats.findIndex((boat) => boat.id === boatId);
                                if (boatIndex !== -1) {
                                    s.boats[boatIndex].client = clientData.uid;
                                }
                            });
                        }
                    }

                    return docRef;
                }
            } catch (e) {
                console.error('Error adding client:', e);
                throw e;
            }
        } else if (collectionName === 'services' && data.boat) {
            const docRef = doc(collection(db, collectionName));

            await setDoc(docRef, data);

            // Update local store
            AppStore.update((s) => {
                s.services.push({ ...data, id: docRef.id });
            });
        } else {
            // For other collections
            const docRef = await addDoc(collection(db, collectionName), data);
            AppStore.update((s) => {
                s[collectionName].push({ ...data, id: docRef.id, lastAdded: true });
            });
            if (collectionName === 'boats' && data.client) {
                await updateBoatOwnership(data.client, docRef.id);
            }
            console.log('Document written with ID: ', docRef.id);
            return docRef;
        }
    } catch (e) {
        console.error('Error adding document: ', e);
        throw e;
    }
};

export const editInCollection = async (collectionName, docId, data) => {
    try {
        const docRef = doc(db, collectionName, docId);
        const currentDoc = await getDoc(docRef);
        const currentData = currentDoc.data();

        await updateDoc(docRef, data);

        if (collectionName === 'clients') {
            const client = AppStore.getRawState().clients.find((client) => client.uid === docId);
            const previousBoats = client?.boat || [];
            console.log('previousBoats', previousBoats);

            // Handle added boats
            const addedBoats = data.boat?.filter((boatId) => !previousBoats.includes(boatId)) || [];
            console.log('addedBoats', addedBoats);
            for (const boatId of addedBoats) {
                const boatDocRef = doc(db, 'boats', boatId);
                const boatDoc = await getDoc(boatDocRef);
                if (boatDoc.exists()) {
                    const boatData = boatDoc.data();
                    if (boatData.client !== docId) {
                        await updateDoc(boatDocRef, { client: docId });
                    }

                    //locally update boats
                    AppStore.update((s) => {
                        const boatIndex = s.boats.findIndex((boat) => boat.id === boatId);
                        if (boatIndex !== -1) {
                            s.boats[boatIndex].client = docId;
                        }
                    });
                }
            }

            // Handle removed boats
            const removedBoats = previousBoats.filter((boatId) => !data.boat?.includes(boatId));
            console.log('removedBoats', removedBoats);
            for (const boatId of removedBoats) {
                const boatDocRef = doc(db, 'boats', boatId);
                const boatDoc = await getDoc(boatDocRef);
                if (boatDoc.exists()) {
                    const boatData = boatDoc.data();
                    if (boatData.client === docId) {
                        await updateDoc(boatDocRef, { client: null });
                    }

                    //locally update removed boats
                    AppStore.update((s) => {
                        const boatIndex = s.boats.findIndex((boat) => boat.id === boatId);
                        if (boatIndex !== -1) {
                            s.boats[boatIndex].client = null;
                        }
                    });
                }
            }
        }

        AppStore.update((s) => {
            let index;
            if (collectionName === 'clients') {
                index = s[collectionName].findIndex((item) => item.uid === docId);
            } else {
                index = s[collectionName].findIndex((item) => item.id === docId);
            }
            if (index !== -1) {
                s[collectionName][index] = {
                    ...s[collectionName][index],
                    ...data,
                    lastAdded: true,
                };
            }
        });

        if (collectionName === 'boats' && data.client) {
            console.log('updating ownership');
            console.log('data.client', data.client);

            const oldClientId = currentData.client;
            console.log('oldClientId', oldClientId);

            if (oldClientId && oldClientId !== data.client) {
                console.log('data.client', data.client);
                const oldClientDocRef = doc(db, 'clients', oldClientId);
                const oldClientDoc = await getDoc(oldClientDocRef);
                const oldClientBoats = oldClientDoc.data().boat || [];

                const updatedBoats = oldClientBoats.filter((boatId) => boatId !== docId);
                await updateDoc(oldClientDocRef, { boat: updatedBoats });

                AppStore.update((s) => {
                    const oldClientIndex = s.clients.findIndex(
                        (client) => client.uid === oldClientId
                    );
                    if (oldClientIndex !== -1) {
                        s.clients[oldClientIndex].boat = updatedBoats;
                    }
                });
            }

            await updateBoatOwnership(data.client, docId);
        }

        console.log('Document updated with ID: ', docId);
    } catch (e) {
        console.error('Error updating document: ', e);
        throw e;
    }
};

export const updateBoatOwnership = async (clientId, boatId) => {
    console.log('updating2');
    console.log('clientId', clientId);
    console.log('boatId', boatId);
    const clientRef = doc(db, 'clients', clientId);
    const clientDoc = await getDoc(clientRef);

    try {
        if (clientDoc.exists()) {
            const clientData = clientDoc.data();
            let boatArray = clientData.boat || [];
            if (!boatArray.includes(boatId)) {
                boatArray.push(boatId);
                await updateDoc(clientRef, {
                    boat: boatArray,
                });
                console.log('Boat added to client array successfully');

                // Update local AppStore state
                AppStore.update((s) => {
                    const index = s.clients.findIndex((client) => client.uid === clientId);
                    if (index !== -1) {
                        s.clients[index].boat = boatArray;
                    }
                });
            } else {
                console.log("Boat ID already exists in the client's boat array");
            }
        } else {
            console.log('Client not found with the given ID:', clientId);
        }
    } catch (e) {
        console.error('Error updating client boat array:', e);
        throw e;
    }
};

export const deleteFromCollection = async (collectionName, docId, store) => {
    console.log('deleting');
    const docRef = doc(db, collectionName, docId);

    if (collectionName === 'services') {
        // const serviceDoc = await getDoc(docRef);
        // const boatId = serviceDoc.data().boat;
    }

    if (collectionName === 'clients') {
        const clientDoc = await getDoc(docRef);
        const boatIds = clientDoc.data().boat;

        if (boatIds && boatIds.length > 0) {
            const updatePromises = boatIds.map((boatId) => {
                const boatDocRef = doc(db, 'boats', boatId);

                if (store) {
                    store.update((s) => {
                        const boatIndex = s.boats.findIndex((boat) => boat.id === boatId);
                        if (boatIndex !== -1) {
                            s.boats[boatIndex].client = null;
                        }
                    });
                }

                return updateDoc(boatDocRef, { client: null });
            });

            await Promise.all(updatePromises);
        }
    }

    if (collectionName === 'boats') {
        const boatDoc = await getDoc(docRef);
        const clientId = boatDoc.data().client;

        if (clientId) {
            const clientDocRef = doc(db, 'clients', clientId);
            const clientDoc = await getDoc(clientDocRef);
            const currentBoats = clientDoc.data().boat || [];

            const updatedBoats = currentBoats.filter((boatId) => boatId !== docId);

            await updateDoc(clientDocRef, { boat: updatedBoats });

            if (store) {
                store.update((s) => {
                    const clientIndex = s.clients.findIndex((client) => client.uid === clientId);
                    if (clientIndex !== -1) {
                        s.clients[clientIndex].boat = updatedBoats;
                    }
                });
            }
        }
    }

    await deleteDoc(docRef);

    if (store) {
        store.update((s) => {
            let updatedData;
            if (collectionName === 'clients') {
                updatedData = s[collectionName].filter((item) => item.uid !== docId);
            } else {
                updatedData = s[collectionName].filter((item) => item.id !== docId);
                console.log('updatedData', updatedData);
            }
            return { ...s, [collectionName]: updatedData };
        });
    }
};

export const deleteFromSubCollection = async (
    collectionName,
    subCollectionName,
    docId,
    boatId,
    store
) => {
    const serviceSubDocRef = doc(db, collectionName, boatId, subCollectionName, docId);
    await deleteDoc(serviceSubDocRef);

    if (store) {
        store.update((s) => {
            const updatedBoats = s.boats.map((boat) => {
                if (boat.id === boatId) {
                    const updatedServices = boat.services.filter(
                        (serviceId) => serviceId !== docId
                    );
                    return { ...boat, services: updatedServices };
                }
                return boat;
            });
            return { ...s, boats: updatedBoats };
        });
    }
};

export const getServiceTemplates = async () => {
    try {
        const serviceTemplateRef = collection(db, 'serviceTemplates');
        const serviceTemplateSnapshot = await getDocs(serviceTemplateRef);

        if (!serviceTemplateSnapshot.empty) {
            const serviceTemplateArray = serviceTemplateSnapshot.docs
                .map((doc) => {
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
        AppStore.update((s) => {
            s.serviceTemplates = [];
        });
    }
};

export const getClients = async () => {
    try {
        const clientsRef = collection(db, 'clients');
        const clientsSnapshot = await getDocs(clientsRef);

        if (!clientsSnapshot.empty) {
            const clientsArray = clientsSnapshot.docs
                .map((doc) => {
                    const data = doc.data();
                    return data ? { uid: doc.id, ...data } : null;
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
        AppStore.update((s) => {
            s.serviceTemplates = [];
        });
    }
};

export const getBoats = async () => {
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
        AppStore.update((s) => {
            s.serviceTemplates = [];
        });
    }
};

export const getServices = async () => {
    try {
        const servicesRef = collection(db, 'services');
        const servicesSnapshot = await getDocs(servicesRef);

        if (!servicesSnapshot.empty) {
            const servicesArray = servicesSnapshot.docs
                .map((doc) => {
                    const data = doc.data();
                    return data ? { id: doc.id, ...data } : null;
                })
                .filter((item) => item !== null);

            AppStore.update((s) => {
                s.services = servicesArray;
            });
        } else {
            console.warn('No boats found');
            AppStore.update((s) => {
                s.services = [];
            });
        }
    } catch (error) {
        console.error('getServiceTemplates error', error);
        AppStore.update((s) => {
            s.serviceTemplates = [];
        });
    }
};

export const addUserToDataBase = (userInfo, password) => {
    const auth = getAuth();

    createUserWithEmailAndPassword(auth, userInfo.email, password)
        .then((userCredential) => {
            return db.doc('users', userInfo.uid).set(userInfo);
        })
        .then(() => {
            console.log('User added successfully in both Firebase Auth and Database');
        })
        .catch((error) => {
            console.error('Error adding user:', error);
        });
};

export const getClientNameById = (clientId, clients) => {
    const client = clients.find((c) => c.uid === clientId);
    return client ? client.name : '';
};

export const getBoatNameById = (boatId, boats) => {
    const boat = boats.find((b) => b.id === boatId);
    return boat ? boat.boatName : '';
};

export const handleRowClick = (rowData, rowMeta, collection, collectionString) => {
    const item = collection[rowMeta.dataIndex];
    AppStore.update((s) => {
        s.individualData = {
            collection: collectionString,
            id: item.id || item.uid,
        };
    });
};

export const closeIndividualData = () => {
    AppStore.update((s) => {
        s.individualData = {
            collection: '',
            id: '',
        };
    });
};
