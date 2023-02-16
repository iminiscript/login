<script setup>
import { RouterLink, RouterView } from 'vue-router';
import { ref } from 'vue';
import { useLoginStore } from '@/stores/index.js';


const loginStore = useLoginStore();

</script>

<template>
  <header>
   
      
        <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/login">Login</RouterLink>
      </nav>
      <div v-if="(loginStore.user !== false)" class="profile">
        <p class="user"> Hello {{  loginStore.user.displayName }}</p>
        <button class="btn" @click="loginStore.logout">LogOut</button>
      </div>
  
    
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
  justify-content: space-between;
}

.profile {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
  width: 500px;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

.user {
  text-transform: uppercase;
  font-weight: 800;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {

  padding: 0 1rem;
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;

  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
