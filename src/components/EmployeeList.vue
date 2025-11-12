<script setup>
import {store} from "@/store/index"
import EmployeeListCard from "@/components/EmployeeListCard.vue";
import EmployeeCard from "@/components/EmployeeCard.vue";
import {ref} from "vue";
import {baseUrl} from "@/main";

const handleFireEmployee = async(id) => {
  try {
    const res = await fetch(baseUrl + `/user/${id}/to-dismiss`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("userToken")}`
      }
    })
  } catch(err) {
    console.log(err)
  }
}

const handleEmployeeId = (id) => {
  store.getEmployee(id, false)
}

const employeeId = ref(0)

</script>

<template>
    <section class="employee-list employees">
      <article>
        <span>Имя</span>
        <span>Статус</span>
        <span>Должность</span>
        <button @click="store.addWorkerVisibility">+</button>
      </article>

      <div class="employees">
        <employee-list-card @fire-employee="handleFireEmployee"
                            @employee-detailed="handleEmployeeId"

                            v-for="employee in store.employees" :key="employee.id">
        </employee-list-card>
      </div>
    </section>

    <employee-card class="modal" v-show="store.employeeDetailedVisible"></employee-card>
</template>

<style scoped>
  .employees {
    max-height: 75vh;
    overflow-y: scroll;
  }
</style>