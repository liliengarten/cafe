<script setup>

import ShiftList from "@/components/ShiftList.vue";
import {onMounted} from "vue";
import {store} from "@/store/index";

onMounted(() => {
  store.getUserRole()
})
</script>

<template>
  <shift-list></shift-list>
</template>

<style scoped>

</style>