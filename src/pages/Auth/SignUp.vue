<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import { inject, reactive, ref } from 'vue';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';

const router = useRouter();
const $q = useQuasar();
const api = inject('api');
let inProgress = ref(false);

const user = reactive({
  username: '',
  password: '',
});
function validate() {
  user.username = user.username.trim().toString();
}

const signinUser = async () => {
  try {
    inProgress.value = true; // show loading icon on button while submiting
    validate(); // trim username and convert all alphabet to lower case

    let req = await fetch(`${api}/api/auth/login`, {
      method: 'POST',
      body: JSON.stringify(user),
    });

    let res = await req.json();

    if (res.status) {
      $q.localStorage.setItem('authorisation-key', res.auth_key);
      return router.push('/');
    } else {
      $q.notify({
        message: 'Signin unsuccessfull',
        caption: res.msg,
        icon: 'report_problem',
        color: 'warning',
      });
    }
    inProgress.value = false;
    return false;
  } catch (error: any) {
    $q.notify({
      message: 'Error occured signin in',
      caption: error,
      icon: 'report_problem',
      color: 'red-9',
    });
    inProgress.value = false;
    return false;
  }
};
</script>
<template>
  <div class="fullscreen row items-center justify-center">
    <q-card id="main" square>
      <q-card-section>
        <div class="text-h4 text-center text-uppercase">Signin here</div>
      </q-card-section>
      <q-card-section>
        <q-form class="q-gutter-md" autocomplete="off" @submit="signinUser()">
          <q-input
            label="Username"
            standout
            v-model="user.username"
            color="accent"
          />

          <q-input
            type="password"
            label="Password"
            standout
            v-model="user.password"
            color="accent"
          />
          <q-btn class="" :loading="inProgress" type="submit"
            >Login to Management</q-btn
          >
        </q-form>
      </q-card-section>
    </q-card>
  </div>
</template>

<style scoped lang="scss">
#main {
  max-width: 400px;
  width: 100%;
}
</style>
