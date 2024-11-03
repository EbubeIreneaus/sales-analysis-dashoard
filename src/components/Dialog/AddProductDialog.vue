<script lang="ts" setup>
import { useProductStore } from 'src/stores/Products';
import { useTimeout, useQuasar } from 'quasar';
import { onMounted, ref } from 'vue';
const { registerTimeout } = useTimeout();

const is_processing = ref(false);
const show = ref(true);
const $q = useQuasar()

const productFormProps = {
  name: '',
  unit_price: 0,
  quantity: 0,
  has_error: false,
  error_message: '',
};
const form = ref<(typeof productFormProps)[]>([{ ...productFormProps }]);

function incrementProductRow() {
  form.value.push({ ...productFormProps });
}
function removeProductRow(index: number) {
  form.value.splice(index, 1);
}

function recordProducts() {
  const new_products = form.value;
  is_processing.value = true;

  registerTimeout(() => {
    useProductStore().add(new_products);
    $q.notify({
      message: 'Product\'s recorded successfully',
      color: 'green-14',
      icon: 'check_circle'
    })
    is_processing.value = false;
    show.value = false;
  }, 3000);
}

function monitorInput(index: number) {
  const is_similar = useProductStore().product.find(
    (pr) =>
      pr.name.toLowerCase() === form.value[index].name.toLowerCase().trim()
  );
  if (is_similar) {
    form.value[index].has_error = true;
    form.value[index].error_message = 'similar product found';
  } else {
    form.value[index].has_error = false;
  }
}

onMounted(() => {
  // form.value.push({ });

  console.log(form.value.length);
});
</script>

<template>
  <q-dialog position="bottom" v-model="show" persistent>
    <q-card class="tw-max-w-xl tw-w-full tw-py-5" flat>
      <q-card-section>
        <div class="tw-flex tw-justify-between tw-items-center">
          <h5 class="md:text-h6 text-subtitle1 tw-uppercase">
            Record New Product
          </h5>
          <q-btn
            no-caps
            label="+1"
            @click="incrementProductRow"
            :disable="form.length > 10"
          />
        </div>
      </q-card-section>
      <q-form @submit.prevent="recordProducts">
        <q-card-section>
          <div class="tw-mb-5" v-auto-animate>
            <div
              class="tw-grid tw-grid-cols-2 tw-gap-2 tw-mb-1.5"
              v-for="(_, index) in form"
              :key="index"
            >
              <div class="tw-flex tw-gap-1 tw-items-center">
                <q-btn
                  icon="close"
                  dense
                  flat
                  color="red-12"
                  @click="removeProductRow(index)"
                  :disable="form.length < 2"
                  size="md"
                />
                <q-input
                  v-model="form[index].name"
                  label="Product Name"
                  dense
                  borderless
                  filled
                  class="tw-w-full"
                  input-class="product-name"
                  :error="form[index].has_error"
                  :error-message="form[index].error_message"
                  :oninput="monitorInput(index)"
                />
              </div>
              <div class="tw-flex tw-gap-2">
                <q-input
                  v-model="form[index].unit_price"
                  label="Unit Price(NGN)"
                  dense
                  borderless
                  filled
                />
                <q-input
                  v-model="form[index].quantity"
                  label="Quantity"
                  dense
                  borderless
                  filled
                />
              </div>
            </div>
            <q-btn
              label="Record All"
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
