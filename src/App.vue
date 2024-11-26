<template>
  <router-view />
</template>

<script setup lang="ts">
import { onMounted, provide } from 'vue';
import { configureTheme } from './composables/theme';
import { useProductStore } from './stores/Products';
defineOptions({
  name: 'App'
});

const backend_url = process.env.DEV ? 'http://127.0.0.1:3000/api': 'https://sales-api-server.vercel.app/api'
provide('api', backend_url)


onMounted(()=>{
  configureTheme()

})
</script>
