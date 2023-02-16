import { defineStore } from 'pinia';
import router from '../router';

import { auth } from '../firebase/firebase';

import { 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut, setPersistence,
     browserSessionPersistence, 
     browserLocalPersistence, 
     updateProfile, 
     sendEmailVerification,
     sendPasswordResetEmail, 
     signInWithPopup, GoogleAuthProvider
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
                await signInWithEmailAndPassword(auth, email, password);
                
               
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
        async register (email, password, name){
            console.log(email, password, name);
            try {
                await createUserWithEmailAndPassword(auth, email, password);
                await updateProfile(auth.currentUser, { displayName: name });
                await sendEmailVerification(auth.currentUser);
                
              } catch (error) {
                console.log('Registration error:', error)
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

        async loginWithGoogle() {
          try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider );
             // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
          }catch(error) {
            console.log(error);
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.customData.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
          }
        },

        async logout() {
          await signOut(auth);
          this.user = false;
          console.log('user Logged out');
        },

        async emailVerification() {
          await sendEmailVerification(auth.currentUser);
          console.log(`${auth.currentUser} EMail has been sent`);
        }, 

        // async verification() {
        //   console.log(this.user);
        //   await sendEmailVerification(this.user); 
        //    console.log(`Email send to  ${auth.currentUser.displayName}` );
          
        // },

    

        //  countTimer() {
        //   this.intervalId = setInterval(() => {
        //     this.countdown--;
        //     if (this.countdown === 0) {
        //         clearInterval(this.intervalId);
        //          signOut(auth);
        //     }
        //   }, 1000);
        // }, 

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
        },

       async passwordReset(email) {
          await sendPasswordResetEmail(auth, email);
        }
    }
  })