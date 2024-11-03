<template>
  <q-card class="card q-pa-sm relative-position" flat>
    <q-card-section>
      <span class="text-h6 text-title">Statistics Card</span>
      <span class="text-subtitle block q-mb-md"
        >Total 48.5% growth 😎 this month</span
      >

    </q-card-section>
    <q-card-action>
      <div class="row justify-evenly q-gutter-y-md">
        <div class="row items-center col-6 col-sm-auto" style="gap:10px">
          <div class="bg-accent q-pa-xs" style="border-radius:10px">
            <q-icon name="show_chart" size="lg" color="white"></q-icon>
          </div>
          <div class="column justify-center">
            <div class="col text-caption">Sales</div>
            <div class="col text-h6 ">$545k</div>
          </div>
        </div>
        <div class="row items-center col-6 col-sm-auto" style="gap:10px">
          <div class="bg-green-5 q-pa-xs" style="border-radius:10px">
            <q-icon name="person" size="lg" color="white"></q-icon>
          </div>
          <div class="column justify-center">
            <div class="col text-caption">Customers</div>
            <div class="col text-h6 ">1.2k</div>
          </div>
        </div>
        <div class="row items-center col-6 col-sm-auto" style="gap:10px">
          <div class="bg-red-5 q-pa-xs" style="border-radius:10px">
            <q-icon name="inventory" size="lg" color="white"></q-icon>
          </div>
          <div class="column justify-center">
            <div class="col text-caption">Product</div>
            <div class="col text-h6 ">1.2k</div>
          </div>
        </div>
        <div class="row items-center col-6 col-sm-auto" style="gap:10px">
          <div class="bg-blue-5 q-pa-xs" style="border-radius:10px">
            <q-icon name="payments" size="lg" color="white"></q-icon>
          </div>
          <div class="column justify-center">
            <div class="col text-caption">Revenue</div>
            <div class="col text-h6 ">$88k</div>
          </div>
        </div>
      </div>
    </q-card-action>
  </q-card>
</template>

<style scoped>
.card {
  border-radius: 15px;
}
</style>
