<script setup>
defineProps({
  title: String,
  description: String,
  columnDefs: Array,
  data: Array,
  styling: Object
})
</script>

<template>
  <h1>{{ title }}</h1>
  <p>{{ description }}</p>
  <table>
    <thead :style="{ backgroundColor: styling?.['background-color'], color: styling?.['text-color'] }">
      <tr>
        <th v-for="def in columnDefs" :key="def['name']">
          {{ def['name'] }}
        </th>
      </tr>
    </thead>
    <tbody :style="{ backgroundColor: styling?.['background-color'], color: styling?.['text-color'] }">
      <template v-if="data">
        <!-- generating each entry in the table -->
        <tr v-for="entry in data" :key="entry.id">
          <td v-for="key in columnDefs.map((def) => def.name)">
            <!-- Replacing \n with linebreaks if input is a string -->
            <template v-if="typeof entry[key] === 'string'">
              <span v-html="entry[key].replace(/\n/g, '<br>')"></span>
            </template>
            <template v-else>
              {{ entry[key] }}
            </template>
          </td>
        </tr>
      </template>
      <template v-else>
        <!-- Loading placeholder while waiting for data-->
        <tr>
          <td :colspan="columnDefs.length">
            <b>Loading... <img src="@/assets/loading.gif" style="width: 15px; height: 15px;" /></b>
          </td>
        </tr>
      </template>
    </tbody>
  </table>
</template>

<style>
table {
  border: 2px solid black;
  border-radius: 3px;
  background-color: black;
}

th {
  font-weight: bold;
}

thead,
tbody {
  background-color: white;
  color: black;
}

th,
td {
  min-width: 120px;
  padding: 10px 20px;
  text-align: center;
}
</style>
