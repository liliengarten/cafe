<script setup>

import {store} from "@/store";
import {baseUrl} from "@/main";
import {reactive} from "vue";

const orderInfo = reactive({
  work_shift_id: store.employeeShift.value,
  table_id: 0,
  number_of_person: 0
})

const placeOrder = async() => {
  try {
    const res = await fetch(baseUrl + "/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("userToken")}`,
      },
      body: JSON.stringify({
        "work_shift_id": orderInfo.work_shift_id,
        "table_id": orderInfo.table_id,
        "number_of_person": orderInfo.number_of_person
      })
    })

    if (!res.ok) throw "Can't add order :("

    await store.getWaiterOrders()

  } catch(err) {
    console.log(err)
  }
}
</script>

<template>
  <div class="modal">
    <form class="modalWrapper" @submit.prevent>
        <h2>Добавление заказа</h2>
        <div>
          <label for="table_id">Номер столика</label>
          <input v-model="orderInfo.table_id" type="number" name="password" id="table_id">
        </div>
        <div>
          <label for="number_of_person">Количество персон</label>
          <input v-model="orderInfo.number_of_person" type="number" name="password" id="number_of_person">
        </div>
        <div>
          <button @click="store.addOrderVisibility" class="cancel_button">Отмена</button>
          <button class="approve_button" @click="placeOrder">Отправить</button>
        </div>
    </form>
  </div>
</template>

<style scoped>

</style>