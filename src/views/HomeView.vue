<template>
	<main class="login">
		<p>{{ loginStore.countdown }}</p>
		<div v-if="(loginStore.user === false)">
		<section class="forms">
			<div v-if="loginInput">

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
			</div>
			<div v-if="!loginInput">
				<form  class="register" @submit.prevent="registerForm">
					<h2>Register</h2>
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
		</section>
		</div>
	</main>
</template>

<script setup>
import { ref , onMounted } from 'vue';
import { useLoginStore } from '@/stores/index.js';

const loginInput = ref(true);


const loginStore = useLoginStore();

onMounted(() => {
	loginStore.fetchUser();
	if (loginStore.user !== false) {
		loginStore.countTimer();
	}
});

const login_form = ref({
  email: '',
  password: '',
});
const register_form = ref({
  email: '',
  password: '',
});

const signup = () => {
	loginInput.value = !loginInput.value
}

const registerForm = () => {
  loginStore.register(register_form.value.email, register_form.value.password);
  console.log('This is fired');
}

const loginForm = () => {
  loginStore.login(login_form.value.email, login_form.value.password);
  loginStore.countTimer();
  console.log('This is fired');
};


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
