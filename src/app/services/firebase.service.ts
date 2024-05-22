import { Injectable, inject } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
  User as FirebaseUser,
} from 'firebase/auth';
import { User } from '../models/user.model';
import {
  getFirestore,
  setDoc,
  doc,
  getDoc,
  addDoc,
  collection,
  collectionData,
  query,
  updateDoc,
  deleteDoc,
} from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  getStorage,
  uploadString,
  ref,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  auth = inject(AngularFireAuth);

  firestore = inject(AngularFirestore);

  signIn(user: User) {
    return signInWithEmailAndPassword(getAuth(), user.email, user.password);
  }

  signUp(user: User) {
    return createUserWithEmailAndPassword(getAuth(), user.email, user.password);
  }

  updateProfile(displayName: string) {
    return updateProfile(getAuth().currentUser, { displayName });
  }

  setDocument(collection: string, data: any) {
    return setDoc(doc(getFirestore(), collection), data);
  }

  resetPassword(email: string) {
    return sendPasswordResetEmail(getAuth(), email);
  }

  async getUserData(uid: string): Promise<any> {
    const userDoc = await getDoc(doc(getFirestore(), 'users', uid));
    if (userDoc.exists()) {
      return userDoc.data();
    } else {
      throw new Error('No such user!');
    }
  }

  getCollectionData(path: string, collectionQuery?: any) {
    const ref = collection(getFirestore(), path);

    return collectionData(ref, ...collectionQuery), { idField: 'id' };
  }

  updateDocument(path: string, data: any) {
    return updateDoc(doc(getFirestore(), path), data);
  }

  deleteDocument(path: string) {
    return deleteDoc(doc(getFirestore(), path));
  }

  async getDocument(path: string) {
    return (await getDoc(doc(getFirestore(), path))).data();
  }

  addDocument(path: string, data: any) {
    return addDoc(collection(getFirestore(), path), data);
  }

  async uploadImage(path: string, data_url: string) {
    return uploadString(ref(getStorage(), path), data_url, 'data_url').then(
      () => {
        return getDownloadURL(ref(getStorage(), path));
      }
    );
  }

  async getFilePath(path: string) {
    return ref(getStorage(), path).fullPath;
  }

  deleteFile(path: string) {
    return deleteObject(ref(getStorage(), path));
  }
}
