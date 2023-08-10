<script setup>

defineProps({
    title: String,
    description: String,
    columnDefs: Array,
    data: Array
})

</script>

<template>
    <h1>{{ title }}</h1>
    <p>{{ description }}</p>
    <table>
        <thead>
            <tr>
                <th v-for="def in columnDefs" :key="def['name']">
                    {{ def["name"] }}
                </th>
            </tr>
        </thead>
        <tbody>
            <!-- TODO: RENDER DATA -->
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

th,
td {
    min-width: 120px;
    padding: 10px 20px;
    background-color: white;
}
</style>