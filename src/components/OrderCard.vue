<script setup>
  import {store} from "@/store";

  const props = defineProps({
    order: {
      type: Object,
      required: true
    }
  })

  const setOrder = () => {
    store.orderDetailedVisibility()
    store.setOrder(props.order)
  }
</script>

<template>
  <article>
    <p>Столик {{order.table}}</p>
    <p>Официант {{order.shift_workers}}</p>
    <p>Статус {{order.status}}</p>
    <p>Цена {{order.price}}</p>
    <button class="approve_button" @click="setOrder">Управление</button>
  </article>
</template>

<style scoped>

</style>