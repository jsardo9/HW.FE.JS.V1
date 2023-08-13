<script setup>
import { ref } from 'vue'

const props = defineProps({
  title: String,
  description: String,
  columnDefs: Array,
  data: Array,
  styling: Object
})

const currentPage = ref(1)
const pageSize = 2

// Function for changing to next page
function nextPage() {
  if (currentPage.value * pageSize < props.data.length) currentPage.value++
}

// Function for changing to previous page
function prevPage() {
  if (currentPage.value > 1) currentPage.value--
}

// Returning only data relevant to current page
function pageData() {
  const startIndex = (currentPage.value - 1) * pageSize
  return props.data.slice(startIndex, startIndex + pageSize)
}
</script>

<template>
  <h1>{{ title }}</h1>
  <p>{{ description }}</p>
  <p>Current Page: {{ currentPage }}</p>
  <table>
    <thead
      :style="{ backgroundColor: styling?.['background-color'], color: styling?.['text-color'] }"
    >
      <tr>
        <th v-for="def in columnDefs" :key="def['name']">
          {{ def['name'] }}
        </th>
      </tr>
    </thead>
    <tbody
      :style="{ backgroundColor: styling?.['background-color'], color: styling?.['text-color'] }"
    >
      <template v-if="data">
        <!-- generating each entry in the table -->
        <tr v-for="entry in pageData()" :key="entry.id">
          <td v-for="key in columnDefs.map((def) => def.name)" :key="key">
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
            <b>Loading... <img src="@/assets/loading.gif" style="width: 15px; height: 15px" /></b>
          </td>
        </tr>
      </template>
    </tbody>
  </table>
  <p>
    <!-- Buttons for page changes -->
    <button id="previousPageButton" @click="prevPage">Previous</button>
    <button id="nextPageButton" @click="nextPage">Next</button>
  </p>
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
