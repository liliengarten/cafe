<script setup>

import {baseUrl} from "@/main";
import {onMounted, ref} from "vue";
import OrderCard from "@/components/OrderCard.vue";

onMounted(() => {
  getOrders()
})

const orders = ref([])

const getOrders = async () => {
  try {
    const res = await fetch(baseUrl + '/order/taken/get', {
      method: "GET",
      headers: {
        "Authorization":`Bearer ${localStorage.getItem("userToken")}`,
      }
    })

    if (!res.ok) throw "Can't get orders"

    const {data} = await res.json();
    orders.value = data
    console.log(data)
  } catch(err) {
    console.log(err)
  }
}
</script>

<template>
  <div class="orders">
    <order-card v-for="order in orders" :order="order"></order-card>
  </div>
</template>

<style scoped>
.orderWrapper {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10%
}
</style>