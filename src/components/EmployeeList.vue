<script setup>
import {store} from "@/store/index"
import EmployeeListCard from "@/components/EmployeeListCard.vue";
import EmployeeCard from "@/components/EmployeeCard.vue";
import {onMounted, ref} from "vue";
import {baseUrl} from "@/main";

</script>

<template>
  <div>
    <section class="employees">
      <article>
        <span>Имя</span>
        <span>Статус</span>
        <span>Должность</span>
        <button @click="store.addWorkerVisibility">+</button>
      </article>

      <div class="employees">
        <employee-list-card v-for="employee in store.employees.value" :key="employee.id"
                            :employee="employee">
        </employee-list-card>
      </div>
    </section>

    <employee-card v-show="store.employeeDetailedVisible"></employee-card>
  </div>
</template>

<style scoped>
  .employees {
    max-height: calc(100vh - 122px - 80px - 84px);
    overflow-y: scroll;
  }
</style>