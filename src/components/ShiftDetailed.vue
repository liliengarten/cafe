<script setup>
import { store } from "@/store/index";
import { computed, onMounted, ref } from "vue";
import { baseUrl } from "@/main";
import EmployeeCard from "@/components/EmployeeCard.vue";

const shift = store.shift;

onMounted(() => {
  getShiftOrders();
  getShiftEmployees();
});

const orders = ref([]);
const employees = ref([]);

const employeeToAdd = ref({});
const employeeToRemove = ref({});


const shiftStatus = computed(() => {
  if (shift.active) return true;
  return false;
});

const openShift = async () => {
  try {
    const res = await fetch(baseUrl + `/work-shift/${shift.value.id}/open`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    });

    if (!res.ok) throw "Authorization failed :(";
  } catch (err) {
    console.log(err);
  }

  store.getShifts();
};

const closeShift = async () => {
  try {
    const res = await fetch(baseUrl + `/work-shift/${shift.value.id}/close`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    });

    if (!res.ok) throw "Authorization failed :(";
  } catch (err) {
    console.log(err);
  }

  store.getShifts();
};

const getShiftOrders = async () => {
  try {
    const res = await fetch(baseUrl + `/work-shift/${shift.value.id}/order`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    });

    if (!res.ok) throw "Authorization failed :(";

    const { data } = await res.json();
    orders.value = data;
  } catch (err) {
    console.log(err);
  }
};

const getShiftEmployees = async () => {
  try {
    const res = await fetch(baseUrl + `/work-shift/${shift.value.id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    });

    if (!res.ok) throw "Authorization failed :(";

    const { data } = await res.json();
    employees.value = data.users;
  } catch (err) {
    console.log(err);
  }
};

const removeEmployee = async() => {
  console.log(employeeToRemove.value)

  try {
    const res = await fetch(
      baseUrl + `/work-shift/${shift.value.id}/user/${employeeToRemove.value}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      }
    );

    if (!res.ok) throw "Authorization failed :(";
    store.getShifts();
  } catch (err) {
    console.log(err);
  }
};

const addEmployee = async () => {
  console.log(employeeToAdd.value)
  try {
    const res = await fetch(
      baseUrl + `/work-shift/${shift.value.id}/user`,
      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
        body: JSON.stringify({
          user_id: employeeToAdd.value
        })
      }
    );

    if (!res.ok) throw "Authorization failed :(";
    store.getShifts();
  } catch (err) {
    console.log(err);
  }
};
</script>

<template>
  <div class="modal">
    <button @click="store.shiftDetailedVisibility">X</button>
    <p>{{ shift.id }}</p>

    <div>
      <div>
        <h3>Удалить сотрудника со смены</h3>
          <select v-model="employeeToRemove">
            <option v-for="employee in employees" :value="employee.id">
              {{ employee.group }}
              {{ employee.name }}
            </option>
          </select>

          <button @click="removeEmployee">Удалить сотрудника</button>
      </div>

      <div>
        <h3>Добавить сотрудника на смену</h3>
          <select v-model="employeeToAdd">
            <option v-for="employee in store.employees" :value="employee.id">
              {{ employee.group }}
              {{ employee.name }}
            </option>
          </select>

          <button @click="addEmployee">Добавить сотрудника</button>
      </div>

      <!--  <order-list :orders="orders"></order-list>-->
      <button @click="closeShift" v-if="shiftStatus">Закрыть смену</button>
      <button @click="openShift" v-else>Открыть смену</button>
    </div>
  </div>
</template>

<style scoped>
.employee {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  color: white;
  width: 30%;
}

.employeesSmall {
  max-height: 300px;
  overflow-y: scroll;
}
.wrapper {
  width: 100%;
}
</style>