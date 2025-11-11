<script setup>
import {baseUrl} from '@/main.js'
import {store} from '@/store/index'
import {useRouter} from "vue-router";
import {reactive} from "vue";

const router = useRouter();

let userInfo = reactive({
  userLogin: '',
  userPassword: ''
}) // нужна ли тут вообще реактивность??

const attemptLogin = async () => {
  try {
    const res = await fetch(baseUrl + '/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        login: userInfo.userLogin,
        password: userInfo.userPassword
      })
    })

    if (!res.ok) throw "Authorization failed :("

    const {data} = await res.json();

    localStorage.setItem("userToken", data.user_token);
    localStorage.setItem("userLogin", userInfo.userLogin);

    await getEmployees()
    await getEmployee()

    router.push('/home')
  } catch (err) {
    console.log(err)
  }
}

const getEmployees = async () => {
  try {
    const res = await fetch(baseUrl + '/user', {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("userToken")}`,
      }
    })

    if (!res.ok) throw "Authorization failed :("

    const {data} = await res.json();
    store.employees = data
  } catch (err) {
    console.log(err)
  }
}

const getEmployee = async () => {
  let userId = 0

  for (let employee of store.employees) {
    if (employee.login === localStorage.getItem("userLogin")) {
      userId = employee.id
    }
  }

  try {
    const res = await fetch(baseUrl + '/user/' + userId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("userToken")}`
      }
    })

    if (!res.ok) throw "Something went wrong :("

    const { data } = await res.json();
    store.employee = data
  } catch (err) {
    console.log(err)
  }
}

</script>

<template>
  <form @submit.prevent>
    <h2>Авторизация</h2>
    <div>
      <label for="login_enter">Логин</label>
      <input type="text" name="login" id="login_enter" v-model="userInfo.userLogin">
    </div>
    <div>
      <label for="password_enter">Пароль</label>
      <input type="password" name="password" id="password_enter" v-model="userInfo.userPassword">
    </div>
    <div>
      <button class="approve_button" @click="attemptLogin">Отправить</button>
    </div>
  </form>
</template>

<style scoped>
form {
  background-color: #005fb6;
  padding: 48px;
  border-radius: 12px;
}
</style>