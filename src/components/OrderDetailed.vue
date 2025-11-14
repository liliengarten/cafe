<script setup>
import {store} from "@/store";
import {baseUrl} from "@/main";
import {computed, onMounted, ref, watch} from "vue";

const order = ref({})
const orderStatus = ref('')

const changeOrderStatus = async() => {
  try {
    const res = await fetch(baseUrl + `/order/${order.value.id}/change-status`, {
      method: "PATCH",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("userToken")}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        "status": orderStatus.value
      })
    })

    if (!res.ok) throw "can't change order status :("

    if (store.userRole === 'Повар') await store.getOrders()
    else if (store.userRole === 'Официант') await store.getWaiterOrders()
  } catch(err) {
    console.log(err)
  }
}

const checkOrderStatus = computed((order) => {
  if (order.status !== 'Отменен' && order.status !== 'Оплачен') return true
  return false
})

watch(store.order, () => {
  order.value = store.order.value
})
</script>

<template>
<div class="modal">
  <div class="modalWrapper">
    <button @click="store.orderDetailedVisibility" class="close_button">Назад</button>
    <p>Номер заказа: {{order.id}}</p>
    <p>Столик: {{order.table}}</p>
    <p>Принят: {{order.shift_wokers}}</p>
    <p>Принят в: {{order.create_at}}</p>
    <p>Статус: {{order.status}}</p>
    <p>Цена: {{order.price}}</p>

    <select v-if="store.userRole === 'Повар'" v-model="orderStatus">
      <option value="preparing" >Готовится</option>
      <option value="ready" >Готов</option>
    </select>

    <div >
      <select v-if="store.userRole === 'Официант'" v-model="orderStatus">
        <option v-if="order.status === 'Принят'" value="canceled">Отменен</option>
        <option v-if="order.status === 'Готов'" value="paid-up">Оплачен</option>
      </select>
      <button class="approve_button" @click="changeOrderStatus">Изменить статус заказа</button>
    </div>
  </div>
</div>
</template>

<style scoped>
* {
  color: white;
}
</style>