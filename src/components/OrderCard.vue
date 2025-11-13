<script setup>
  const props = defineProps({
    order: {
      type: Object,
      required: true
    }
  })
</script>

<template>
  <article>
    <p>{{order.id}}</p>
    <p>{{order.table}}</p>
    <p>{{order.create_at}}</p>
    <p>{{order.status}}</p>
  </article>
</template>

<style scoped>

</style>