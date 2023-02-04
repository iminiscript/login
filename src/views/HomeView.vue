<template>
	<main class="login">
		<div v-if="(loginStore.user === false)">
		<section class="forms">
			<form  class="login" @submit.prevent="loginForm">
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

		</section>
		</div>
	</main>
</template>

<script setup>
import { ref , onMounted } from 'vue';
import { useLoginStore } from '@/stores/index.js';


const loginStore = useLoginStore();

onMounted(() => {
	loginStore.fetchUser();
})

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
