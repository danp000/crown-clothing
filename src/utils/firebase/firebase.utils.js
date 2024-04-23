import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, signInWithEmailAndPassword,
         GoogleAuthProvider, createUserWithEmailAndPassword, signOut, onAuthStateChanged }
       from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBOgQicxFE9B9xquM_M438ndxqRNXRv0cY",
    authDomain: "react-ztm-crown-clothing-f58ab.firebaseapp.com",
    projectId: "react-ztm-crown-clothing-f58ab",
    storageBucket: "react-ztm-crown-clothing-f58ab.appspot.com",
    messagingSenderId: "813492946528",
    appId: "1:813492946528:web:4a0bd8d325ad1d326a6505"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const googleProvider = new GoogleAuthProvider();

  googleProvider.setCustomParameters({
    prompt: "select_account"
  });

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
  if (!userAuth) return;
    const userDocRef = doc(db, 'users', userAuth.uid);

    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);

    console.log(userSnapshot);
    console.log(userSnapshot.exists());

    // if user data exists
    if (!userSnapshot.exists()) {
      const { displayName, email } = userAuth;
      const createdAt = new Date(); 

      try {
        await setDoc(userDocRef, {
          displayName,
          email,
          createdAt,
          ...additionalInformation
        });

      } catch (error) {
        console.log('error creating the user', error.message);
      }
    } 

    return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);

}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);