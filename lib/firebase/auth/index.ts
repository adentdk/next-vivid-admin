"use client";

import {
  getAuth,
  getIdToken as _getIdToken,
  GoogleAuthProvider,
  type NextOrObserver,
  onAuthStateChanged as _onAuthStateChanged,
  onIdTokenChanged as _onIdTokenChanged,
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

export async function signInWithCustomToken(customToken: string) {
  const credential = await _signInWithCustomToken(auth, customToken);

  return credential.user.getIdToken(true);
}

export async function getIdToken() {
  const currentUser = auth.currentUser;
  if (!currentUser) throw new Error("NoUser");
  return _getIdToken(currentUser, true);
}

export function onAuthStateChanged(cb: NextOrObserver<User>) {
  return _onAuthStateChanged(auth, cb);
}

export function onIdTokenChanged(
  cb: NextOrObserver<
    User & {
      accessToken: string;
    }
  >,
) {
  return _onIdTokenChanged(auth, cb as any);
}
