<script setup>

import {baseUrl} from "@/main";
import {computed, onMounted, ref} from "vue";
import OrderCard from "@/components/OrderCard.vue";
import OrderDetailed from "@/components/OrderDetailed.vue";
import {store} from "@/store";
import AddOrder from "@/components/AddOrder.vue";

onMounted(() => {
  store.getMenu()

  if (store.userRole === 'Повар') {
    store.getOrders()
  }

  else if (store.userRole === 'Официант') {
    store.getWaiterOrders()
  }
})


</script>

<template>
  <section class="orders">
    <order-card v-for="order in store.orders.value" :order="order"></order-card>
    <order-detailed v-show="store.orderDetailedVisible"></order-detailed>
    <button @click="store.addOrderVisibility" v-if="store.userRole === 'Официант'" class="approve_button place_order">Принять заказ</button>
    <add-order v-if="store.addOrderVisible"></add-order>
  </section>
</template>

<style scoped>
.orderWrapper {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10%
}
</style>