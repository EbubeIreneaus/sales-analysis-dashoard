<script lang="ts" setup>
import { inject, reactive, ref } from 'vue';
import { useQuasar } from 'quasar';

const confirm = ref('');
const pass_error = ref(false);
const mismatch_error = ref(false);
const isUpdatingPassword = ref(false);
const form = ref<HTMLFormElement | null>(null);
const api = inject('api');
const $q = useQuasar();

const user = reactive({
  old_pass: '',
  password: '',
});

function validatePassword() {
  if (user.password === confirm.value) {
    return true;
  }

  mismatch_error.value = true;
  return false;
}

async function resetPassword() {
  if (!validatePassword()) {
    return false;
  }
  isUpdatingPassword.value = true;
  try {
    const res = await (
      await fetch(`${api}/api/auth/resetPassword`, {
        method: 'post',
        body: JSON.stringify(user),
        headers: {
          'auth-key': $q.localStorage.getItem('authorisation-key') || '',
        },
      })
    ).json();
    if (res.status) {
      $q.notify({
        iconColor: 'green-12',
        color: 'dark',
        message: 'updated successfully',
        icon: 'check',
        textColor: 'green-1',
      });
      (user.old_pass = ''), (user.password = ''), (confirm.value = '');
      return (isUpdatingPassword.value = false);
    }
    if (!res.status && res.code === 'password_missmatch') {
      isUpdatingPassword.value = false;
      return $q.notify({
        color: 'dark',
        icon: 'warning',
        iconColor: 'warning',
        message: 'your password is incorrect',
        textColor: 'warning',
      });
    }
    isUpdatingPassword.value = false;
    return $q.notify({
      color: 'dark',
      icon: 'error',
      iconColor: 'red-12',
      message: 'unknown error',
      textColor: 'red-1',
    });
  } catch (error) {
    isUpdatingPassword.value = false;
    return $q.notify({
      color: 'dark',
      icon: 'error',
      iconColor: 'red-12',
      message: 'unknown error',
      textColor: 'red-1',
    });
  }
}
</script>

<template>
  <div class="tw-min-h-[400px] tw-max-w-md">
    <form @submit.prevent="resetPassword" ref="form">
      <q-input
        type="password"
        v-model="user.old_pass"
        label="Current password"
        standout="bg-dark"
        class="tw-mb-4"
        :error="pass_error"
        error-message="incorrect password"
        required
        minLength="6"
      />
      <q-input
        type="password"
        v-model="user.password"
        label="New password"
        standout="bg-dark"
        class="tw-mb-4"
        required
        minlength="6"
      />
      <q-input
        type="password"
        v-model="confirm"
        label="Confirm password"
        standout="bg-dark"
        class="tw-mb-6"
        :error="mismatch_error ? true : false"
        error-message="password mismatch"
        required
        @focus="() => (mismatch_error = false)"
        minlength="6"
      />

      <q-btn
        label="update pasword"
        class="tw-px-12 tw-py-2.5 bg-accent"
        type="submit"
        :loading="isUpdatingPassword ? true : false"
      />
    </form>
  </div>
</template>
