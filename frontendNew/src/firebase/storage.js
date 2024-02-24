import { deleteObject, getDownloadURL as getStorageDownloadURL, ref, uploadBytes, getStorage, listAll } from 'firebase/storage';
import { storage } from './firebase';

const BUCKET_URL = "gs://city-quest-e49fc.appspot.com";


export async function uploadImage(image, uid) {
    const dateFormat = new Date().getTime();
    const bucket = `${BUCKET_URL}/${uid}/${dateFormat}.jpg`;
    const storageRef = ref(storage, bucket);
    await uploadBytes(storageRef, image);
    return bucket;
}

export async function listAllImages(uid) {
    const bucket = BUCKET_URL + "/" + uid;
    return await listAll(ref(storage, BUCKET_URL));
}

export async function getDownloadURL(bucket) {
    return await getDownloadURL(ref(storage, bucket));
}