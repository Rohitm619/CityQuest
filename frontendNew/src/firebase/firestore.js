import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, orderBy, query, setDoc, where } from 'firebase/firestore'; 
import { db } from './firebase';
import { getDownloadURL } from './storage';

const SOCIETY_COLLECTION = 'society_details';
const USER_COLLECTION = 'user_details';

export function insertSociety(societyDetails) {
    addDoc(collection(db, SOCIETY_COLLECTION), societyDetails);
    console.log("Society inserted");
}

export function insertUserDetails(userDetails) {
    addDoc(collection(db, USER_COLLECTION), userDetails);
}

export async function getSocietyDetailsByUID(uid) {
    const q = query(collection(db, USER_COLLECTION), where("chairman_id", "==", uid))
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.length > 0 ? querySnapshot.docs[0].data() : null;
}

export async function getUserDetails(uid) {
    const q = query(collection(db, USER_COLLECTION), where("user_id", "==",uid))
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.length > 0 ? querySnapshot.docs[0].data() : null;
}



