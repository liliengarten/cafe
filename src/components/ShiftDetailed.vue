<script setup>
  import {store} from "@/store/index";
  import {computed, onMounted, ref} from "vue";
  import {baseUrl} from "@/main";

  const props = defineProps({
    shift: {
      type: Object,
      required: true
    }
  })

  onMounted(() => {
    getShiftOrders()
  })

  const orders = ref({})

  const shiftStatus = computed(() => {
    if (props.shift.active) return true
    return false
  })

  const openShift = async () => {
    try {
      const res = await fetch(baseUrl + `/work-shift/${props.shift.id}/open`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("userToken")}`
        }
      })

      if (!res.ok) throw "Authorization failed :("
    } catch (err) {
      console.log(err)
    }
  }

  const closeShift = async () => {
    try {
      const res = await fetch(baseUrl + `/work-shift/${props.shift.id}/close`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("userToken")}`
        }
      })

      if (!res.ok) throw "Authorization failed :("
    } catch (err) {
      console.log(err)
    }
  }

  const getShiftOrders = async () => {
    try {
      const res = await fetch(baseUrl + `/work-shift/${props.shift.id}/order`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("userToken")}`
        }
      })

      if (!res.ok) throw "Authorization failed :("

      const { data } = await res.json();
      orders.value = data
    } catch (err) {
      console.log(err)
    }
  }
</script>

<template>
<div class="modal">
  <button @click="store.shiftDetailedVisibility">X</button>

  <order-list :orders="orders"></order-list>

  <button @click="openShift" v-if="shiftStatus">Закрыть</button>
  <button @click="closeShift" v-else>Открыть</button>
</div>
</template>

<style scoped>

</style>