<script setup>
import { store } from '@/store/index'
import {onMounted} from "vue";

onMounted(() => {
  store.getUserRole()
})
</script>

<template>
</template>

<style scoped>

</style>