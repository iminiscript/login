<template>
    <div>
        <form  class="class" @submit.prevent="loginForm">
				<h2>{{ title }}</h2>
				<input 
					type="email" 
					placeholder="Email address"
					v-model="loginForm.email" />
				<input 
					type="password" 
					placeholder="Password" 
					v-model="loginForm.password" />
				<input 
					type="submit"
					class="btn" 
					value="Login" />
			</form>
    </div>
</template>

<script setup>
import { stringify } from 'querystring';

defineProps({
  class: String, 
  title: String,
  formName: Object,
});

</script>

<style lang="scss" scoped>

</style>