<script setup>
import { baseUrl } from '@/main.js'
import { store } from '@/store/index'
import { useRouter } from "vue-router";
import {onBeforeMount, onMounted, reactive, ref} from "vue";

import EmployeeCard from "@/components/EmployeeCard.vue";

onMounted(() => {
  getUserId()
})

let user = ref(0)
let users = ref([])

let getUserId = async() => {
  try {
    const res = await fetch(baseUrl + '/user', {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("userToken")}`,
      }
    })

    if (!res.ok) throw "Authorization failed :("

    const { data } = await res.json();
    users.value = data
  } catch(err) {
    console.log(err)
  }

  for (let employee of users.value) {
    if (employee.login === localStorage.getItem("userLogin")) {
      user.value = employee.id
    }
  }
}
</script>

<template>
  <employee-card v-if="user" :user="user"></employee-card>
</template>

<style scoped>

</style>