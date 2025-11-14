<script setup>
import OrderList from "@/components/OrderList.vue";
import {onMounted} from "vue";
import {store} from "@/store";

onMounted(() => {
  // store.getUserRole()
  // console.log(store.userRole)
  // // if (store.userRole === 'Официант') store.getWaiterOrders()
})
</script>

<template>
  <order-list></order-list>
</template>

<style scoped>

</style>