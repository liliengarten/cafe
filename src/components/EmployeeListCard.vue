<script setup>
import {store} from "@/store/index.js"
import {baseUrl} from "@/main";

const props = defineProps({
  employee: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['employeeDetailed'])

const setEmployee = () => {
  store.employeeDetailedVisibility()
  store.setEmployee(props.employee)
}

let fireEmployee = async () => {
  try {
    const res = await fetch(baseUrl + '/user/' + props.employee.id + 'to-dismiss', {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("userToken")}`,
      }
    })

    if (!res.ok) throw "Authorization failed :("

    const {data} = await res.json();
    this.employees = data
  } catch (err) {
    console.log(err)
  }

  await store.getEmployees
}
</script>

<template>
  <article>
    <span>{{ employee.name }}</span>
    <span :class="employee.status === 'working' ? 'working' : 'fired'">{{ employee.status }}</span>
    <span>{{ employee.group }}</span>
    <button @click="setEmployee">Подробнее</button>
  </article>
</template>

<style scoped>

</style>