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

const signinUser = async () => {
  try {
    inProgress.value = true;

    let req = await fetch(`${api}/auth/`, {
      method: 'POST',

      body: JSON.stringify(user),

      headers: {
        'Content-Type': 'application/json',
      },
    });

    let res = await req.json();

    if (res.success) {
      $q.cookies.set('adminAuthKey', res.token, {
        path: '/',
        expires: '12h',
        secure: true,
      });

      return router.push('/');
    } else {
      $q.notify({
        message: res.msg,
        textColor: 'red-13',
        icon: 'report_problem',
        iconColor: 'red-13',
        color: 'red-3',
      });
    }

    inProgress.value = false;

    return false;
  } catch (error: any) {
    console.log(error);

    $q.notify({
      message: error.message,
      textColor: 'red-13',
      icon: 'report_problem',
      iconColor: 'red-13',
      color: 'red-3',
      timeout: 3000,
    });

    inProgress.value = false;

    return false;
  }
};
</script>
<template>
  <div class="fullscreen row items-center justify-center">
    <q-card id="main" square flat>
      <q-card-section>
        <div class="text-h4 text-center text-uppercase">Signin here</div>
      </q-card-section>
      <q-card-section>
        <q-form class="q-gutter-md" autocomplete="off" @submit="signinUser()">
          <q-input
            label="Username"
            standout
            v-model="user.username"
            class="tw-px-2"
            :rules="[(val) => val !== '' || 'field cannot be blank']"
          />

          <q-input
            type="password"
            label="Password"
            required
            standout
            v-model="user.password"
            class="tw-px-2"
            :rules="[
              (val) =>
                val.length > 6 || 'password must be 6 or more characters long',
            ]"
          />
          <q-btn class="" color="accent" :loading="inProgress" type="submit"
            >Login</q-btn
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
