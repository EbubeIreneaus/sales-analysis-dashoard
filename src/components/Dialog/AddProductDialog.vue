<script lang="ts" setup>
import { useProductStore } from 'src/stores/Products';
import { useQuasar } from 'quasar';
import { inject, onMounted, ref } from 'vue';

const emit = defineEmits(['close'])

const is_processing = ref(false);
const $q = useQuasar();
const api = inject('api');

const productFormProps = {
  name: '',
  unit_price: null as unknown as number,
  quantity: null as unknown as number,
  market_price: null as unknown as number,
};
const form = ref<(typeof productFormProps)[]>([{ ...productFormProps }]);

function incrementProductRow() {
  form.value.push({ ...productFormProps });
}
function removeProductRow(index: number) {
  form.value.splice(index, 1);
}

async function recordProducts() {
  const new_products = form.value;
  is_processing.value = true;

  fetch(`${api}/products/`, {
    method: 'put',
    body: JSON.stringify(new_products),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${$q.cookies.get('adminAuthKey')}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      is_processing.value = false;

      if (data.status) {
        $q.notify({
          message: "Product's recorded successfully",
          color: 'green-10',
          textColor: 'white',
          icon: 'check_circle',
          iconColor: 'white',
        });
      } else {
        $q.notify({
          message: data.msg,
          color: 'red-3',
          textColor: 'red-13',
          icon: 'error',
          iconColor: 'red-14',
        });
      }
    })
    .catch((err) => {
      is_processing.value = false;
      $q.notify({
        message: err.message,
        color: 'red-3',
        textColor: 'red-13',
        icon: 'error',
        iconColor: 'red-14',
      });
    });
}

function monitorInput(index: number) {
  const is_similar = useProductStore().product.find(
    (pr) =>
      pr.name.toLowerCase() === form.value[index].name.toLowerCase().trim()
  );
  if (is_similar) {
  } else {
  }
}

onMounted(() => {
  // form.value.push({ });
});
</script>

<template>
  <q-dialog position="bottom" :model-value="true" persistent>
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
            <div class="tw-mb-5">
              <div class="tw-mb-3" v-for="(_, index) in form" :key="index">
                <div class="tw-flex tw-items-center">
                  <q-btn
                    icon="close"
                    dense
                    flat
                    color="red-12"
                    @click="removeProductRow(index)"
                    :disable="form.length < 2"
                    size="md"
                  />
                  <div class="tw-grid tw-grid-cols-3 tw-gap-1 tw-items-center">
                    <q-input
                      v-model="form[index].name"
                      label="Product Name"
                      dense
                      borderless
                      filled
                      class="tw-col-span-3"
                      input-class="product-name"
                      :oninput="monitorInput(index)"
                    />
                    <q-input
                      v-model="form[index].quantity"
                      label="Quantity"
                      dense
                      borderless
                      filled
                    />
                    <q-input
                      v-model="form[index].unit_price"
                      label="Unit Price(NGN)"
                      dense
                      borderless
                      filled
                    />
                    <q-input
                      v-model="form[index].market_price"
                      label="Market Price(NGN)"
                      dense
                      borderless
                      filled
                    />
                  </div>
                </div>
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
              @click="emit('close')"
            />
          </div>
        </q-card-section>
        <q-card-actions> </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<style lang="scss" scoped></style>
