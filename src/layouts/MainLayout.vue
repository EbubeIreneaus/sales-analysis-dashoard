<template>
  <q-layout
    view="lHh Lpr lFf"
    :class="$q.dark.isActive ? 'bg-dark' : 'bg-primary'"
  >
    <q-header
      :class="$q.dark.isActive ? 'bg-dark' : 'bg-primary'"
      class="q-py-sm"
    >
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-input
          :dark="$q.dark.isActive"
          outlined
          v-model="search"
          label-color="accent"
          color="accent"
          class="q-ml-md"
          rounded
          style="width: 300px"
          dense
        >
          <template v-slot:prepend>
            <q-icon name="search" color="accent" />
          </template>
        </q-input>

        <q-space></q-space>
        <q-btn icon="chat" flat color="accent" dark>
          <q-badge label="2" class="bg-accent" floating></q-badge>
        </q-btn>

        <q-btn icon="notifications" color="accent" flat>
          <q-badge label="3" class="bg-accent" floating></q-badge>
        </q-btn>

        <q-btn round class="q-mx-lg">
          <q-avatar>
            <img src="../assets/admin-user.jpg" alt="" />
          </q-avatar>
          <q-menu>
            <div class="row no-wrap q-pa-md">
              <div class="column">
                <div class="text-h6 q-mb-md">Settings</div>
                <q-toggle v-model="darkMode" label="Enable Dark Mode" />
              </div>

              <q-separator vertical inset class="q-mx-lg" />

              <div class="column items-center">
                <q-avatar size="72px">
                  <img src="../assets/admin-user.jpg" />
                </q-avatar>

                <div class="text-subtitle1 q-mt-md q-mb-xs">Ebube Ireneaus</div>

                <q-btn
                  color="primary"
                  label="Logout"
                  push
                  size="sm"
                  v-close-popup
                />
              </div>
            </div>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :class="$q.dark.isActive ? 'bg-dark' : 'bg-primary'"
      :width="220"
    >
      <q-list>
        <q-item class="row items-center q-my-xs" style="gap: 10px">
          <q-avatar size="md">
            <img src="/icons/favicon-32x32.png" alt="" />
          </q-avatar>
          <span class="text-h6 text-accent">IRENEAUS</span>
        </q-item>

        <q-list class="q-mb-lg">
          <EssentialLink
            v-for="link in firstLinkList"
            :key="link.title"
            v-bind="link"
            class="q-my-md"
          />
        </q-list>

        <q-separator spaced />
        <q-list class=" ">
          <EssentialLink
            v-for="link in secondLinkList"
            :key="link.title"
            v-bind="link"
            class="q-my-md"
          />
        </q-list>

        <q-separator spaced />
        <q-list class=" ">
          <EssentialLink
            v-for="link in thirdLinkList"
            :key="link.title"
            v-bind="link"
            class="q-my-md"
          />
        </q-list>
      </q-list>
    </q-drawer>

    <q-page-container class=" q-py-md"  :class="$q.dark.isActive?'tw-bg-slate-950':'tw-bg-slate-200'">
      <router-view class="tw-p-4" />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import EssentialLink from 'components/EssentialLink.vue';
import type { EssentialLinkProps } from 'components/EssentialLink.vue';
import useDarkMode from 'src/composables/theme';
import { useQuasar } from 'quasar';

defineOptions({
  name: 'MainLayout',
});

const firstLinkList: EssentialLinkProps[] = [
  { title: 'Dashboard', caption: 'dashboard', icon: 'dashboard', link: '/' },
  {
    title: 'Account Information',
    caption: 'Account',
    icon: 'info',
    link: '/account',
  },
];

const secondLinkList: EssentialLinkProps[] = [
  {
    title: 'Products',
    caption: 'products',
    icon: 'production_quantity_limits',
    link: '/product',
  },
  {
    title: 'Markek Analysis',
    caption: 'sales & expenses',
    icon: 'account_balance_wallet',
    link: '/analysis',
  },
];

const thirdLinkList: EssentialLinkProps[] = [
  {
    title: 'Admins',
    caption: 'manage admins',
    icon: 'admin_panel_settings',
    link: '/admin',
  },
  {
    title: 'Logout',
    caption: 'logout account',
    icon: 'logout',
    link: '/auth/logout',
  },
];

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
const darkMode = ref<boolean>(useQuasar().dark.isActive ? true : false);

watch(darkMode, (newMode) => {
  if (newMode) {
    useDarkMode(true);
  } else {
    useDarkMode(false);
  }
});
const search = ref('');
</script>
