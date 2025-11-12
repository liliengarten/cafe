<script setup>
import {store} from "@/store/index.js"
import {baseUrl} from "@/main";

const props = defineProps({
  id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  group: {
    type: String,
    required: true,
  }
})

const emit = defineEmits(['fireEmployee', 'employeeDetailed'])

const emitFireEmployee = () => {
  emit('fireEmployee', props.id)
}

const emitEmployeeDetailed = () => {
  store.employeeDetailedVisiblity()
  emit('employeeDetailed', props.id)
}

let fireEmployee = async () => {
  try {
    const res = await fetch(baseUrl + '/user/' + props.id + 'to-dismiss', {
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
    <span>{{ name }}</span>
    <span class="working">{{ status }}</span>
    <span>{{ group }}</span>
    <button @click="emitEmployeeDetailed">Подробнее</button>
  </article>
</template>

<style scoped>

</style>