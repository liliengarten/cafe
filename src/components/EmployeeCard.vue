<script setup>
import { baseUrl } from "@/main";
import { store } from "@/store/index";
import { useRoute } from "vue-router";
import {onMounted, ref, watch} from "vue";

const employee = ref({});

const fireEmployee = async () => {
  try {
    const res = await fetch(baseUrl + `/user/${employee.value.id}/to-dismiss`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    });
  } catch (err) {
    console.log(err);
  }

  await store.getEmployees();
};

watch(store.employee, () => {
  employee.value = store.employee.value
  console.log(employee.value)
})
</script>

<template>
  <div class="modal">
    <div class="modalWrapper">
      <button @click="store.employeeDetailedVisibility" class="close_button">
        Назад
      </button>
      <div class="employeeInfo">
        <img
          v-if="employee.photo_file"
          :src="baseUrl + employee.photo_file"
          alt="worker photo"
        />
        <div class="d-f">
          <p>ФИО:</p>
          <p>{{ employee.name }}</p>
        </div>
        <div class="d-f">
          <p>Логин:</p>
          <p>{{ employee.login }}</p>
        </div>
        <div class="d-f">
          <p>Должность:</p>
          <p>{{ employee.group }}</p>
        </div>

        <div class="d-f">
          <p>Статус:</p>
          <p>{{ employee.status }}</p>
        </div>
        <button @click="fireEmployee" class="cancel_button">
          Уволен нахуй
        </button>
      </div>

      <div class="shifts">
        <h3>Смены</h3>
        <p>sdf</p>
        <p>sdf</p>
        <p>sdf</p>
        <p>sdf</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  color: white;
}

.modalWrapper {
  flex-direction: row;
  position: relative;

  justify-content: space-between;
  padding-inline: 10%;
}

.cancel_button {
  margin-left: 0;
}

.shifts {
  margin-bottom: auto;
  max-height: 100%;
  overflow-y: scroll;
}
</style>
