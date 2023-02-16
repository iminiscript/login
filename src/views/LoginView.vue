<template>
	<main class="login">
		<div v-if="(loginStore.user === false)">
		<section class="forms">
			<div v-if="loginFormState">
                <form   class="login" @submit.prevent="loginForm">
                    <h2>Login</h2>
                    <input 
                        type="email" 
                        placeholder="Email address"
                        v-model="login_form.email" />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        v-model="login_form.password" />
                    <input 
                        type="submit"
                        class="btn" 
                        value="Login" />
                </form> 
                <div class="loginThird">
                    <button @click="loginStore.loginWithGoogle" class="btn-g">
                    <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="48px" height="48px"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/></svg>
                    Login With Google
                </button>
                </div>
                <div class="formsBottom">
                    <p @click="signup">Don't have account? Sign Up</p>
				    <p @click="forgot">Forget your password?</p>
                </div>
			</div>
			<div v-if="signupFormState">
				<form  class="register" @submit.prevent="registerForm">
					<h2>Register</h2>
					<input type="text"
						placeholder="Full Name"
						v-model="register_form.name" />
					<input 
						type="email" 
						placeholder="Email address"
						v-model="register_form.email" />
					<input 
						type="password" 
						placeholder="Password" 
						v-model="register_form.password" />
					<input 
						type="submit" 
						class="btn"
						value="Register" />
				</form>
                <div class="formsBottom">
                    <span @click="loginState">Have account? Login Btn</span>
                </div>
			</div>
			<div v-if="!loginFormState && !signupFormState"  class="hide forgetpass">
				<form  class="forgotPass" @submit.prevent="forgetForm">
				<input 
						type="email" 
						placeholder="Email address"
						v-model="forget_form.email" />
						<input 
						type="submit" 
						class="btn"
						value="Register" />
					</form>
                    <div class="formsBottom">
                        <p @click="loginState">Remeber account? Login?</p>
                    </div>
			</div>
		</section>
		</div>
	</main>
</template>

<script setup>
import { ref , onMounted, onUpdated } from 'vue';
import { useLoginStore } from '@/stores/index.js';

const loginFormState = ref(true);
const signupFormState = ref(false);
const forgotPassState = ref(false);


const loginStore = useLoginStore();

onMounted(() => {
	loginStore.fetchUser();
	
	// if (loginStore.user !== false) {
	// 	loginStore.countTimer();
	// }
});
onUpdated(() => {
	//loginStore.verification();

});

const login_form = ref({
  email: '',
  password: '',

});
const forget_form = ref({
  email: '',

});
const register_form = ref({
  email: '',
  password: '',
  name: '',
});

const signup = () => {
	signupFormState.value = true;
    loginFormState.value = false;
}

const forgot = () => {
	loginFormState.value = false;
    signupFormState.value = false;
}

const loginState = () => {
    loginFormState.value = true;
    signupFormState.value = false;
}

const registerForm = () => {
  loginStore.register(register_form.value.email, register_form.value.password, register_form.value.name);
  console.log('This is fired');
}

const loginForm = () => {
  loginStore.login(login_form.value.email, login_form.value.password);
  console.log('This is fired');
};

const forgetForm = () => {
	loginStore.passwordReset(forget_form.value.email);
	console.log(forget_form.value.email);
}


</script>

<style scoped>
form {
	margin-bottom: 40px;
}
.login {
	color: navy;
}
.signup {
	color: orange;
}

.formsBottom {
    margin: 50px 0 0 0;
}

h2 {
    text-align: center;
    padding: 30px;
    font-weight: 800;
}
.loginThird {
    padding-left: 10px;
}
</style>
