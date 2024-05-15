import {
    collection,
    doc,
    getDoc,
    getDocs,
    setDoc,
    addDoc,
    deleteDoc,
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

export const addToCollection = async (collectionName, data) => {
    console.log('collectionName', collectionName);

    try {
        let docRef;
        if (collectionName === 'services' && data.boat) {
            // Create a document reference with a new ID in the main services collection
            docRef = doc(collection(db, collectionName));
            // Use the same ID to add the document to the boats' subcollection
            const boatServicesRef = doc(db, 'boats', data.boat, 'services', docRef.id);
            await setDoc(boatServicesRef, data);
            await setDoc(docRef, data); // Set the document in the main services collection with the same ID

            AppStore.update((s) => {
                const boatIndex = s.boats.findIndex((boat) => boat.id === data.boat);
                if (boatIndex !== -1) {
                    if (!s.boats[boatIndex].services) {
                        s.boats[boatIndex].services = [];
                    }
                    s.boats[boatIndex].services.push({ ...data, id: docRef.id });
                }
                s.services.push({ ...data, id: docRef.id });
            });
        } else {
            // For other collections like boats
            docRef = await addDoc(collection(db, collectionName), data);
            AppStore.update((s) => {
                s[collectionName].push({ ...data, id: docRef.id, lastAdded: true });
            });
            if (collectionName === 'boats') {
                await updateBoatOwnership(data.client, docRef.id);
            }
        }
        console.log('Document written with ID: ', docRef.id);
        return docRef;
    } catch (e) {
        console.error('Error adding document: ', e);
        throw e;
    }
};

export const editInCollection = async (collectionName, docId, data) => {
    try {
        const docRef = doc(db, collectionName, docId);
        await updateDoc(docRef, data);
        AppStore.update((s) => {
            const index = s[collectionName].findIndex((item) => item.id === docId);
            if (index !== -1) {
                s[collectionName][index] = {
                    ...s[collectionName][index],
                    ...data,
                    lastAdded: true,
                };
            }
        });
        if (collectionName === 'boats') {
            await updateBoatOwnership(data.client, docId);
        }

        console.log('Document updated with ID: ', docId);
    } catch (e) {
        console.error('Error updating document: ', e);
        throw e;
    }
};

export const updateBoatOwnership = async (clientId, boatId) => {
    const clientRef = doc(db, 'clients', clientId);
    const clientDoc = await getDoc(clientRef);

    try {
        if (clientDoc.exists()) {
            const clientData = clientDoc.data();
            // Check if 'boat' field exists and is an array
            let boatArray = clientData.boat || [];
            // Check if boatId is not already in the array to avoid duplicates
            if (!boatArray.includes(boatId)) {
                boatArray.push(boatId);
                await updateDoc(clientRef, {
                    boat: boatArray,
                });
                console.log('Boat added to client array successfully');

                // Update local AppStore state
                AppStore.update((s) => {
                    const index = s.clients.findIndex((client) => client.id === clientId);
                    if (index !== -1) {
                        s.clients[index].boat = boatArray; // Directly assign the new array
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
    const docRef = doc(db, collectionName, docId);

    if (collectionName === 'services') {
        const serviceDoc = await getDoc(docRef);
        const boatId = serviceDoc.data().boat;
        if (boatId) {
            await deleteFromSubCollection('boats', 'services', docId, boatId, store);
        }
    }
    await deleteDoc(docRef);

    if (store) {
        store.update((s) => {
            const updatedData = s[collectionName].filter((item) => item.id !== docId);
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

export const getServices = async () => {
    console.log('firing getServices');

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
        // Optionally, update the store to reflect the error state
        AppStore.update((s) => {
            s.serviceTemplates = [];
        });
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
