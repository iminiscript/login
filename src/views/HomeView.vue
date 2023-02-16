<template>
	<h1>Home Page</h1>
	<p v-if="loginStore.user">Welcome {{  loginStore.user.displayName }}</p>
	<div v-if="loginStore.user.emailVerified === false">
		<p>Your Account hasn't been verified, 
			<span class="verifyLink" @click="loginStore.emailVerification">Click here</span> 
		to send a verification Email</p>
	</div>
	<div v-if="loginStore.user.emailVerified && loginStore.user"><p>Congratulations, Your Account is verified!</p></div>
</template>

<script setup>
import { ref } from 'vue';
import { useLoginStore } from '@/stores/index.js';


const loginStore = useLoginStore();


</script>

<style scoped>
p {
	text-transform: capitalize;
}
.verifyLink {
	color: blue;
	font-weight: 800;
	cursor: pointer;
}
</style>
