<script lang="ts" setup>
import { inject, ref, shallowRef, watch } from 'vue';
import { useObjectUrl } from '@vueuse/core';
import { Person } from 'src/types/UserTypes';
import { useQuasar } from 'quasar';

const props = defineProps<{ person: Person | null }>();
const user = ref<Person>({} as Person);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const file = shallowRef();
const img_prev = useObjectUrl(file);
const api = inject('api');
const isUpdatingUser = ref(false);
const isUpdatingImage = ref(false);
const $q = useQuasar();

watch(
  () => props.person,
  (person) => {
    user.value = person || ({} as Person);
  }
);

async function updateUserDetails() {
  isUpdatingUser.value = true;
  try {
    const res = await (
      await fetch(`${api}/api/auth/updateDetails`, {
        method: 'POST',
        body: JSON.stringify({
          first_name: user.value.first_name,
          last_name: user.value.last_name,
          email: user.value.email,
        }),
        headers: {
          'auth-key': $q.localStorage.getItem('authorisation-key') || '',
        },
      })
    ).json();
    if (res.status) {
      isUpdatingUser.value = false;
      return $q.notify({
        color: 'dark',
        icon: 'check',
        iconColor: 'green-12',
        message: 'saved successfull',
        textColor: 'green-1',
      });
    }

    isUpdatingUser.value = false;
    return $q.notify({
      color: 'dark',
      icon: 'error',
      iconColor: 'red-12',
      message: 'unknown error occured',
      textColor: 'red-1',
    });
  } catch (error) {
    isUpdatingUser.value = false;
    console.log(error);
    return $q.notify({
      color: 'dark',
      icon: 'error',
      iconColor: 'red-12',
      message: 'server error',
      textColor: 'red-1',
    });
  }
}

async function saveImage() {
  if (!file.value) {
    return false;
  }
  isUpdatingImage.value = true;
  const form = new FormData();
  form.append('profile_pics', file.value);

  try {
    const res = await (
      await fetch(`${api}/api/auth/updateProfilePics`, {
        method: 'post',
        body: form,
        headers: {
          // 'Content-Type': 'multipart/form-data',
          'auth-key': $q.localStorage.getItem('authorisation-key') || '',
        },
      })
    ).json();

    if (res.status) {
      $q.notify({
        color: 'dark',
        iconColor: 'green-12',
        message: 'save successfull',
        icon: 'check',
        textColor: 'green-1',
      });
      return (isUpdatingImage.value = false);
    }
    $q.notify({
      color: 'dark',
      iconColor: 'red-12',
      message: 'unknown error',
      icon: 'error',
      textColor: 'red-1',
    });
    return (isUpdatingImage.value = false);
  } catch (error) {
    console.log(error);
    $q.notify({
      color: 'dark',
      iconColor: 'red-12',
      message: 'unknown error',
      icon: 'error',
      textColor: 'red-1',
    });
    return (isUpdatingImage.value = false);
  }
}
</script>

<template>
  <section>
    <div class="tw-flex tw-flex-wrap items-center tw-gap-x-8 tw-gap-y-5 tw-mb-7">
      <div class="">
        <q-img
          :src="img_prev"
          v-if="img_prev"
          class="tw-h-[120px] tw-w-[120px] tw-rounded-lg tw-object-cover tw-object-center"
        />
        <q-img
          :src="api + '' + user.profile_pics || '/images/placeholder-1.png'"
          v-else
          class="tw-h-[120px] tw-w-[120px] tw-rounded-lg tw-object-cover tw-object-center"
        />
      </div>
      <div>
        <q-form @submit.prevent="saveImage">
          <q-file
            standout
            v-model="file"
            class="tw-w-[250px] tw-mb-2 tw-inline-block tw-me-5"
            display-value="Choose profile pics"
            accept=".jpg, .png"
            bg-color="dark-page"
            dense
            :loading="isUpdatingImage ? true : false"
          >
          </q-file>
          <q-btn
            label="save"
            type="submit"
            unelevated
            class="tw-inline-block tw-px-10 bg-accent"
          />
        </q-form>
        <div>Allowed PNG or JPEG. Max size of 800K.</div>
      </div>
    </div>

    <q-form @submit.prevent="updateUserDetails">
      <div class="tw-grid lg:tw-grid-cols-2 tw-grid-cols-1 tw-gap-x-10 tw-gap-y-7">
        <q-input
          v-model="user.first_name"
          label="Firstname"
          standout="bg-dark"
          input-class="text-white"
          required
        />
        <q-input
          v-model="user.last_name"
          label="Lastname"
          standout="bg-dark"
          input-class="text-white"
          required
        />
        <q-input
          v-model="user.username"
          label="Username"
          standout="bg-dark"
          input-class="text-white"
          readonly
        />
        <q-input
          v-model="user.email"
          label="Email"
          type="email"
          standout="bg-dark"
          input-class="text-white"
          required
        />
        <q-select
          v-model="user.department"
          label="Department"
          :options="['Sales', 'IT', 'HR', 'Management', 'Security']"
          standout="bg-dark"
          input-class="text-white"
          readonly
        />
        <q-select
          v-model="user.role"
          label="Role"
          :options="['Head', 'Secetary', 'Advicor', 'Staff', 'Intern']"
          standout="bg-dark"
          input-class="text-white"
          readonly
        />
      </div>
      <div>
        <q-btn
          type="submit"
          label="save changes"
          class="tw-px-12 tw-py-2.5 tw-mt-14 bg-accent"
          :loading="isUpdatingUser ? true : false"
        />
      </div>
    </q-form>
  </section>
</template>
