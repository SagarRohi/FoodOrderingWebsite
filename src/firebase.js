import {getApp,getApps,initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';
import {getAuth,signInWithPopup,GoogleAuthProvider,signOut} from 'firebase/auth';
import {REACT_APP_FIREBAE_API_KEY,REACT_APP_FIREBAE_APP_ID,REACT_APP_FIREBAE_AUTH_DOMAIN,REACT_APP_FIREBAE_DATABASE_URL,
REACT_APP_FIREBAE_MESSAGING_SENDER_ID,
REACT_APP_FIREBAE_PROJECT_ID,
REACT_APP_FIREBAE_STORAGE_BUCKET} from './config';
const firebaseConfig = {
    apiKey: REACT_APP_FIREBAE_API_KEY,
    authDomain:REACT_APP_FIREBAE_AUTH_DOMAIN,
    databaseURL: REACT_APP_FIREBAE_DATABASE_URL,
    projectId: REACT_APP_FIREBAE_PROJECT_ID,
    storageBucket: REACT_APP_FIREBAE_STORAGE_BUCKET,
    messagingSenderId: REACT_APP_FIREBAE_MESSAGING_SENDER_ID,
    appId: REACT_APP_FIREBAE_APP_ID
  };

  export {signInWithPopup,signOut};
  export const app=getApps().length>0?getApp():initializeApp(firebaseConfig);
  export const Provider=new GoogleAuthProvider();
  export const firestore=getFirestore(app);
  export const auth=getAuth(app);
  export const storage=getStorage(app);
  