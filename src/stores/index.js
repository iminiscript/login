import { defineStore } from 'pinia';
import router from '../router';

import { auth } from '../firebase/firebase';

import { 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut, setPersistence, browserSessionPersistence, browserLocalPersistence
  } from 'firebase/auth';


  export const useLoginStore = defineStore({
    id: 'loginStore',
    state: () => ({
        user: false,
        countdown: 20,
        intervalId: null
    }),
    actions: {
        async login(email, password) {
            try {
                await setPersistence(auth,browserSessionPersistence);
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
        },

        async logout() {
          await signOut(auth);
          this.user = false;
          console.log('user Logged out');
        },

         countTimer() {
          this.intervalId = setInterval(() => {
            this.countdown--;
            if (this.countdown === 0) {
                clearInterval(this.intervalId);
                 signOut(auth);
            }
          }, 1000);
        }, 

        fetchUser() {
          auth.onAuthStateChanged( user => {
            if (user === null) {
              this.user = false;
              console.log('Null')
            } else {
              this.user = user;
              console.log(user)
            }
          })
        }
    }
  })