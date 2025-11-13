<script setup>
  import {computed} from "vue";
  import {store} from "@/store/index.js"

  const emit = defineEmits(["shiftDetailed"])

  const props = defineProps({
    shift: {
      type: Object,
      required: true,
    }
  })

  const shiftStatus = computed(() => {
    if (props.shift.active) return 'Открыта'
    else return 'Закрыта'
  })

  const changeShift = () => {
    store.shiftDetailedVisibility()
    store.setShift(props.shift)
  }

</script>

<template>
  <article>
    <h2>Смена №{{shift.id}}</h2>
    <p>Начало смены в {{shift.start}}</p>
    <p>Конец смены в {{shift.end}}</p>
    <p class="working">Статус: {{shiftStatus}}</p>
    <button class="approve_button" @click="changeShift">Управление</button>
  </article>
</template>

<style scoped>

</style>