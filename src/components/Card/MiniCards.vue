<template>
  <div>
    <div class="tw-grid tw-grid-cols-2 tw-gap-x-5 tw-gap-y-7">
      <q-card class="tw-col-span-1" flat>
        <q-card-section>
          <div class="row justify-between">
            <q-btn dense icon="bar_chart" size="" round color="teal"></q-btn>
            <q-icon
              name="more_vert"
              class="relative-position"
              size="md"
              v-ripple
            ></q-icon>
          </div>
        </q-card-section>
        <q-card-section>
          <div class="text-subtitle q-mb-sm">Total Income</div>
          <div class="row">
            <div class="text-h5">$24.5k</div>
            <q-icon name="expand_less" color="green"></q-icon>
            <div class="text-green-5">10%</div>
          </div>
          <div class="text-subtitle q-mt-md text-weight-light">Weekly Income</div>
        </q-card-section>
      </q-card>

      <q-card class="tw-col-span-1" flat>
        <q-card-section>
          <div class="row justify-between">
            <q-btn dense icon="attach_money" size="" round color="accent"></q-btn>
            <q-icon
              name="more_vert"
              class="relative-position"
              size="md"
              v-ripple
            ></q-icon>
          </div>
        </q-card-section>
        <q-card-section>
          <div class="text-subtitle q-mb-sm">Total Expenses</div>
          <div class="row">
            <div class="text-h5">$4.31k</div>
            <q-icon name="expand_more" color="red-5"></q-icon>
            <div class=" text-red-10">10%</div>
          </div>
          <div class="text-subtitle q-mt-md text-weight-light">This week</div>
        </q-card-section>
      </q-card>

      <q-card class="tw-col-span-1" flat>
        <q-card-section>
          <div class="row justify-between">
            <q-btn dense icon="bar_chart" size="" round color="warning"></q-btn>
            <q-icon
              name="more_vert"
              class="relative-position"
              size="md"
              v-ripple
            ></q-icon>
          </div>
        </q-card-section>
        <q-card-section>
          <div class="text-subtitle q-mb-sm">Total Profit</div>
          <div class="row">
            <div class="text-h5">$10.5k</div>
            <q-icon name="expand_less" color="green"></q-icon>
            <div class="text-green-5">10%</div>
          </div>
          <div class="text-subtitle q-mt-md text-weight-light">weekly profit</div>
        </q-card-section>
      </q-card>

      <q-card class="tw-col-span-1" flat>
        <q-card-section>
          <div class="row justify-between">
            <q-btn dense icon="attach_money" size="" round color="secondary"></q-btn>
            <q-icon
              name="more_vert"
              class="relative-position"
              size="md"
              v-ripple
            ></q-icon>
          </div>
        </q-card-section>
        <q-card-section>
          <div class="text-subtitle q-mb-sm">Total Sales</div>
          <div class="row">
            <div class="text-h5">$4.31k</div>
            <q-icon name="expand_more" color="red-5"></q-icon>
            <div class=" text-red-10">10%</div>
          </div>
          <div class="text-subtitle q-mt-md text-weight-light">Weekly Sales</div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>
