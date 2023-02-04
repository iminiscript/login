<template>
	<main class="login">
		<section class="forms">

			<form class="register" @submit.prevent="registerForm">
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

			<form class="login" @submit.prevent="loginForm">
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

		</section>
	</main>
</template>

<script setup>
import { ref } from 'vue';
import { useLoginStore } from '@/stores/index.js';

const loginStore = useLoginStore();


const login_form = ref({
  email: '',
  password: '',
});
const register_form = ref({
  email: '',
  password: '',
});

const registerForm = () => {
  loginStore.register(register_form.value.email, register_form.value.password);
  console.log('This is fired');
}

const loginForm = () => {
  loginStore.login(login_form.value.email, login_form.value.password);
  console.log('This is fired');
};


</script>

<style lang="scss" scoped>

</style>
