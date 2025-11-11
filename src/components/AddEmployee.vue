<script setup>
import {store} from "@/store/index"
import {reactive} from "vue";
import {baseUrl} from "@/main";

let employeeInfo = reactive({
  name: '',
  login: '',
  password: '',
  role: '',
  photo_file: ''
})

let createEmployee = async() => {
  try {
    const res = await fetch(baseUrl + '/user', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("userToken")}`
      },
      body: JSON.stringify({
        name: employeeInfo.name,
        login: employeeInfo.login,
        password: employeeInfo.password,
        role_id: employeeInfo.role_id,
        photo_file: employeeInfo.photo_file,
      })
    })

    if (!res.ok) throw "Something went wrong :("

    const { data } = await res.json();
  } catch(err) {
    console.log(err)
  }
}
</script>

<template>
  <form class="modal" @submit.prevent>
    <h2>Добавление нового сотрудника</h2>
    <div>
      <label for="name">Имя</label>
      <input type="text" name="name" id="name" v-model="employeeInfo.name">
    </div>
    <div>
      <label for="login">Логин</label>
      <input type="text" name="login" id="login" v-model="employeeInfo.login">
    </div>
    <div>
      <label for="password">Пароль</label>
      <input type="password" name="password" id="password" v-model="employeeInfo.password">
    </div>
    <div>
      <label for="photo_file" class="photo_input">Фото</label>
      <input @change="поменять" type="file" name="photo" id="photo_file">
    </div>
    <div>
      <label for="role">Роль</label>
      <select name="role" id="role" v-model="employeeInfo.role">
        <option value="nothing" selected disabled>Выберите роль:</option>
        <option value="1">Администратор</option>
        <option value="2">Официант</option>
        <option value="3">Повар</option>
      </select>
    </div>
    <div>
      <button @click="store.addWorkerVisibility(), createEmployee()" class="approve_button">Отправить</button>
      <button @click="store.addWorkerVisibility()" class="cancel_button">Отмена</button>
    </div>
  </form>
</template>

<style scoped>

</style>