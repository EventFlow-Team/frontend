import { STORAGE } from "../firebase/firebaseConfig";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";

export const uploadImage = async (uri, path) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    const storageRef = ref(STORAGE, `${path}/${Date.now()}`);
    const snapshot = await uploadBytes(storageRef, blob);

    return await getDownloadURL(snapshot.ref);
};
