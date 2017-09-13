import firebase from "firebase";
import firebaseui from "firebaseui";

export const config = {
  apiKey: "AIzaSyB1MoFTzbDy5xnIVH4lYMFlXPUBpNYPXbo",
  authDomain: "cyanosleuth.firebaseapp.com",
  databaseURL: "https://cyanosleuth.firebaseio.com",
  projectId: "cyanosleuth",
  storageBucket: "",
  messagingSenderId: "412457256673"
};

export const uiConfig = {
  signInSuccessUrl: "app.cyanosleuth.com/home",
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID
  ]
};

const AUTH_KEY = "AUTH_KEY";

export const firebaseApp = firebase.initializeApp(config);

export const db = firebase.database();

export const auth = firebase.auth();

export const ui = new firebaseui.auth.AuthUI(auth);

export const isAuthenticated = () =>
  Boolean(auth.currentUser) || Boolean(localstorage.getItem(AUTH_KEY));
