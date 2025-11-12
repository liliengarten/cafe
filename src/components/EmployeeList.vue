<script setup>
import {store} from "@/store/index"
import EmployeeListCard from "@/components/EmployeeListCard.vue";
import EmployeeCard from "@/components/EmployeeCard.vue";
import {ref} from "vue";

const handleFireEmployee = async(id) => {
  console.log(id)
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

                            v-for="employee in store.employees" :key="employee.id"

                            :id="employee.id"
                            :group="employee.group"
                            :status="employee.status"
                            :name="employee.name">
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