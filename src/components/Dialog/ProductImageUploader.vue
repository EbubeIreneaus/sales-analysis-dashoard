<script lang="ts" setup>
import { Cropper } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';
import { inject, ref, watch } from 'vue';
import { useObjectUrl } from '@vueuse/core';
import { useQuasar } from 'quasar';
import { useProductStore } from 'src/stores/Products';

const props = defineProps<{ prId: number }>();
const emit = defineEmits(['closeSuccess', 'closeError', 'close']);
const FileInput = ref();
const src = ref();
const cropper = ref();
const api = inject('api');
const $q = useQuasar();
const isLoading = ref(false);
const { updateImg } = useProductStore();

watch(
  () => FileInput.value,
  (file) => {
    if (file) src.value = useObjectUrl(FileInput).value;
  }
);

async function cropImage() {
  isLoading.value = true

  const { canvas } = cropper.value.getResult();

  const form = new FormData();

  form.append('productId', props.prId.toString());

  const blob: Blob = await new Promise((resolve, reject) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    canvas.toBlob((blob: any) => {
      if (blob) {
        resolve(blob);
      } else {
        reject(new Error('Failed to create blob from canvas'));
      }
    });
  });

  form.append('file', blob);

  fetch(`${api}/products/updateImage`, {
    method: 'post',
    body: form,
    credentials: 'same-origin',
    headers: {
      authKey: $q.sessionStorage.getItem('authorisation-key') ?? '',
    },
  })
    .then((res) => res.json())

    .then((data) => {

      isLoading.value = false;

      if (data.status) {

        updateImg(props.prId, data.filename);

        return emit('closeSuccess');

      } else {

        $q.notify({
          message: data.msg,
          color: 'red-13',
          icon: 'error',
        });

        isLoading.value = false

      }
    })
    .catch((error) => {

      $q.notify({
        message: error.message,
        color: 'red-13',
        icon: 'error',
      });

      isLoading.value = false;
    });
}
</script>

<template>
  <q-dialog class="" :model-value="true" persistent>
    <q-card class="tw-h-[500px] tw-max-w-xl tw-w-full" flat>
      <q-card-section>
        <div class="tw-w-full">
          <q-file v-model="FileInput" label-slot dense borderless>
            <template v-slot:label>
              <q-btn
                label="choose file"
                icon="image"
                color="accent"
                unelevated
              />
            </template>
          </q-file>
        </div>
      </q-card-section>

      <q-card-section v-if="src">
        <Cropper
          ref="cropper"
          :src="src"
          :stencil-props="{
            handlers: {},
            movable: false,
            resizable: false,
            aspectRatio: 1,
          }"
          :resize-image="{
            adjustStencil: false,
          }"
          image-restriction="stencil"
        />
      </q-card-section>

      <q-card-actions>
        <q-btn
          label="save"
          flat
          color="green-13"
          icon="save"
          @click="cropImage()"
          :loading="isLoading"
          v-if="src"
        />

        <q-btn label="close" flat color="red-14" class="tw-mx-5" @click="emit('close')" icon="close" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style scoped>
.cropper {
  height: 400px;
  width: 400px;
  background: #ddd;
}
</style>
