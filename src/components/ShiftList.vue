<script setup>
import {baseUrl} from "@/main";
import {onMounted, ref} from "vue";
import ShiftCard from "@/components/ShiftCard.vue";
import AddShift from "@/components/AddShift.vue";
import {store} from "@/store/index"
import ShiftDetailed from "@/components/ShiftDetailed.vue";

const shift = ref({})

const handleShiftDetailed = (passedShift) => {
  shift.value = passedShift;
}

onMounted(() => {
  store.getShifts()
})

</script>

<template>
  <section class="shift">
    <button class="approve_button" @click="store.addShiftVisibility">Добавить смену</button>
    <shift-card @shift-detailed="handleShiftDetailed" v-for="shift in store.shifts" :key="shift.id" :shift="shift"></shift-card>
    <add-shift @shift-created="store.getShifts" v-if="store.addShiftVisible"></add-shift>
    <shift-detailed :shift="shift"></shift-detailed>
  </section>

</template>

<style scoped>

</style>