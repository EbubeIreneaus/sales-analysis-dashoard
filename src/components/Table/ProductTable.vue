<script setup lang="ts">
import type { Product } from 'src/types/ProductTypes';
import { QTableColumn, useTimeout, useQuasar } from 'quasar';
import { useProductStore } from 'src/stores/Products';
import {
  defineAsyncComponent,
  inject,
  onMounted,
  ref,
  watch,
} from 'vue';
const EditProductDialog = defineAsyncComponent(
  () => import('src/components/Dialog/EditProductDialog.vue')
);
const ProductImageDialog = defineAsyncComponent(
  () => import('src/components/Dialog/ProductImageUploader.vue')
);

const api = inject('api');

const props = defineProps<{ page: 'home' | 'product' }>();

const $q = useQuasar();

const products = ref<Product[]>(useProductStore().product);

const search = ref('');

const product_to_edit_id = ref<number>(0);
const showEdit = ref(false);
const showPrImageUploader = ref(false);
const prImageToEdit = ref();
const { registerTimeout } = useTimeout();

let columns: QTableColumn[] = [
  {
    name: 'img',
    label: 'Image',
    sortable: true,
    field: 'imgage',
    align: 'left',
  },
  {
    name: 'name',
    label: 'Product Name',
    sortable: true,
    field: 'name',
    align: 'left',
  },
  {
    name: 'quantity',
    label: 'Quantity',
    sortable: true,
    field: 'quantity',
    align: 'left',
  },
  {
    name: 'unit_price',
    label: 'Unit Price',
    sortable: true,
    field: 'unit_price',
    align: 'left',
  },
  {
    name: 'market_price',
    label: 'Market Price',
    sortable: true,
    field: 'market_price',
    align: 'left',
  },
];

if (props.page === 'product') {
  columns.push({
    name: 'action',
    label: '',
    field: '',
    align: 'left',
  });
}

watch(
  () => useProductStore().product,
  (val) => {
    products.value = val;
  }
);

watch(
  () => search.value.toLowerCase(),
  (val) => {
    products.value = useProductStore().product.filter((product) =>
      product.name.toLowerCase().includes(val)
    );
  }
);

function updateProductEditId(id: number) {
  showEdit.value = false;
  product_to_edit_id.value = id;
  registerTimeout(() => {
    showEdit.value = true;
  }, 500);
}

function deleteProduct(id: number) {
  $q.dialog({
    title: 'Are You Sure?',
    message: 'If you delete this product, all related data will be deleted',
    color: 'accent',
    ok: "I'am sure",
  }).onOk(() => {
    fetch(`${api}/products`, {
      method: 'delete',
      body: JSON.stringify({ productId: id }),
      credentials: 'same-origin',
      headers: {
        authKey: $q.sessionStorage.getItem('authorisation-key') ?? '',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          $q.notify({
            message: 'Product deleted successfully',
            color: 'green-14',
            icon: 'check_circle',
          });
        } else {
          $q.notify({
            message: data.msg,
            color: 'red-14',
            icon: 'error',
          });
        }
      })
      .catch((err) => {
        $q.notify({
          message: err.message,
          color: 'red-14',
          icon: 'error',
        });
      });
  });
}

function updateProductImgae(id: number | null, action: 'open' | 'close') {
  if (action == 'open') {
    showPrImageUploader.value = true;
    prImageToEdit.value = id;
  } else {
    showPrImageUploader.value = false;
    prImageToEdit.value = null;
  }
}

function dismissImageEditDialogWithSuccess() {
  showPrImageUploader.value = false;
  $q.notify({
    message: 'Image Updated Successfuly',
    color: 'green-13',
    icon: 'check_circle',
  });
}


onMounted(() => {
//
});
</script>

<template>
  <div>
    <q-card flat>
      <q-card-section>
        <div class="tw-flex items-center justify-between">
          <h4 class="text-subtitle1 md:text-h5">Products</h4>

          <div>
            <q-input
              type="search"
              placeholder="Search Product"
              v-model="search"
              class="tw-px-4 tw-py-1 tw-rounded-md"
              dense
              clearable
              standout="bg-accent text-white"
              v-if="page === 'product'"
            >
              <template v-slot:append><q-icon name="search" /></template>
            </q-input>
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <q-table
          :rows="products"
          :columns="columns"
          row-key="id"
          separator="none"
          flat
        >
          <template v-slot:body="props">
            <tr :props="props">
              <td :key="props.row.image">
                <q-img
                  width="50px"
                  :src="`${api}/assets/images/products/${props.row.image}`"
                  class="tw-rounded-md"
                  v-if="props.row.image"
                />
                <q-img
                  width="50px"
                  src="~assets/images/placeholder.png"
                  class="tw-rounded-md"
                  v-else
                />
              </td>
              <td class="tw-uppercase">
                {{ props.row.name }}
              </td>

              <td class="tw-font-mono">
                <span class="tw-text-base">{{ props.row.quantity }}</span>
              </td>

              <td class="tw-font-mono">
                <span
                  v-money="props.row.unit_price"
                  class="tw-text-base"
                ></span>
              </td>

              <td class="tw-font-mono">
                <span
                  v-money="props.row.market_price"
                  class="tw-text-base"
                ></span>
              </td>

              <td class="" v-if="page === 'product'">
                <q-btn icon="more_vert" flat dense>
                  <q-menu square auto-close>
                    <q-btn
                      icon="edit"
                      label=""
                      flat
                      size="md"
                      color="accent"
                      @click="updateProductEditId(props.row.id)"
                    />
                    <q-btn
                      icon="image"
                      label=""
                      flat
                      size="md"
                      color="green-14"
                      @click="updateProductImgae(props.row.id, 'open')"
                    />
                    <q-btn
                      icon="delete"
                      label=""
                      flat
                      size="md"
                      color="red-13"
                      @click="deleteProduct(props.row.id)"
                    />
                  </q-menu>
                </q-btn>
              </td>
            </tr>
          </template>
        </q-table>
      </q-card-section>
    </q-card>

    <edit-product-dialog :product-id="product_to_edit_id" v-if="showEdit" />

    <product-image-dialog
      v-if="showPrImageUploader"
      :prId="prImageToEdit"
      @close-success="dismissImageEditDialogWithSuccess"
      @close="()=>showPrImageUploader = false"
    />
  </div>
</template>
