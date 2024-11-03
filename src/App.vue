<template>
  <router-view />
</template>

<script setup lang="ts">
import { onMounted, provide } from 'vue';
import { configureTheme } from './composables/theme';
defineOptions({
  name: 'App'
});

const backend_url = process.env.DEV ? 'http://127.0.0.1:8000': ''
provide('api', backend_url)

onMounted(()=>{
  configureTheme()
})
</script>
