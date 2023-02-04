import { defineStore } from 'pinia';
import router from '../router';

import { auth } from '../firebase/firebase';

import { 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut 
  } from 'firebase/auth';


  export const useLoginStore = defineStore({
    id: 'loginStore',
    state: () => ({
        user: null
    }),
    actions: {
        async login(email, password) {
            try {
                await signInWithEmailAndPassword(auth, email, password)
              } catch (error) {
                switch(error.code) {
                  case 'auth/user-not-found':
                    alert("User not found")
                    break
                  case 'auth/wrong-password':
                    alert("Wrong password")
                    break
                  default:
                    alert("Something went wrong")
                }
        
                return
              }

              this.user = auth.currentUser;
        },

        async register (email, password){
            console.log(email, password);
            try {
                await createUserWithEmailAndPassword(auth, email, password)
              } catch (error) {
                switch(error.code) {
                  case 'auth/email-already-in-use':
                    alert("Email already in use")
                    break
                  case 'auth/invalid-email':
                    alert("Invalid email")
                    break
                  case 'auth/operation-not-allowed':
                    alert("Operation not allowed")
                    break
                  case 'auth/weak-password':
                    alert("Weak password")
                    break
                  default:
                    alert("Something went wrong")
                }
        
                return
              }

              this.user = auth.currentUser;
        }
    }
  })