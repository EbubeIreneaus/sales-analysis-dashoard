<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useProductStore } from 'src/stores/Products';
import { QTableColumn } from 'quasar';
import ProductTable from 'src/components/Table/ProductTable.vue';
import { defineAsyncComponent, ref } from 'vue';

const AddProductDialog = defineAsyncComponent(
  () => import('src/components/Dialog/AddProductDialog.vue')
);

const { product } = storeToRefs(useProductStore());
const request_add_new_product = ref(false);

const productDetailsColumn: QTableColumn[] = [
  {
    name: 'name',
    label: 'Product Name',
    field: 'name',
    align: 'left',
    sortable: true,
  },
  {
    name: 'price',
    label: 'Unit Price',
    field: 'unit_price',
    align: 'left',
    sortable: true,
  },
  {
    name: 'stock',
    label: 'In Stock',
    field: 'quantity',
    align: 'left',
    sortable: true,
  },
  { name: 'revenue', label: 'Revenue', field: 'quantity_sold', align: 'left' },
];

const details = [
  { id: 1, title: 'Registered Product', count: '200+', icon: 'inventory_2' },
  { id: 2, title: 'Total Orders', count: '3000', icon: 'sell' },
  { id: 3, title: 'Total User', count: '530', icon: 'groups' },
  { id: 4, title: 'Total sales', count: '$40K', icon: 'money' },
];
</script>

<template>
  <q-page>
    <div class="tw-grid lg:tw-grid-cols-4 tw-grid-cols-2  tw-gap-5 tw-mb-5">
      <q-card flat bordered v-for="data in details" :key="data.id">
        <q-card-section>
          <div class="tw-grid tw-grid-cols-3 tw-gap-x-2 items-center">
            <div
              class="tw-col-span-1 tw-bg-slate-900/40 tw-rounded-lg tw-text-center tw-py-3"
            >
              <q-icon :name="data.icon" size="xx-large" />
            </div>
            <div class="tw-col-span-2 text-center">
              <h2 class="md:tw-text-4xl tw-text-3xl text-weight-bolder">{{ data.count }}</h2>
              <div class="text-sm">{{ data.title }}</div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
    <div>
      <div class="">
        <q-btn
          :color="$q.dark.isActive ? 'dark' : ''"
          label="add new product"
          icon="add"
          class="tw-py-3 tw-mb-3 tw-block"
          @click="request_add_new_product = !request_add_new_product"
        />
        <div>
          <ProductTable page="product" />
        </div>
      </div>
    </div>

    <AddProductDialog v-if="request_add_new_product" />
  </q-page>
</template>
