import {
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    setDoc,
    where,
    updateDoc,
    or,
} from 'firebase/firestore';
import { db } from '../firebase';
import { AppStore } from '../stores/AppStore';

export const getOverview = async () => {
    try {
        const overviewQuery = query(collection(db, 'overview'));
        const querySnapshot = await getDocs(overviewQuery);

        const overviewArray = [];

        for (const doc of querySnapshot.docs) {
            const overviewSnap = doc.data();
            const overviewName = overviewSnap.service;

            overviewArray.push({ ...doc.data(), service: overviewName });
        }

        AppStore.update((s) => {
            s.overview = overviewArray;
        });
    } catch (error) {
        // Handle error here
        console.error(error);
    }
};
