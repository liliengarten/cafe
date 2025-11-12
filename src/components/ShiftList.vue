<script setup>
import {baseUrl} from "@/main";
import {onMounted, ref} from "vue";
import ShiftCard from "@/components/ShiftCard.vue";
import AddShift from "@/components/AddShift.vue";
import {store} from "@/store/index"


const shifts = ref({})

const getShifts = async () => {
  try {
    const res = await fetch(baseUrl + '/work-shift', {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("userToken")}`
      }
    })

    if (!res.ok) throw "Authorization failed :("

    const data = await res.json();
    shifts.value = data
  } catch (err) {
    console.log(err)
  }
}

onMounted(() => {
  getShifts()
})

</script>

<template>
  <section class="shift">
    <button class="approve_button" @click="store.addShiftVisibility">Добавить смену</button>
    <shift-card v-for="shift in shifts" :key="shift.id" :shift="shift"></shift-card>
    <add-shift @shift-created="getShifts" v-if="store.addShiftVisible"></add-shift>
  </section>

</template>

<style scoped>

</style>