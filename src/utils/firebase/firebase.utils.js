import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
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

  const provider = new GoogleAuthProvider();

  provider.setCustomParameters({
    prompt: "select_account"
  });

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
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
          createdAt
        });

      } catch (error) {
        console.log('error creating the user', error.message);
      }
    } 

    return userDocRef;
    
}