<script setup>
import { store } from '@/store/index'

import EmployeeCard from "@/components/EmployeeCard.vue";
// убрать вьюху и использовать компонент если ничего не добавится
</script>

<template>
  <employee-card :user="store.employee"></employee-card>
</template>

<style scoped>

</style>