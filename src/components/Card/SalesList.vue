<script setup lang="ts">
import { ref } from 'vue';

defineProps<{page: 'home' | 'analysis'}>()

const sales = [
  {
    icon: '',
    salesId: '384932',
    amount: 70,
    quantity: 'one frozen yogourt',
  },
  {
    icon: '',
    salesId: '384832',
    amount: 33,
    quantity: 'three Ice cream sandwich with samll ganish up',
  },
  { icon: '', salesId: '574883', amount: 65.5, quantity: 'one sharwama' },
  { icon: '', salesId: '374884', amount: 14.3, quantity: 'three Eclair' },
  {
    icon: '',
    salesId: '758944',
    amount: 140,
    quantity: 'two frozen yogurt',
  },
  { icon: '', salesId: '102000', amount: 42.8, quantity: 'three cupcake' },
  { icon: '', salesId: '010020', amount: 14.3, quantity: 'three Eclair' },
];

const expenses = [
  {
    eId: '121211',
    icon: '',
    name: 'New Stock',
    amount: 1500,
    quantity: '100 frozen yogourt, 100 Eclair, 100 bag of flour.',
  },
  {
    eId: '121221',
    icon: '',
    name: 'Staff Salary',
    amount: 1000,
    quantity: 'Total salary amount for all staff',
  },
  {
    eId: '221211',
    icon: '',
    salesId: 'New Stock',
    amount: 500,
    quantity: '200 Cupcake, 100 Eclair',
  },
  {
    eId: '141211',
    icon: '',
    name: 'Business Expenses',
    amount: 100,
    quantity: 'Fuel For Generator this week',
  },
  {
    eId: '121215',
    icon: '',
    name: 'Business Expenses',
    amount: 700,
    quantity: 'Light & water bill for this month',
  },
  {
    eId: '121511',
    icon: '',
    name: 'New Stock',
    amount: 500,
    quantity: '200 Cupcake, 100 Eclair',
  },
  {
    eId: '121611',
    icon: '',
    salesId: 'Staff Salary',
    amount: 1000,
    quantity: 'Total salary amount for all staff',
  },
];
const sort = ref('Default');
const search = ref('')
const spliterModel = ref(50)
</script>

<template>
  <q-card flat class="tw-py-3">
    <q-toolbar>
      <div>
        <q-select
          v-model="sort"
          dense
          borderless
          standout
          :options="['Default', 'Earlier', 'Older', 'Price High', 'Price Low']"
        >
          <template v-slot:prepend>
            <p class="tw-text-sm">Sort By:</p>
          </template>
        </q-select>
      </div>
      <q-space></q-space>
      <router-link to="/analysis" v-if="page === 'home'">Market Analysis</router-link>
      <q-input dense v-model="search" placeholder="Search Keyword" class="tw-px-2" v-else>
        <template v-slot:append><q-icon name="search" /></template>
      </q-input>
    </q-toolbar>

    <q-splitter v-model="spliterModel" class="md:tw-h-[400px] tw-h-[800px]" :horizontal="$q.screen.width <= 468">
      <!-- Sales List -->
      <template v-slot:before>
        <q-toolbar class="">
          <q-toolbar-title>Sales</q-toolbar-title>
          <q-space></q-space>
        </q-toolbar>

        <q-list class="full-width" seperator>
          <q-item clickable v-ripple v-for="(x, index) in sales" :key="index">
            <q-item-section avatar  class="hidden md:block">
              <q-icon name="trending_up" color="green-13"></q-icon>
            </q-item-section>
            <q-item-section>
              <q-item-label caption class="tw-text-xs text-accent tw-uppercase"
                >order id</q-item-label
              >
              <q-item-label>#{{ x.salesId }}</q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label caption class="tw-text-xs text-accent"
                >AMOUNT</q-item-label
              >
              <q-item-label class="text-weight-bold tw-font-mono"
                ><span v-money="x.amount"></span
              ></q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-item-label caption class="tw-text-xs text-accent tw-uppercase"
                >Date</q-item-label
              >
              <q-item-label>Today</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </template>

      <template v-slot:separator>
        <q-avatar color="accent"  size="40px" icon="drag_indicator" />
      </template>

      <template v-slot:after>
        <q-toolbar>
          <q-toolbar-title>Expenses</q-toolbar-title>
          <q-space></q-space>
        </q-toolbar>

        <q-list class="full-width" seperator>
          <q-item
            clickable
            v-ripple
            v-for="(x, index) in expenses"
            :key="index"
          >
            <q-item-section avatar class="hidden md:block">
              <q-icon name="trending_down" color="red-13" ></q-icon>
            </q-item-section>
            <q-item-section>
              <q-item-label
                caption
                class="text-accent tw-uppercase tw-font-semibold"
                >{{ x.name }}</q-item-label
              >
              <q-item-label caption class="tw-line-clamp-1">{{ x.quantity }}</q-item-label>
            </q-item-section>

            <q-item-section>
              <q-item-label caption class="tw-text-xs text-accent tw-uppercase"
                >Amount</q-item-label
              >
              <q-item-label class="text-weight-bold tw-font-mono"
                ><span v-money="x.amount"></span
              ></q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-item-label caption class="tw-text-xs text-accent tw-uppercase"
                >Date</q-item-label
              >
              <q-item-label>Today</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </template>
    </q-splitter>
  </q-card>
</template>
