<script setup>
  import {baseUrl} from "@/main";
  import {store} from "@/store/index"
  import {useRoute} from "vue-router";
  import {onMounted, ref} from "vue";

  const employee = store.employee


  const fireEmployee = async() => {
    try {
      const res = await fetch(baseUrl + `/user/${employee.value.id}/to-dismiss`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("userToken")}`
        }
      })
    } catch(err) {
      console.log(err)
    }

    await store.getEmployees()
  }
</script>

<template>
  <div class="modal worker">
    <button @click="store.employeeDetailedVisibility"> Close </button>
    <div class="d-f">
      <p>ФИО: </p>
      <p>{{ employee.value.name }}</p>
    </div>
    <div class="d-f">
      <p>Логин:</p>
      <p>{{employee.value.login}}</p>
    </div>
    <p>{{employee.group}}</p>
    <img v-if="employee.photo_file" :src="baseUrl + employee.photo_file" alt="worker photo">
    <button @click="fireEmployee">Уволен нахуй</button>
  </div>
</template>

<style scoped>
.d-f {
  display: flex;
}

.worker {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  color: white;
}
</style>