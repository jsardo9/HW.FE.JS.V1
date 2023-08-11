<script setup>
import { ref, onMounted } from 'vue'
import TheTable from './components/TheTable.vue'
import gridLayout from './data/grid.json'
import { getPeople } from './services/PeopleService'
import { format } from 'date-fns'

const dataEntries = ref(null)

// Retreiving people's data from API
getPeople().then((data) => {
  dataEntries.value = parseData(data)
})

// Parsing raw data
function parseData(data) {
  const entries = []
  // Creating table entry for each data entry
  for (const item of data) {
    const currentEntry = {}
    // retreiving entry's data based on column definitions
    for (const column of gridLayout.columnDefs) {
      currentEntry[column.name] = buildField(item, column)
    }
    entries.push(currentEntry)
  }
  return entries
}

// Builds a table field for a specified person
function buildField(person, column) {
  // Checking render type
  switch (column['properties']['renderer']['type']) {
    case 'text':
      let texts = []
      // retreiving all text content
      for (const field of column.field) {
        texts.push(person[field])
      }
      return texts.join(' ')
    case 'date':
      let dt = Date.parse(person[column.field]);
      // If data isn't a valid date, return the original value
      if (isNaN(dt)) {
        return person[column.field];
      }
      dt = format(dt, 'MMM d');
      return dt;
    case 'list':
      const list = person[column.field];
      return (list !== null) ? list : "None listed";
    case 'address':
      // building address from data
      const address1 = person[column['properties']['renderer']['address1']];
      const city = person[column['properties']['renderer']['city']];
      const region = person[column['properties']['renderer']['region']];
      const postal = person[column['properties']['renderer']['postal']];
      const country = person[column['properties']['renderer']['country']];
      let result = "";
      if (address1 !== null) result += address1 + "\n";
      if (city !== null && region !== null && postal !== null) result += city + ", " + region + " " + postal + "\n";
      if (country !== null) result += country;
      return result;
    default:
      throw new Error(`Render type not valid`);
  }
}
</script>

<template>
  <TheTable :title="gridLayout.title" :description="gridLayout.description" :columnDefs="gridLayout.columnDefs"
    :styling="gridLayout.styling" :data="dataEntries"></TheTable>
</template>
