<template>
	<main class="login">
		<p>{{ loginStore.countdown }}</p>
		<div v-if="(loginStore.user === false)">
		<section class="forms">
			<div v-if="loginInput & !forgotPass ">

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
					value="Login" />
			</form>
				<span @click="signup">Don't have account? Sign Up</span>
				<span @click="forgot">Forget your password?</span>
			</div>
			<div v-if="!loginInput">
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
						value="Register" />
				</form>
				<span @click="signup">Have account? Login Btn</span>
			</div>
			<div v-if="forgotPass"  class="hide forgetpass">
				<form  class="forgotPass" @submit.prevent="forgetForm">
				<input 
						type="email" 
						placeholder="Email address"
						v-model="forget_form.email" />
						<input 
						type="submit" 
						value="Register" />
					</form>
			</div>
		</section>
		</div>
	</main>
</template>

<script setup>
import { ref , onMounted, onUpdated } from 'vue';
import { useLoginStore } from '@/stores/index.js';

const loginInput = ref(true);
const forgotPass = ref(false);


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
	loginInput.value = !loginInput.value
}

const forgot = () => {
	forgotPass.value = !forgotPass.value
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
	color: green;
}
.signup {
	color: orange;
}
</style>
