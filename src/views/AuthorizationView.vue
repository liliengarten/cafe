<script setup>
import {baseUrl} from '@/main.js'
import {store} from '@/store/index'
import {useRouter} from "vue-router";
import {onMounted, reactive} from "vue";

const router = useRouter();

let userInfo = reactive({
  userLogin: '',
  userPassword: ''
})

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


    router.push('/home')
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