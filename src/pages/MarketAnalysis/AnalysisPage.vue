<script lang="ts" setup>
import OverviewChart from 'src/components/Charts/OverviewChart.vue';
import MiniCards from 'src/components/Card/MiniCards.vue';
import SalesList from 'src/components/Card/SalesList.vue';
</script>

<template>
  <q-page>
    <div>
      <div class="tw-grid lg:tw-grid-cols-3 tw-grid-cols-1 tw-gap-3 tw-mb-12">
        <overview-chart class="lg:tw-col-span-2" />
        <mini-cards class="lg:tw-col-span-1" />
      </div>
      <SalesList page="analysis" />
    </div>
  </q-page>
</template>
