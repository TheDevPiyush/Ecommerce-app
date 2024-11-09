import React from 'react'
import { firestore } from '../firebase'
import { doc, getDoc } from 'firebase/firestore';
export default async function FetchUserData(uid) {

    if (!uid) {
        console.error("User ID is required to fetch user data.");
        return null;
    }

    const userDocRef = doc(firestore, 'Users', uid);
    try {
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
            return userDoc.data();
        } else {
            console.log("No such document!");
            return null;
        }
    } catch (error) {
        console.error("Error fetching user data:", error);
        return null;
    }
}
