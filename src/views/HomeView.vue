<script setup>
import { store } from '@/store/index'
import {onMounted} from "vue";

onMounted(() => {
  store.getEmployees()
  store.getUser(localStorage.getItem("userLogin"))
})
</script>

<template>
  <p>{{store.user.name}}</p>
  <p>{{store.user.group}}</p>
</template>

<style scoped>

</style>