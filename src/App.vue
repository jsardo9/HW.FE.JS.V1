<script setup>
import TheTable from './components/TheTable.vue';
import gridLayout from './data/grid.json';

const data = [];
// TODO: ADD API CALL FOR DATA RETREIVAL

</script>

<template>
  <TheTable :title="gridLayout.title" :description="gridLayout.description" :columnDefs="gridLayout.columnDefs"
    :data="data"></TheTable>
</template>