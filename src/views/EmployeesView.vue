<script setup>

import EmployeeList from "@/components/EmployeeList.vue";
import AddEmployee from "@/components/AddEmployee.vue";
import EmployeeCard from "@/components/EmployeeCard.vue";

import {store} from "@/store/index"
import {onMounted, ref} from "vue";

onMounted(() => {
  store.getEmployees()
})
</script>

<template>
  <add-employee v-show="store.addWorkerVisible"></add-employee>
  <employee-list></employee-list>
</template>

<style scoped>

</style>