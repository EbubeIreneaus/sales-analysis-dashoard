<template>
  <q-card class="card q-pa-sm relative-position" flat>
    <img src="src/assets/images/triangle-light.png" />
    <q-card-section>
      <span class="text-h6 text-title">Congratulation Ireanus</span>
      <span class="text-subtitle block q-mb-md">Best seller of the month</span>
      <span class="text-h5 text-accent">$42.86K</span>
    </q-card-section>
    <q-card-actions>
      <q-btn outlined color="accent" dense class="rounded-borders q-px-lg"
        >view sales</q-btn
      >
    </q-card-actions>
  </q-card>
</template>

<style scoped lang="scss">
.card {
  border-radius: 10px;
  background-image: url('src/assets/images/trophy.png');
  background-repeat: no-repeat;
  background-size: 75px;
  background-position: bottom 15px right 20px;

}
img{
  width: 130px;
  position: absolute;
  right: 0;
  bottom: 0;
}
</style>
