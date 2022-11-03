import { app } from "../config";
import * as authFirebase from 'firebase/auth'

export const auth = authFirebase.getAuth(app)
authFirebase.connectAuthEmulator(auth, 'http://localhost/', 9099)

export function logInWithEmailandPassword(data) {
    console.log(data)
    authFirebase.signInWithEmailAndPassword(auth, data.email, data.password)
    .then((userCredential) => {
        const user = userCredential.user
        console.log(user)
    })
    .catch((error) => {
        console.log(error)
        throw new Error(error.code)
    })
}

export function logOut() {
    return authFirebase.signOut(auth)
}

export function anonimusUser() {
    authFirebase.signInAnonymously(auth)
    .then(() => {
        return {
            id: 0,
            username: 'Anominus'
        }
     })
      .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ...
  });

}

export function CreateuserwithEandP(data) {
    authFirebase.createUserWithEmailAndPassword(auth, data.email, data.password)
    .then((result) => {
        return result.user
    })
    .catch((error) => {
        throw new Error(error.code)
    })
}

