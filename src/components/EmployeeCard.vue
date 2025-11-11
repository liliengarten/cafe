<script setup>
  import {baseUrl} from "@/main";
  import {onMounted, reactive, ref} from "vue";

  const props = defineProps({
    employee: {
      type: Object,
      required: true
    }
  })

</script>

<template>
  <div class="worker">
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
  </div>
</template>

<style scoped>
.d-f {
  display: flex;
}
</style>