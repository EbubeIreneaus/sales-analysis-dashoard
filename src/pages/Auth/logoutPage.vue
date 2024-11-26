<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';

const $q = useQuasar();
const router = useRouter();

if ($q.sessionStorage.hasItem('authorisation-key')) {
  $q.sessionStorage.removeItem('authorisation-key');
}
router.push('/auth/');
</script>

<template>
  <div></div>
</template>
