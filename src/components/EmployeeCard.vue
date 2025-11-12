<script setup>
  import {baseUrl} from "@/main";
  import {store} from "@/store/index"
  import {useRoute} from "vue-router";
  import {ref} from "vue";

  const route = useRoute()

  const employee = ref('')

  if (route.path === '/home') employee.value = store.user
  else if (route.path === '/employees') employee.value = store.employee
</script>

<template>
  <div class="modal worker">
    <button v-show="route.path === '/employees'" @click="store.employeeDetailedVisiblity"> Close </button>
    <div class="d-f">
      <p>ФИО: </p>
      <p>{{ employee.name }}</p>
      <p>{{ employee.surname }}</p>
      <p>{{ employee.patronymic }}</p>
    </div>
    <div class="d-f">
      <p>Логин:</p>
      <p>{{employee.login}}</p>
    </div>

    <p>{{employee.group}}</p>
    <img v-if="employee.photo_file" :src="baseUrl + employee.photo_file" alt="worker photo">
    <button v-show="route.path === '/employees'" @click="fireEmployee">Уволен нахуй</button>
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