<script lang="ts" setup>
import { useProductStore } from 'src/stores/Products';
import { useTimeout, useQuasar } from 'quasar';
import { ref, reactive } from 'vue';
const { registerTimeout } = useTimeout();

const props = defineProps<{ productId: number }>();
const is_processing = ref(false);
const show = ref(true);
const $q = useQuasar();

let product = useProductStore().find(props.productId);

const form = reactive({
  name: product.name,
  unit_price: product.unit_price,
  quantity: product.quantity,
  id: product.id,
  has_error: false,
  error_message: '',
});

function recordProducts() {
  const new_products = form;
  is_processing.value = true;

  registerTimeout(() => {
    useProductStore().update(new_products);
    $q.notify({
      message: 'Product updated successfully',
      color: 'green-14',
      icon: 'check_circle',
    });
    is_processing.value = false;
    show.value = false;
  }, 3000);
}

function monitorInput() {
  const is_similar = useProductStore().product.find(
    (pr) =>
      pr.name.toLowerCase() === form.name.toLowerCase().trim() &&
      form.name.toLowerCase().trim() !== product.name.toLowerCase()
  );
  if (is_similar) {
    form.has_error = true;
    form.error_message = 'similar product found';
  } else {
    form.has_error = false;
  }
}
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
            <div class="tw-grid tw-grid-cols-2 tw-gap-2 tw-mb-1.5">
              <div class="tw-flex tw-gap-1 tw-items-center">
                <q-input
                  v-model="form.name"
                  label="Product Name"
                  dense
                  borderless
                  filled
                  class="tw-w-full"
                  input-class="product-name"
                  :error="form.has_error"
                  :error-message="form.error_message"
                  @change="monitorInput()"
                />
              </div>
              <div class="tw-flex tw-gap-2">
                <q-input
                  v-model="form.unit_price"
                  label="Unit Price(NGN)"
                  dense
                  borderless
                  filled
                />
                <q-input
                  v-model="form.quantity"
                  label="Quantity"
                  dense
                  borderless
                  filled
                />
              </div>
            </div>
            <q-btn
              label="Record"
              color="accent"
              class="tw-inline-block tw-float-right tw-mx-3"
              type="submit"
              :loading="is_processing"
              :disable="form.has_error"
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
