// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js';
import {
  collection,
  getFirestore,
  addDoc,
  onSnapshot,
  doc,
  setDoc,
} from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js';
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
} from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js';
import {
  getFunctions,
  httpsCallable,
} from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-functions.js';

import { setupGuides, setupUI } from './index.js';

// Your web app's Firebase configuration
const firebaseConfig = {
  // add your own Firebase credentials here.
  apiKey: '',
  authDomain: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const database = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const functions = getFunctions(firebaseApp);

// add admin cloud function
const adminForm = document.querySelector('.admin-actions');
const addAdminRole = httpsCallable(functions, 'addAdminRole');
adminForm.addEventListener('submit', (e) => {
  e.preventDefault();
  addAdminRole({ email: adminForm['admin-email'].value })
    .then((result) => {
      console.log(result);
      adminForm['admin-email'].value = '';
    })
    .catch((err) => {
      console.log(err.message);
    });
});

// listen for auth status changes (video 8)
// listen for database changes (onSnapshot, video 13 / error correction "catch" video 15)
// check on custom claims (video 20)
onAuthStateChanged(auth, (user) => {
  if (user) {
    user.getIdTokenResult().then((idTokenResult) => {
      user.admin = idTokenResult.claims.admin;
      setupUI(user);
    });
    // get data
    const colRef = collection(database, 'guides');
    onSnapshot(
      colRef,
      (snapshot) => {
        setupGuides(snapshot.docs);
      },
      (err) => {
        console.log(err.message);
      }
    );
  } else {
    // No user logged in: we don't pass any data to the setupGuides function
    setupGuides([]);
    // hide non-loggedin items
    setupUI();
  }
});

// Create new guide (video 12)
const createForm = document.querySelector('#create-form');
createForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = createForm['title'].value;
  const content = createForm['content'].value;

  const colRef = collection(database, 'guides');
  addDoc(colRef, {
    title,
    content,
  })
    .then(() => {
      // close the create modal & reset form
      const modal = document.querySelector('#modal-create');
      M.Modal.getInstance(modal).close();
      createForm.reset();
    })
    .catch((err) => {
      console.log(err.message);
    });
});

// Signup user (video 5)
// Create user document for new user (video 15)
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // get user info
  const email = signupForm['signup-email'].value;
  const password = signupForm['signup-password'].value;

  // signup the user
  createUserWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      // create user document (video 15)
      // This is different from Shaun's approach in the video
      // yet it is a working approach and I used it in other projects

      // First we create a reference to the user document (the user id still is cred.user.uid)
      // 'setDoc' will create a new document if it doesn't exist with the bio data
      const userDocRef = doc(collection(database, 'users'), cred.user.uid);
      return setDoc(userDocRef, {
        bio: signupForm['signup-bio'].value,
      });
    })
    .then(() => {
      const modal = document.querySelector('#modal-signup');
      M.Modal.getInstance(modal).close();
      signupForm.reset();
      // remove any error messages (see 'catch' phrase below)
      signupForm.querySelector('.error').innerHTML = '';
    })
    // catch errors at signup (video 23)
    .catch((err) => {
      signupForm.querySelector('.error').innerHTML = err.message;
    });
});

// login user (video 7)
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = loginForm['login-email'].value;
  const password = loginForm['login-password'].value;

  signInWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      const modal = document.querySelector('#modal-login');
      M.Modal.getInstance(modal).close();
      // remove any error messages (see 'catch' phrase below)
      loginForm.querySelector('.error').innerHTML = '';
      loginForm.reset();
    })
    // catch errors at signup (video 23)
    .catch((err) => {
      loginForm.querySelector('.error').innerHTML = err.message;
    });
});

// Logout user (video 6)
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
  e.preventDefault();
  signOut(auth);
});
