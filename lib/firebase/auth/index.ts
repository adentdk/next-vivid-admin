"use client";

import {
  getAuth,
  GoogleAuthProvider,
  type NextOrObserver,
  onAuthStateChanged as _onAuthStateChanged,
  signInWithCustomToken as _signInWithCustomToken,
  signInWithEmailAndPassword as _signInWithEmailAndPassword,
  signInWithPopup,
  type User,
} from "firebase/auth";

import firebaseApp from "../index";

const auth = getAuth(firebaseApp);

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();

  const credential = await signInWithPopup(auth, provider);

  return credential.user.getIdToken(true);
}

export async function signInWithEmailAndPassword(
  email: string,
  password: string,
) {
  const credential = await _signInWithEmailAndPassword(auth, email, password);

  return credential.user.getIdToken(true);
}

export async function signInWithCustomTokenProvider(customToken: string) {
  return _signInWithCustomToken(auth, customToken);
}

export function onAuthStateChanged(cb: NextOrObserver<User>) {
  return _onAuthStateChanged(auth, cb);
}
