<script lang="ts" setup>
import { useProductStore } from 'src/stores/Products';
import { useTimeout, useQuasar } from 'quasar';
import { ref, reactive, inject } from 'vue';
const { registerTimeout } = useTimeout();

const props = defineProps<{ productId: number }>();
const is_processing = ref(false);
const show = ref(true);
const $q = useQuasar();
const api = inject('api');

let product = useProductStore().find(props.productId);

const form = reactive({
  name: product.name,
  unit_price: product.unit_price,
  quantity: product.quantity,
  market_price: product.market_price,
  id: product.id,
});

function recordProducts() {
  const new_products = form;
  is_processing.value = true;

  fetch(`${api}/products/updateProductData`, {
    method: 'post',
    body: JSON.stringify(new_products),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${$q.cookies.get('adminAuthKey')}`
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status) {
        $q.notify({
          message: 'Product updated successfully',
          color: 'green-10',
          textColor: 'white',
          iconColor: 'white',
          icon: 'check_circle',
        });
        show.value = false;
      } else {
        $q.notify({
          message: data.msg,
          textColor: 'red-14',
          color: 'red-3',
          iconColor: 'red-14',
          icon: 'error',
        });
      }
    })
    .catch((err) => {
      $q.notify({
        message: err.message,
        textColor: 'red-14',
          color: 'red-3',
          iconColor: 'red-14',
        icon: 'error',
      });
    }).finally(() => is_processing.value = false);
}

const monitorInput = (val: string) => {
  if (!val) {
    return 'Field is required';
  }
  if (val.toLowerCase().trim() != product.name) {
    let is_similar = useProductStore().product.some(
      (pr) => pr.name == val.toLowerCase().trim()
    );
    if (is_similar) {
      return 'similar product found';
    }
  }
  return true;
};
</script>

<template>
  <q-dialog position="bottom" v-model="show" persistent>
    <q-card class="tw-max-w-xl tw-w-full tw-py-5" flat>
      <q-card-section>
        <div class="tw-flex tw-justify-between tw-items-center">
          <h5 class="md:text-h6 text-subtitle1 tw-uppercase">
            Update Exisiting Product
          </h5>
        </div>
      </q-card-section>
      <q-form @submit.prevent="recordProducts">
        <q-card-section>
          <div class="tw-mb-5" v-auto-animate>
            <div class="tw-grid tw-grid-cols-3 tw-gap-x-2  tw-mb-5">
              <q-input
                v-model="form.name"
                label="Product Name"
                dense
                borderless
                filled
                class="tw-col-span-3"
                input-class="product-name"
                :rules="[(val) => monitorInput(val)]"
              />
              <q-input
                v-model="form.quantity"
                label="Quantity"
                dense
                borderless
                filled
              />
              <q-input
                v-model="form.unit_price"
                label="Unit Price(NGN)"
                dense
                borderless
                filled
              />
              <q-input
                v-model="form.market_price"
                label="Market Price(NGN)"
                dense
                borderless
                filled
              />
            </div>
            <q-btn
              label="Record"
              color="accent"
              class="tw-inline-block tw-float-right tw-mx-3"
              type="submit"
              :loading="is_processing"
            />
            <q-btn
              label="Close"
              color="red-12"
              class="tw-inline-block tw-float-right tw-mx-auto"
              v-close-popup
            />
          </div>
        </q-card-section>
        <q-card-actions> </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<style lang="scss" scoped></style>
