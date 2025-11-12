<script setup>
import {store} from "@/store/index"
import {reactive} from "vue";
import {baseUrl} from "@/main";

let employeeInfo = reactive({
  name: '',
  login: '',
  password: '',
  role_id: '',
  photo_file: ''
})

let changePhotoFile = (event) => {
  employeeInfo.photo_file = event.target.files[0]
}

let createEmployee = async() => {
  try {
    const formData = new FormData();

    for(let key in employeeInfo) {
      formData.append(key, employeeInfo[key]);
    }

    const res = await fetch(baseUrl + '/user', {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("userToken")}`
      },
      body: formData
    })

    if (!res.ok) throw "Something went wrong :("
    await store.getEmployees
  } catch(err) {
    console.log(err)
  }
}
</script>

<template>
  <form class="modal" enctype="multipart/form-data" @submit.prevent>
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
      <input @change="changePhotoFile" type="file" name="photo" id="photo_file">
    </div>
    <div>
      <label for="role">Роль</label>
      <select name="role" id="role" v-model="employeeInfo.role_id">
        <option value="nothing" selected disabled>Выберите роль:</option>
        <option value="1">Администратор</option>
        <option value="2">Официант</option>
        <option value="3">Повар</option>
      </select>
    </div>
    <div>
      <p>{{employeeInfo.name}}</p>
      <p>{{employeeInfo.login}}</p>
      <p>{{employeeInfo.password}}</p>
      <p>{{employeeInfo.photoFile}}</p>
      <p>{{employeeInfo.roleId}}</p>
      <button @click="store.addWorkerVisibility(), createEmployee()" class="approve_button">Отправить</button>
      <button @click="store.addWorkerVisibility()" class="cancel_button">Отмена</button>
    </div>
  </form>
</template>

<style scoped>

</style>